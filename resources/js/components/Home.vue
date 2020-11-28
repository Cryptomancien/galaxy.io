<template>
    <div class="card mb-2">
        <div class="card-content">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li class="is-active"><router-link to="/app">Home</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
    <div class="card mb-2">
        <div class="card-header">
            <h4 class="card-header-title">Repositories</h4>
        </div>
        <div class="card-content">
            <div class="mb-2">
                <router-link to="/app/repositories/create" class="button is-info">Create new repository</router-link>
            </div>

            <table class="table is-stripped">
                <thead>
                    <th>Url</th>
                    <th>Created_at</th>
                    <th>Updated_at</th>
                    <th>Refresh</th>
                </thead>
                <tbody>
                    <tr v-if="repositories.length" v-for="repository in repositories">

                    </tr>
                    <tr v-else>
                        <td colspan="4">No repository</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <h4 class="card-header-title">Smart Contracts</h4>
        </div>
        <div class="card-content">
            <table class="table is-stripped">
                <thead>
                    <th>Title</th>
                    <th>Description</th>
                    <th>File</th>
                    <th>Version</th>
                    <th>Created_at</th>
                    <th>Updated_at</th>
                    <th>Refresh</th>
                </thead>
                <tbody>
                    <tr v-if="smart_contracts.length" v-for="smart_contract in smart_contracts">
                        <td>{{ smart_contract.title }}</td>
                        <td>{{ smart_contract.description }}</td>
                        <td>{{ smart_contract.file }}</td>
                        <td>{{ smart_contract.version }}</td>
                        <td>{{ smart_contract.created_at }}</td>
                        <td>{{ smart_contract.updated_at }}</td>
                        <td><button>refresh</button></td>
                    </tr>
                    <tr v-else>
                        <td>No smart contract available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Home',
    components: {
    },
    mounted() {
        this.fetchRepositories()
        this.fetchSmartContracts()
    },
    data() {
        return {
            repositories: [],
            smart_contracts: [],
        }
    },
    methods: {

        async fetchRepositories() {
            const url = '/api/repositories'
            const response = await axios.get(url)
            const data = await response.data
            this.repositories = data
        },

        async fetchSmartContracts() {
            const url = `/api/sc`
            const response = await axios.get(url)
            const data = await response.data
            this.smart_contracts = data
        }
    }
}
</script>