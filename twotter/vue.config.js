const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/base.scss";'
        // after applying this you need to STOP the server since adding it to the root have to let everything reload
      }
    }
  }
}
