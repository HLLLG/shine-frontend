import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver({
        importStyle: false,
      })],
    }),
  ],
  server: {
    // port: 8080,//端口号
    host: true,//ip地址 或 '0.0.0.0' 或 "loaclhost"
    open: false, //启动后是否自动打开浏览器
    https: false, // 是否开启 https
  },
};
