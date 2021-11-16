import {createRouter, createWebHashHistory } from "vue-router";

import Home2 from './components/Home2'
import Create2 from './components/Create2'
import Contract2 from './components/Contract2'

const routes = [
    {
        path: '/',
        name: 'Home2',
        component: Home2
    },
    {
        path: '/create',
        name: 'Create2',
        component: Create2
    },
    {
        path: '/contracts/:id',
        name: 'Contract2',
        component: Contract2
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router