module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				assets: "@/assets",
				common: "@/common",
				components: "@/components",
				network: "@/network",
				layout: "@/layout",
				views: "@/views",
			},
		},
	},
	pluginOptions: {
		electronBuilder: {
			customFileProtocol: "./"
		}
	},publicPath: './', //   部署应用包时的基本 URL
 
	outputDir: 'dist', //   打包时输出的文件目录
	 
	assetsDir: './', //   放置静态文件夹目录
	


	
	// devServer: {
	// 	proxy: {
	// 		"/api": {
	// 			target: "http://124.221.63.19:3000/",
	// 			changeOrigin: true,
	// 			ws: true,
	// 			pathRewrite: {
	// 				"^/api": "",
	// 			},
	// 		},
	// 	},
	// },
};
