<template>
    <div class="card mb-2">
        <div class="card-content">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><router-link to="/app">Home</router-link></li>
                    <li><router-link to="/app/repositories">Repositories</router-link></li>
                    <li class="is-active"><router-link to="/app/contracts">Contracts</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <h1 class="card-header-title">Smart Contracts</h1>
        </div>
        <div class="card-content">
            <div class="mb-2">
                <router-link to="/app/repositories/create" class="button is-info">Create new repository</router-link>
            </div>
            <table class="table is-stripped is-fullwidth is-hoverable is-bordered">
                <thead>
                    <th>Title</th>
                    <th>Description</th>
                    <th>File</th>
                    <th>Version</th>
                </thead>
                <tbody>
                    <tr v-if="contracts.length" v-for="contract in contracts">
                        <td>{{ contract.title }}</td>
                        <td>{{ contract.description }}</td>
                        <td>{{ contract.file }}</td>
                        <td>{{ contract.version }}</td>
                    </tr>
                    <tr v-else>
                        <td colspan="3">
                            No smart contract yet.
                            <router-link to="/app/repositories/create">Create one</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Contracts',

        components: {

        },

        mounted() {
            this.fetchContracts()
        },

        data() {
            return {
                contracts: []
            }
        },

        methods: {
            async fetchContracts() {
                const url = '/api/contracts'
                const response = await axios.get(url)
                const data = await response.data
                this.contracts = data
            }
        }
    }
</script>