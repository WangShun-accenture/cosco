const path = require("path");
function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	css: {
		loaderOptions: {
			css: {},
			postcss: {
				plugins: [
					require('postcss-px2rem')({
						// 以设计稿1920为例， 1290 / 10 = 192
						remUnit: 192
					}),
				]
			}
		}
	},
	publicPath: "/",
	chainWebpack: config => {
		config.resolve.alias
			.set("@", resolve("src"))
			.set("styles", resolve("src/assets/styles"))
			.set("images", resolve("src/assets/images"))
		
	},
	// webpack-dev-server 相关配置
	devServer: {
		host: '0.0.0.0',
		port: 8080,
		https: false,
		open: true,
		hotOnly: false,
		proxy: null, // 设置代理
		before: app => {}
	},
	// PWA 插件相关配置
	pwa: {},
	// 第三方插件配置
	pluginOptions: {
		// ...
	}
};


