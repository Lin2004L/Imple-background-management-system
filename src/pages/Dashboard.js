import { api } from "../services/api.js";

const Dashboard = {
  name: "Dashboard",
  setup() {
    const data = Vue.ref(api.stats());
    function refresh() {
      data.value = api.stats();
    }
    return { data, refresh };
  },
  template: `
    <div>
      <div class="space-between">
        <h2>仪表盘</h2>
        <button class="btn secondary" @click="refresh">刷新</button>
      </div>
      <div class="cards" style="margin-top:12px">
        <div class="card">
          <div>用户总数</div>
          <div style="font-size:28px">{{ data.users }}</div>
        </div>
        <div class="card">
          <div>产品总数</div>
          <div style="font-size:28px">{{ data.products }}</div>
        </div>
        <div class="card">
          <div>在职用户</div>
          <div style="font-size:28px">{{ data.activeUsers }}</div>
        </div>
        <div class="card">
          <div>上架产品</div>
          <div style="font-size:28px">{{ data.onSale }}</div>
        </div>
      </div>
      <div class="card" style="margin-top:12px">
        <div class="space-between">
          <div>估算近30天收入</div>
          <div style="font-size:28px">¥ {{ data.revenue }}</div>
        </div>
      </div>
    </div>
  `
};
export { Dashboard };
