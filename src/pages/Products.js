import { api } from "../services/api.js";

const Products = {
  name: "Products",
  setup() {
    const list = Vue.ref(api.listProducts());
    const q = Vue.ref("");
    const form = Vue.reactive({ name: "", price: 0, stock: 0, status: "上架" });
    const editing = Vue.ref(null);
    function reload() {
      list.value = api.listProducts();
    }
    function add() {
      if (!form.name) return;
      api.addProduct({ name: form.name, price: Number(form.price), stock: Number(form.stock), status: form.status });
      form.name = ""; form.price = 0; form.stock = 0; form.status = "上架";
      reload();
    }
    function del(id) {
      api.deleteProduct(id);
      reload();
    }
    function edit(p) {
      editing.value = { ...p };
    }
    function save() {
      if (!editing.value) return;
      api.updateProduct(editing.value.id, { ...editing.value, price: Number(editing.value.price), stock: Number(editing.value.stock) });
      editing.value = null;
      reload();
    }
    const filtered = Vue.computed(() => {
      const s = q.value.trim().toLowerCase();
      if (!s) return list.value;
      return list.value.filter(x => x.name.toLowerCase().includes(s) || String(x.id).includes(s) || x.status.toLowerCase().includes(s));
    });
    return { list, q, form, editing, filtered, add, del, edit, save };
  },
  template: `
    <div>
      <div class="space-between">
        <h2>产品管理</h2>
        <div class="toolbar">
          <input class="input" v-model="q" placeholder="搜索名称/ID/状态" />
        </div>
      </div>
      <div class="form">
        <input v-model="form.name" class="input" placeholder="产品名称" />
        <input v-model="form.price" type="number" class="input" placeholder="价格" />
        <input v-model="form.stock" type="number" class="input" placeholder="库存" />
        <select v-model="form.status" class="input">
          <option>上架</option>
          <option>下架</option>
        </select>
        <div class="full">
          <button class="btn" @click="add">添加产品</button>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th><th>名称</th><th>价格</th><th>库存</th><th>状态</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filtered" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.name }}</td>
            <td>¥ {{ p.price }}</td>
            <td>{{ p.stock }}</td>
            <td><span class="pill gray">{{ p.status }}</span></td>
            <td>
              <button class="btn secondary" @click="edit(p)">编辑</button>
              <button class="btn danger" style="margin-left:6px" @click="del(p.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="editing" class="card" style="margin-top:12px">
        <h3>编辑产品</h3>
        <div class="form">
          <input v-model="editing.name" class="input" />
          <input v-model="editing.price" type="number" class="input" />
          <input v-model="editing.stock" type="number" class="input" />
          <select v-model="editing.status" class="input">
            <option>上架</option>
            <option>下架</option>
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
export { Products };
