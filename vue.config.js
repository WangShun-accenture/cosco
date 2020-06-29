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
		proxy: {
			"/api": {
				target: "http://localhost:8080", //就是把api的请求全部转到这个地址
				ws: true,
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/api': '/'
				// }
				pathRewrite: {
					"^/api": "/mock"//一旦请求的地址是api开头的，就替换请求到mock文件夹
				}
			}
		},
	}
};


