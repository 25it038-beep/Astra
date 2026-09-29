import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const currentDir =
  typeof import.meta.dirname === 'string'
    ? import.meta.dirname
    : path.dirname(fileURLToPath(import.meta.url));

function renderPublishMirrorPlugin() {
  return {
    name: 'render-publish-mirror',
    closeBundle() {
      const sourceDist = path.resolve(currentDir, 'dist');
      if (!fs.existsSync(sourceDist)) return;

      const initCwd = process.env.INIT_CWD ? path.resolve(process.env.INIT_CWD) : currentDir;
      console.log(`[render-mirror] cwd=${process.cwd()} | currentDir=${currentDir} | INIT_CWD=${initCwd}`);

      const targets = new Set<string>([
        path.resolve(currentDir, 'src', 'dist'),
        path.resolve(currentDir, 'build'),
        path.resolve(currentDir, 'dist '),
        path.resolve(currentDir, ' dist'),
        path.resolve(currentDir, '..', 'dist'),
        path.resolve(initCwd, 'dist'),
        path.resolve(initCwd, 'dist '),
      ]);

      for (const target of targets) {
        if (target === sourceDist) continue;
        try {
          fs.cpSync(sourceDist, target, { recursive: true, force: true });
        } catch {
          // Ignore permission errors outside workspace
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), renderPublishMirrorPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(currentDir, '.'),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
