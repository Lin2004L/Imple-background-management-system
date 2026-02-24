import { router } from "./router.js";
import { store } from "./store.js";
import { Sidebar } from "./components/Sidebar.js";
import { Topbar } from "./components/Topbar.js";

const App = {
  name: "App",
  components: { Sidebar, Topbar },
  setup() {
    return { store };
  },
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">
          <span>管理系统</span>
        </div>
        <Sidebar />
      </aside>
      <header class="topbar">
        <Topbar />
      </header>
      <main class="content">
        <router-view />
        <div class="footer">示例项目 · 适合初学者 · Vue3</div>
      </main>
    </div>
  `
};

const app = Vue.createApp(App);
app.use(router);
app.mount("#app");
