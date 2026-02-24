const KEY_USERS = "demo_users";
const KEY_PRODUCTS = "demo_products";
const KEY_AUTH = "demo_auth";

function init() {
  if (!localStorage.getItem(KEY_USERS)) {
    localStorage.setItem(KEY_USERS, JSON.stringify([
      { id: 1, name: "张三", email: "zhangsan@example.com", role: "管理员", status: "在职" },
      { id: 2, name: "李四", email: "lisi@example.com", role: "客服", status: "在职" },
      { id: 3, name: "王五", email: "wangwu@example.com", role: "运营", status: "离职" }
    ]));
  }
  if (!localStorage.getItem(KEY_PRODUCTS)) {
    localStorage.setItem(KEY_PRODUCTS, JSON.stringify([
      { id: 1001, name: "基础会员", price: 99, stock: 100, status: "上架" },
      { id: 1002, name: "高级会员", price: 199, stock: 50, status: "上架" },
      { id: 1003, name: "专业版", price: 299, stock: 10, status: "下架" }
    ]));
  }
  if (!localStorage.getItem(KEY_AUTH)) {
    localStorage.setItem(KEY_AUTH, JSON.stringify({ username: "admin", password: "123456", name: "管理员" }));
  }
}

function read(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function listUsers() {
  return read(KEY_USERS);
}

function addUser(payload) {
  const users = read(KEY_USERS);
  const id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
  const u = { id, ...payload };
  users.push(u);
  write(KEY_USERS, users);
  return u;
}

function updateUser(id, payload) {
  const users = read(KEY_USERS);
  const idx = users.findIndex(x => x.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...payload };
  write(KEY_USERS, users);
  return users[idx];
}

function deleteUser(id) {
  const users = read(KEY_USERS).filter(x => x.id !== id);
  write(KEY_USERS, users);
}

function listProducts() {
  return read(KEY_PRODUCTS);
}

function addProduct(payload) {
  const products = read(KEY_PRODUCTS);
  const id = products.length ? Math.max(...products.map(x => x.id)) + 1 : 1000;
  const p = { id, ...payload };
  products.push(p);
  write(KEY_PRODUCTS, products);
  return p;
}

function updateProduct(id, payload) {
  const products = read(KEY_PRODUCTS);
  const idx = products.findIndex(x => x.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...payload };
  write(KEY_PRODUCTS, products);
  return products[idx];
}

function deleteProduct(id) {
  const products = read(KEY_PRODUCTS).filter(x => x.id !== id);
  write(KEY_PRODUCTS, products);
}

function login({ username, password }) {
  const auth = JSON.parse(localStorage.getItem(KEY_AUTH) || "{}");
  if (auth.username === username && auth.password === password) {
    return { name: auth.name, username };
  }
  return null;
}

function stats() {
  const users = listUsers();
  const products = listProducts();
  const activeUsers = users.filter(x => x.status === "在职").length;
  const onSale = products.filter(x => x.status === "上架").length;
  const revenue = products.reduce((s, p) => s + p.price * Math.max(0, p.stock > 20 ? 20 : p.stock), 0);
  return { users: users.length, products: products.length, activeUsers, onSale, revenue };
}

init();

export const api = {
  listUsers, addUser, updateUser, deleteUser,
  listProducts, addProduct, updateProduct, deleteProduct,
  login, stats
};
