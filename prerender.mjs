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

      if (titleStr) {
        pageHtml = pageHtml.replace(/<title[^>]*>.*?<\/title>/, titleStr);
      }

      // Remove existing meta tags that helmet will replace
      if (metaStr.includes('name="description"')) {
        pageHtml = pageHtml.replace(/<meta name="description"[^>]*>/, '');
      }
      if (metaStr.includes('name="keywords"')) {
        pageHtml = pageHtml.replace(/<meta name="keywords"[^>]*>/, '');
      }
      if (linkStr.includes('rel="canonical"')) {
        pageHtml = pageHtml.replace(/<link rel="canonical"[^>]*>/, '');
      }

      const headTags = [metaStr, linkStr].filter((s) => s.length > 0).join('\n    ');
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
