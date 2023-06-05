import TheIndex from "@/views/TheIndex.vue";
import AboutWe from "@/views/AboutWe.vue";
import ExpertLayout from "@/views/expert/ExpertLayout.vue";
import ExpertData from "@/views/expert/widgets/ExpertData.vue";
import ExpertList from "@/views/expert/widgets/ExpertList.vue";
import ExpertEnter from "@/views/expert/ExpertEnter.vue";
import DetailNav from "@/views/expert/detail/DetailNav.vue";
import DetailIndex from "@/views/expert/detail/DetailIndex.vue";
import DetailSkill from "@/views/expert/detail/DetailSkill.vue";
import DetailJoin from "@/views/expert/detail/DetailJoin.vue";
import ProjectList from "@/views/project/ProjectList.vue";
import ProjectDetailOrEnter from "@/views/project/widgets/ProjectDetailOrEnter.vue";

export default [
  {
    path: "/",
    name: "Index",
    component: TheIndex,
    meta: {
      nav: {
        title: "首页",
      },
    },
  },
  {
    path: "/expert",
    name: "expert",
    component: ExpertLayout,
    meta: {
      nav: {
        title: "专家团队",
      },
    },
    children: [
      {
        path: "data",
        name: "ExpertData",
        component: ExpertData,
        meta: {
          nav: {
            svg: {
              class: "nav-svg",
              name: "iconInfo",
            },
            title: "专家数据",
          },
        },
      },
      {
        path: "list",
        name: "ExpertList",
        component: ExpertList,
        meta: {
          nav: {
            svg: {
              class: "nav-svg",
              name: "iconMap",
            },
            title: "专家人才库",
          },
        },
      },
      {
        path: "enter",
        name: "ExpertEnter",
        component: ExpertEnter,
      },
      {
        path: "detail",
        component: DetailNav,
        children: [
          {
            path: "index/:id",
            component: DetailIndex,
            meta: {
              name: "首页",
            },
          },
          {
            path: "skill/:id",
            component: DetailSkill,
            meta: {
              name: "标签信息",
            },
          },
          {
            path: "join/:id",
            component: DetailJoin,
            meta: {
              name: "参与项目",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/project",
    name: "projectList",
    component: ProjectList,
    meta: {
      nav: {
        title: "项目统计",
      },
    },
  },
  {
    path: "/project/detail/:id",
    name: "projectDetail",
    component: ProjectDetailOrEnter,
  },
  {
    path: "/project/enter",
    name: "projectEnter",
    component: ProjectDetailOrEnter,
  },
  {
    path: "/about",
    name: "About",
    component: AboutWe,
    meta: {
      nav: {
        title: "关于我们",
      },
    },
  },
];
