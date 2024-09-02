import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/track',
        component: () => import('@/views/ultility/Track.vue'),
    },
    {
        path: '/learning',
        component: () => import('@/views/statistic/Learning.vue'),
    },
    {
        path: '/node',
        component: () => import('@/views/manage/Node.vue'),
    },
    {
        path: '/penalties',
        component: () => import('@/views/manage/Penalties.vue'),
    },
    {
        path: '/labels',
        component: () => import('@/views/manage/Labels.vue'),
    },
    {
        path: '/profile',
        component: () => import('@/views/user/Profile.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
