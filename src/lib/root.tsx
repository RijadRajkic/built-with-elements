import React from 'react';
import { Email, Page, Document } from '@unlayer/react-elements';

export type Mode = 'email' | 'web' | 'document';

/**
 * One template tree, three render targets. `<Root mode>` swaps the wrapper that
 * sets Unlayer's render mode: Email → table-based email HTML, Page → responsive
 * web HTML, Document → print/PDF HTML. Everything below the root is identical
 * across modes except where a template branches on `mode` for the deltas the
 * design calls for (CTA button vs. signature block, dropping tracking links, etc.).
 */
export function Root({
  mode,
  children,
  ...props
}: {
  mode: Mode;
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  const Wrapper = mode === 'email' ? Email : mode === 'web' ? Page : Document;
  return <Wrapper {...props}>{children}</Wrapper>;
}

/** Font stacks — webfont first, web-safe fallback (email clients ignore webfonts). */
export const font = {
  display: { label: 'Space Grotesk', value: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" },
  body: { label: 'Inter', value: "Inter, 'Helvetica Neue', Arial, sans-serif" },
  mono: { label: 'JetBrains Mono', value: "'JetBrains Mono', 'Courier New', monospace" },
  // serif for the dark-academia exhibition template (Nocturne)
  serif: { label: 'Fraunces', value: "'Fraunces', 'EB Garamond', Georgia, 'Times New Roman', serif" },
};
