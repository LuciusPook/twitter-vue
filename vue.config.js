// const path = require("path");

// const { resolve } = require("core-js/fn/promise");


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
  }
};

// module.exports = {
//   chainWebpack: config => {
//     config.module.rules.delete("svg")
//     config.module
//       .rule("svg-sprite-loader")
//       .test(/\.svg$/)
//       .include
//       .add(path.join(__dirname, "./src/assets/icon"))
//       .end()
//       .use("svg-sprite-loader")
//       .loader("svg-sprite-loader")
//       .options({ symbolId: "[name]" })
//     config.module
//       .rule("images")
//     .exclude.add(resolve("src/assets/icon"))
//   },
// }
// };
