import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
// import AUTHGUARD from "@/helpers/auth.guard";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/password-reset",
    name: "password-reset",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "password-reset" */ "../views/PasswordResetView.vue"
      ),
  },
  {
    path: "/password-reset/:token",
    name: "password-update",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "password-update" */ "../views/PasswordUpdateView.vue"
      ),
  },
  {
    path: "/documentation",
    name: "documentation",
    component: () =>
      import(/* webpackChunkName: "documentation" */ "../views/DocView.vue"),
  },
  {
    path: "/sandbox",
    name: "sandbox",
    component: () =>
      import(/* webpackChunkName: "sandbox" */ "../views/SandBoxView.vue"),
  },
  {
    path: "/transaction",
    name: "transaction",
    component: () =>
      import(
        /* webpackChunkName: "transaction" */ "../views/TransactionView.vue"
      ),
  },
  {
    path: "/parametre",
    name: "parametre",
    component: () =>
      import(/* webpackChunkName: "parametre" */ "../views/ParametreView.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "createWebHistory",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.name !== "login" &&
    to.name !== "register" &&
    to.name !== "password-reset" &&
    to.name !== "password-update" &&
    (!localStorage.getItem("user") || !store.state.user.status)
  )
    next({ name: "login" });
  else next();
});

export default router;
