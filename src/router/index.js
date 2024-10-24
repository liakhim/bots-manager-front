
import { createRouter, createWebHistory } from 'vue-router';
import TournamentComponent from "@/components/TournamentComponent.vue";
import GroupLevel from "@/components/GroupLevel.vue";
import SearchForm from "@/components/SearchForm.vue";

const routes = [
    {
        path: '/',
        name: 'SearchForm',
        component: SearchForm
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