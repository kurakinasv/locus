export default {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{css,js,html,jpg,jpeg,svg,png,ico,woff2,woff,ttf}'],
  swDest: 'dist/sw.js',
  runtimeCaching: [
    {
      urlPattern: ({ url }) => url.pathname.startsWith('/api'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'api-cache',
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
};
