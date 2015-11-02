module.exports = {
	entry: './index.jsx',
	output: {
		filename: 'bundle.js',
		publicPath: 'http://localhost:8090/assets'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				},
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
}
