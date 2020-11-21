import { createWebHistory, createRouter } from 'vue-router'
import Home from './components/Home'
import Create from './components/Create'

const routes = [
    {
        path: '/app',
        name: 'Home',
        component: Home
    },
    {
        path: '/app/sc/create',
        name: 'About',
        component: Create
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router