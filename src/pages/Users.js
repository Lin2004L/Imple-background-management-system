import { api } from "../services/api.js";

const Users = {
  name: "Users",
  setup() {
    const list = Vue.ref(api.listUsers());
    const q = Vue.ref("");
    const form = Vue.reactive({ name: "", email: "", role: "客服", status: "在职" });
    const editing = Vue.ref(null);
    function reload() {
      list.value = api.listUsers();
    }
    function add() {
      if (!form.name || !form.email) return;
      api.addUser({ name: form.name, email: form.email, role: form.role, status: form.status });
      form.name = ""; form.email = ""; form.role = "客服"; form.status = "在职";
      reload();
    }
    function del(id) {
      api.deleteUser(id);
      reload();
    }
    function edit(u) {
      editing.value = { ...u };
    }
    function save() {
      if (!editing.value) return;
      api.updateUser(editing.value.id, editing.value);
      editing.value = null;
      reload();
    }
    const filtered = Vue.computed(() => {
      const s = q.value.trim().toLowerCase();
      if (!s) return list.value;
      return list.value.filter(x => x.name.toLowerCase().includes(s) || x.email.toLowerCase().includes(s) || x.role.toLowerCase().includes(s));
    });
    return { list, q, form, editing, filtered, add, del, edit, save };
  },
  template: `
    <div>
      <div class="space-between">
        <h2>用户管理</h2>
        <div class="toolbar">
          <input class="input" v-model="q" placeholder="搜索姓名/邮箱/角色" />
        </div>
      </div>
      <div class="form">
        <input v-model="form.name" class="input" placeholder="姓名" />
        <input v-model="form.email" class="input" placeholder="邮箱" />
        <select v-model="form.role" class="input">
          <option>管理员</option>
          <option>运营</option>
          <option>客服</option>
        </select>
        <select v-model="form.status" class="input">
          <option>在职</option>
          <option>离职</option>
        </select>
        <div class="full">
          <button class="btn" @click="add">添加用户</button>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th><th>姓名</th><th>邮箱</th><th>角色</th><th>状态</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in filtered" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td><span class="pill gray">{{ u.role }}</span></td>
            <td><span :class="['pill', u.status==='在职' ? 'green':'gray']">{{ u.status }}</span></td>
            <td>
              <button class="btn secondary" @click="edit(u)">编辑</button>
              <button class="btn danger" style="margin-left:6px" @click="del(u.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="editing" class="card" style="margin-top:12px">
        <h3>编辑用户</h3>
        <div class="form">
          <input v-model="editing.name" class="input" />
          <input v-model="editing.email" class="input" />
          <select v-model="editing.role" class="input">
            <option>管理员</option>
            <option>运营</option>
            <option>客服</option>
          </select>
          <select v-model="editing.status" class="input">
            <option>在职</option>
            <option>离职</option>
          </select>
          <div class="full">
            <button class="btn success" @click="save">保存</button>
            <button class="btn secondary" style="margin-left:6px" @click="editing=null">取消</button>
          </div>
        </div>
      </div>
    </div>
  `
};
export { Users };
