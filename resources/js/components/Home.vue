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

            <table class="table is-stripped is-fullwidth is-hoverable is-bordered">
                <thead>
                    <th>Name</th>
                    <th>Number SC</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    <th>Refresh</th>
                </thead>
                <tbody>
                    <tr v-if="repositories.length" v-for="repository in repositories">
                        <td>
                            <router-link :to="'/app/repositories/' + repository['_id']">{{ repository.name }}</router-link>
                        </td>
                        <td>{{ 'todo' }}</td>
                        <td>{{ repository.created_at }}</td>
                        <td>{{ repository.updated_at }}</td>
                        <td><button class="button is-primary" @click="refresh(repository._id)">Refresh</button></td>
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
            <table class="table is-stripped is-fullwidth is-hoverable is-bordered">
                <thead>
                    <th>Title</th>
                    <th>Description</th>
                    <th>File</th>
                    <th>Version</th>
                    <th>Created_at</th>
                    <th>Updated_at</th>
                </thead>
                <tbody>
                    <tr v-if="smart_contracts.length" v-for="smart_contract in smart_contracts">
                        <td>{{ smart_contract.title }}</td>
                        <td>{{ smart_contract.description }}</td>
                        <td>{{ smart_contract.file }}</td>
                        <td>{{ smart_contract.version }}</td>
                        <td>{{ smart_contract.created_at }}</td>
                        <td>{{ smart_contract.updated_at }}</td>
                    </tr>
                    <tr v-else>
                        <td colspan="6">No smart contract available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import swal from 'sweetalert'

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
            const url = '/api/repositories?preview=1'
            const response = await axios.get(url)
            const data = await response.data
            this.repositories = data
        },

        async fetchSmartContracts() {
            const url = `/api/sc?preview=1`
            const response = await axios.get(url)
            const data = await response.data
            this.smart_contracts = data
        },

        async refresh(id) {
            const url = `/api/repositories/${id}`
            const response = await axios.put(url)

            if ( ! response.statis === 200) {
                swal('Error', 'Something is wrong', 'error')
            }
            else {
                swal('Success', 'Updated', 'success')
            }
        }
    }
}
</script>