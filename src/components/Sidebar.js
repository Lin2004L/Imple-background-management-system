const Sidebar = {
  name: "Sidebar",
  template: `
    <nav class="nav">
      <router-link to="/">仪表盘</router-link>
      <router-link to="/users">用户管理</router-link>
      <router-link to="/products">产品管理</router-link>
      <router-link to="/settings">系统设置</router-link>
    </nav>
  `
};
export { Sidebar };
