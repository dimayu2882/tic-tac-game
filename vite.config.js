import { defineConfig } from 'vite';

export default defineConfig({
	base: './',
	server: {
		port: 8080,
		open: true
	},
	build: {
		assetsDir: 'assets',
		rollupOptions: {
			output: {
				assetFileNames: 'assets/[name].[hash][extname]'
			}
		},
		sourcemap: true,
		target: 'esnext' // или 'es2022'
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify('production')
	},
	esbuild: {
		target: 'esnext'
	}
});
