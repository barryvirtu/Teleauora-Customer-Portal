export interface DataApiSet {
  /** Base URL for the data APIs, e.g., http://localhost:8080 */
  baseUrl: string;

  /** Relative/absolute path to opportunities, e.g., '/data/opportunities' */
  opportunitiesPath: string;

  /** Relative/absolute path to list enrichment tables, e.g., '/enrichment/tables' */
  enrichmentTablesPath: string;

  /**
   * Function to build the enrichment rows endpoint for a table.
   */
  enrichmentRowsPath: (table: string) => string;
}

/** Helper to resolve full URL even if you pass absolute paths */
export function toUrl(
  base: string,
  pathOrBuilder: string | ((...args: unknown[]) => string)
): string | ((...args: unknown[]) => string) {

  const join = (a: string, b: string): string => {
    if (!b) return a;
    if (b.startsWith('http://') || b.startsWith('https://')) return b;
    if (a.endsWith('/') && b.startsWith('/')) return a + b.slice(1);
    if (!a.endsWith('/') && !b.startsWith('/')) return `${a}/${b}`;
    return a + b;
  };

  if (typeof pathOrBuilder === 'string') {
    return join(base, pathOrBuilder);
  }

  // Return a wrapper function — no `any`
  return (...args: unknown[]): string =>
    join(base, pathOrBuilder(...args));
}
