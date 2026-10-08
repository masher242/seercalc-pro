import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');
const distServerDir = path.resolve(__dirname, 'dist-server');

async function prerender() {
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('[PRERENDER] FATAL: dist/index.html not found. Run client build first.');
    process.exit(1);
  }

  const serverEntryPath = path.resolve(distServerDir, 'entry-server.js');
  if (!fs.existsSync(serverEntryPath)) {
    console.error('[PRERENDER] FATAL: dist-server/entry-server.js not found. Run SSR build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const { render, routes } = await import(serverEntryPath);

  console.log(`[PRERENDER] Rendering ${routes.length} routes as flat .html files...`);

  let successCount = 0;

  for (const route of routes) {
    const { html: appHtml, helmet } = render(route);

    let pageHtml = templateHtml;

    // Inject pre-rendered content into root div
    pageHtml = pageHtml.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${appHtml}</div>`
    );

    // Inject helmet meta tags
    if (helmet) {
      const titleStr = helmet.title?.toString() || '';
      const metaStr = helmet.meta?.toString() || '';
      const linkStr = helmet.link?.toString() || '';
      const scriptStr = helmet.script?.toString() || '';

      if (titleStr) {
        pageHtml = pageHtml.replace(/<title[^>]*>.*?<\/title>/, titleStr);
      }

      // Remove ALL template meta tags that helmet will replace
      // This is critical: without this, pages end up with duplicate tags
      // and Google/social crawlers read the template (homepage) ones first.
      if (metaStr.includes('name="description"')) {
        pageHtml = pageHtml.replace(/<meta name="description"[^>]*>/g, '');
      }
      if (metaStr.includes('name="keywords"')) {
        pageHtml = pageHtml.replace(/<meta name="keywords"[^>]*>/g, '');
      }
      // Strip template meta name="title" (non-standard but present)
      pageHtml = pageHtml.replace(/<meta name="title"[^>]*>/g, '');

      // Strip the template's default robots tag whenever the page supplies its own
      // (e.g. the 404 page's noindex), so pages never end up with two conflicting
      // robots meta tags in the served HTML.
      if (metaStr.includes('name="robots"')) {
        pageHtml = pageHtml.replace(/<meta name="robots"[^>]*>/g, '');
      }

      // Strip ALL template OG tags so Helmet's per-page OG tags are the only ones
      pageHtml = pageHtml.replace(/<meta property="og:[^"]*"[^>]*>/g, '');
      pageHtml = pageHtml.replace(/<meta property="article:[^"]*"[^>]*>/g, '');

      // Strip ALL template Twitter tags
      pageHtml = pageHtml.replace(/<meta name="twitter:[^"]*"[^>]*>/g, '');

      if (linkStr.includes('rel="canonical"')) {
        pageHtml = pageHtml.replace(/<link rel="canonical"[^>]*>/g, '');
      }

      // scriptStr carries each page's JSON-LD (Article, FAQPage, Review...). It must be
      // written into the static HTML, or crawlers that don't run JavaScript (GPTBot,
      // PerplexityBot, ClaudeBot, Bingbot's first pass) never see it.
      const headTags = [metaStr, linkStr, scriptStr].filter((s) => s.length > 0).join('\n    ');
      if (headTags) {
        pageHtml = pageHtml.replace('</head>', `    ${headTags}\n  </head>`);
      }
    }

    // Determine output path - FLAT .html files (not index.html in subdirectories)
    // / -> dist/index.html (overwrite the template)
    // /blog -> dist/blog.html
    // /blog/mini-split-cost-2026 -> dist/blog/mini-split-cost-2026.html
    let outputPath;
    if (route === '/') {
      outputPath = path.join(distDir, 'index.html');
    } else {
      outputPath = path.join(distDir, `${route}.html`);
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, pageHtml);
    successCount++;

    // Verify the file was actually written and is different from template
    const written = fs.readFileSync(outputPath, 'utf-8');
    if (route !== '/' && written === templateHtml) {
      console.error(`[PRERENDER] FATAL: ${route} produced identical HTML to homepage template!`);
      process.exit(1);
    }

    const fileSize = fs.statSync(outputPath).size;
    console.log(`[PRERENDER]   ${route} -> ${path.relative(distDir, outputPath)} (${(fileSize / 1024).toFixed(1)} KB)`);
  }

  if (successCount !== routes.length) {
    console.error(`[PRERENDER] FATAL: Only ${successCount}/${routes.length} routes rendered.`);
    process.exit(1);
  }

  console.log(`[PRERENDER] SUCCESS: ${successCount} pages generated as flat .html files.`);
  console.log('[PRERENDER] With cleanUrls:true, /blog/mini-split-cost-2026 serves blog/mini-split-cost-2026.html');
}

prerender().catch((err) => {
  console.error('[PRERENDER] FATAL ERROR:', err);
  process.exit(1);
});
