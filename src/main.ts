import {createApp} from 'vue'
import App from './App.vue'
import {Button, Icon, NavBar, Tabbar, TabbarItem, Toast} from 'vant/es';
import "vant/lib/index.css";

const app = createApp(App);
app.use(Button);
app.use(Icon);
app.use(NavBar);
app.use(Toast)
app.use(Tabbar);
app.use(TabbarItem);
app.mount('#app')
