import { store } from "../store.js";

const Topbar = {
  name: "Topbar",
  setup() {
    const q = Vue.ref("");
    function logout() {
      store.logout();
    }
    return { store, q, logout };
  },
  template: `
    <div class="space-between" style="width:100%">
      <div style="display:flex;gap:8px;align-items:center">
        <input class="input" style="width:240px" v-model="q" placeholder="搜索..." />
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span v-if="store.currentUser" class="pill gray">{{ store.currentUser?.name || '游客' }}</span>
        <router-link v-if="!store.currentUser" class="btn secondary" to="/login">登录</router-link>
        <button v-else class="btn secondary" @click="logout">退出</button>
      </div>
    </div>
  `
};
export { Topbar };
