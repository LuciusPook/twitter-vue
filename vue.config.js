// ./vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: ` 
        @import "@/scss/_color.scss"; 
        @import "@/scss/_reset.scss"; 
        @import "@/scss/_extend.scss"; 
        @import "@/scss/_mixin.scss"; 
        `
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/twitter-vue/'
    : '/'
};

