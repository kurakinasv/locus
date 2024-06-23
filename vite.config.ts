import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { ConfigEnv, UserConfig, UserConfigExport, defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig((({ mode }) => {
  const IS_PROD = mode === 'production';

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({ include: '**/*.svg?react' }),
      createHtmlPlugin({ minify: IS_PROD }),
      VitePWA({
        registerType: 'autoUpdate',
        outDir: 'dist/',
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: 'Locus',
          short_name: 'Locus',
          description: 'Locus – приложение для организации совместного быта',
          theme_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '.',
          icons: [
            {
              src: 'assets/favicons/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'assets/favicons/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'assets/favicons/apple-touch-icon.png',
              sizes: '180x180',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    server: {
      host: true,
      proxy: {
        '/static': 'http://localhost:3000',
      },
    },
    css: {
      modules: {
        generateScopedName: IS_PROD ? '[hash:base64]' : '[name]__[local]__[hash:base64:5]',
      },
      preprocessorOptions: { scss: { includePaths: ['src/'] } },
      postcss: { plugins: [autoprefixer()] },
    },
  };
}) as UserConfigExport);
