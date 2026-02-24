import { store } from "./store.js";
import { Login } from "./pages/Login.js";
import { Dashboard } from "./pages/Dashboard.js";
import { Users } from "./pages/Users.js";
import { Products } from "./pages/Products.js";
import { Settings } from "./pages/Settings.js";

const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/users", component: Users, meta: { requiresAuth: true } },
  { path: "/products", component: Products, meta: { requiresAuth: true } },
  { path: "/settings", component: Settings, meta: { requiresAuth: true } },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta && to.meta.requiresAuth && !store.currentUser.value) {
    return "/login";
  }
  if (to.path === "/login" && store.currentUser.value) {
    return "/";
  }
});

export { router };
