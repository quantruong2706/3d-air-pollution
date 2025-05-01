export default {
  plugins: {
    'postcss-import': {}, // Cho phép sử dụng @import trong CSS
    tailwindcss: {}, // Tailwind CSS
    'postcss-preset-env': {
      // Chuyển đổi CSS hiện đại sang CSS tương thích rộng rãi hơn
      stage: 1, // Sử dụng tính năng CSS ở stage 1 (experimental)
      features: {
        'nesting-rules': true, // Hỗ trợ CSS nesting
        'custom-properties': true, // Hỗ trợ CSS variables
      },
      autoprefixer: {
        flexbox: 'no-2009', // Sử dụng flexbox mới nhất
        grid: 'autoplace', // Tự động đặt grid item
      },
    },
    cssnano:
      process.env.NODE_ENV === 'production'
        ? {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true, // Xóa tất cả comment trong môi trường sản xuất
                },
                minifyFontValues: true,
                normalizeWhitespace: true,
                reduceIdents: false, // Tránh làm hỏng animation
              },
            ],
          }
        : false, // Chỉ kích hoạt trong môi trường sản xuất
    autoprefixer: {}, // Thêm prefix tự động cho các thuộc tính CSS
  },
};
