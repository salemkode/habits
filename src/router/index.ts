import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// Pages
import HomePage from "@/pages/HomePage.vue";
import AddPage from "@/pages/AddPage.vue";
import ViewPage from "@/pages/ViewPage.vue";
import SettingPage from "@/pages/SettingPage.vue";

//
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Habits",
    component: HomePage,
  },
  {
    path: "/setting",
    name: "setting",
    component: SettingPage,
  },
  {
    path: "/add",
    name: "New Habit",
    component: AddPage,
  },
  {
    path: "/view/:id",
    name: "View Habit",
    component: ViewPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
