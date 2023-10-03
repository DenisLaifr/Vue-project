import NotFound from "@/views/NotFoundView.vue";
import { RouteRecordRaw } from "vue-router";
import AppLayout from "@/layout/app/AppLayout.vue";

export const routes: RouteRecordRaw[] = [
  {
    name: "index",
    path: "/",
    redirect: "/list",
  },
  {
    name: "list",
    path: "/list",
    component: () => import("@/views/ListView.vue"),
    meta: {
      title: "List",
      layout: AppLayout,
    },
  },
  {
    name: "detail",
    path: "/detail:id",
    component: () => import("@/views/DetailView.vue"),
    meta: {
      title: "Detail",
      layout: AppLayout,
    },
    props: true,
  },
  { path: "/:path(.*)", component: NotFound },
];
