import { defineConfig } from 'tsup';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'tokens/index': 'src/tokens/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  tsconfig: 'tsconfig.build.json',
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  async onSuccess() {
    // Generate tokens.css from token definitions at build time
    const { tokens } = await import('./src/tokens/index.ts');
    const css = generateCssVariables(tokens);
    const distDir = join(process.cwd(), 'dist');
    mkdirSync(distDir, { recursive: true });
    writeFileSync(join(distDir, 'tokens.css'), css, 'utf-8');
    console.log('✅ tokens.css written to dist/');
  },
});

function generateCssVariables(tokens: Record<string, unknown>): string {
  const lines: string[] = [':root {'];
  flattenToCssVars(tokens, '--ui', lines);
  lines.push('}');
  return lines.join('\n');
}

function flattenToCssVars(
  obj: Record<string, unknown>,
  prefix: string,
  lines: string[],
): void {
  for (const [key, value] of Object.entries(obj)) {
    const varName = `${prefix}-${kebab(key)}`;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenToCssVars(value as Record<string, unknown>, varName, lines);
    } else {
      lines.push(`  ${varName}: ${String(value)};`);
    }
  }
}

function kebab(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
