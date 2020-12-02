import { createWebHistory, createRouter } from 'vue-router'
import Home from './components/Home'
import Create from './components/Create'
import Repositories from './components/Repositories';
import Contracts from './components/Contracts';
import Repository from './components/Repository'

const routes = [
    {
        path: '/app',
        name: 'Home',
        component: Home
    },
    {
        path: '/app/repositories',
        name: 'Repositories',
        component: Repositories
    },
    {
        path: '/app/repositories/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/app/repositories/:id',
        name: 'Repository',
        component: Repository,
    },
    {
        path: '/app/contracts',
        name: 'Contracts',
        component: Contracts
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router