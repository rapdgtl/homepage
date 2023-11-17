import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import gltf from 'vite-plugin-gltf';
import { textureResize } from '@gltf-transform/functions';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  build: {
    base: 'https://rap.digital/',
    assetsInclude: ['**/*.gltf'],
    sourcemap: true,
    cssMinify: true,
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
  },
  server: {
    https: true,
  },
  plugins: [
    basicSsl(),
    gltf({
      transforms: [textureResize({ size: [1024, 1024] })],
    }),
  ],
});
