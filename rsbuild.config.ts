import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
const mode = process.env.NODE_ENV;
console.log(mode);
export default defineConfig({
  server: {
    port: 2000,
    open: false,
  },
  tools: {
    rspack(config, { appendPlugins }) {
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'federation_consumer',
          remotes: {
            federation_provider:
              mode === 'production'
                ? 'federation_provider@https://www.fenggp.top/mf-manifest.json'
                : 'federation_provider@http://localhost:3000/mf-manifest.json',
          },
          shared: ['vue'],
        }),
      ]);
    },
  },
  plugins: [pluginVue()],
});
