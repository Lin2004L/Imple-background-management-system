import { api } from "../services/api.js";

const Settings = {
  name: "Settings",
  setup() {
    const info = Vue.ref(api.stats());
    function reset() {
      localStorage.clear();
      location.reload();
    }
    return { info, reset };
  },
  template: `
    <div>
      <h2>系统设置</h2>
      <div class="card" style="margin-top:12px">
        <div>数据统计</div>
        <div style="margin-top:8px">用户：{{ info.users }}，产品：{{ info.products }}</div>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="space-between">
          <div>重置示例数据</div>
          <button class="btn danger" @click="reset">重置</button>
        </div>
      </div>
    </div>
  `
};
export { Settings };
