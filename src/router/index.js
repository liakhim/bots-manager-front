
import { createRouter, createWebHistory } from 'vue-router';
import TournamentComponent from "@/components/TournamentComponent.vue";
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
    {
        path: '/group',
        name: 'Group',
        component: TournamentComponent
    },
    {
        path: '/tournament',
        name: 'Tournament',
        component: HelloWorld
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router