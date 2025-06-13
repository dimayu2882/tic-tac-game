import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
	base: './',
	server: {
		port: 8081,
		open: true
	},
	build: {
		assetsDir: 'assets',
		rollupOptions: {
			output: {
				assetFileNames: 'assets/[name].[hash][extname]'
			}
		},
		sourcemap: false,
		target: 'esnext'
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify('production')
	},
	alias: {
		crypto: false,
		stream: false,
		buffer: false,
	},
	esbuild: {
		target: 'esnext'
	},
	plugins: [
		viteImagemin({
			webp: {
				quality: 75,
			},
			pngquant: false,
			mozjpeg: false,
			gifsicle: false,
			svgo: true,
		}),
	],
});
