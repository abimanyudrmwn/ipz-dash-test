import { createRouter as createVueRouter, createWebHashHistory, Router } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Dashboard from "../views/Dashboard.vue";
import ExternalApi from "../views/ExternalApi.vue";
import { createAuthGuard } from "@auth0/auth0-vue";
import { App } from 'vue';

export function createRouter(app: App): Router {
  return createVueRouter({
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        beforeEnter: createAuthGuard(app)
      },
      {
      	path: "/dashboard",
	name: "Dashboard",
	component: Dashboard,
	beforeEnter: createAuthGuard(app)
      },
      {
        path: "/external-api",
        name: "external-api",
        component: ExternalApi,
        beforeEnter: createAuthGuard(app)
      }
    ],
    history: createWebHashHistory()
  })
}
