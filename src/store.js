const currentUser = Vue.ref(null);
const collapsed = Vue.ref(false);

function login(user) {
  currentUser.value = user;
}

function logout() {
  currentUser.value = null;
}

export const store = { currentUser, collapsed, login, logout };
