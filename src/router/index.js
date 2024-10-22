
import { createRouter, createWebHistory } from 'vue-router';
import TournamentComponent from "@/components/TournamentComponent.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import GroupLevel from "@/components/GroupLevel.vue";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: HelloWorld
    },
    {
        path: '/group',
        name: 'Group',
        component: GroupLevel
    },
    {
        path: '/tournament',
        name: 'Tournament',
        component: TournamentComponent
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router