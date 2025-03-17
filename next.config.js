// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/api/:path*', // توجيه جميع الطلبات إلى الخادم الخلفي
        },
      ];
    },
  };