import type { ReactNode } from 'react';

/**
 * Small label that says what kind of figure the reader is looking at, so rules of thumb
 * and editorial rankings aren't mistaken for measured data or official standards.
 */
export default function EditorialNote({ kind = 'Rule of thumb', children }: { kind?: string; children: ReactNode }) {
  return (
    <p className="not-prose my-3 flex items-start gap-2 text-xs leading-relaxed text-gray-600">
      <span className="mt-px inline-block flex-shrink-0 rounded-full border border-gray-300 bg-gray-50 px-2 py-0.5 font-semibold uppercase tracking-wide text-[10px] text-gray-600">
        {kind}
      </span>
      <span>{children}</span>
    </p>
  );
}
