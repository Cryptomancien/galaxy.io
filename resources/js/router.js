import {createRouter, createWebHashHistory } from "vue-router";

import Home from './components/Home'
import Create from './components/Create'
import Contract from './components/Contract'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/contracts/:id',
        name: 'Contract',
        component: Contract
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router