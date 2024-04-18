import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const IS_PROD = mode === 'production';

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({ include: '**/*.svg?react' }),
      createHtmlPlugin({ minify: IS_PROD }),
    ],
    css: {
      modules: {
        generateScopedName: IS_PROD ? '[hash:base64]' : '[name]__[local]__[hash:base64:5]',
      },
      preprocessorOptions: { scss: { includePaths: ['src/'] } },
      postcss: { plugins: [autoprefixer()] },
    },
  };
});
