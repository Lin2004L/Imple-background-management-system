import { store } from "../store.js";
import { api } from "../services/api.js";

const Login = {
  name: "Login",
  setup() {
    const username = Vue.ref("");
    const password = Vue.ref("");
    const msg = Vue.ref("");
    function submit() {
      const u = api.login({ username: username.value, password: password.value });
      if (!u) {
        msg.value = "账号或密码错误";
        return;
      }
      store.login(u);
      msg.value = "";
      location.hash = "#/";
    }
    return { username, password, msg, submit };
  },
  template: `
    <div style="max-width:360px;margin:60px auto">
      <div class="card">
        <h2>登录</h2>
        <div style="display:grid;gap:8px;margin-top:12px">
          <input class="input" v-model="username" placeholder="账号 admin" />
          <input class="input" type="password" v-model="password" placeholder="密码 123456" />
          <button class="btn" @click="submit">登录</button>
          <div v-if="msg" class="pill warn">{{ msg }}</div>
        </div>
      </div>
    </div>
  `
};
export { Login };
