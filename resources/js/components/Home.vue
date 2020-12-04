<template>
    <!--
    <Create></Create>
    <hr>
     -->
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
                            <router-link :to="'/app/repositories/' + repository.id">{{ repository.name }}</router-link>
                        </td>
                        <td>{{ 'todzo' }}</td>
                        <td>{{ repository.createdAt }}</td>
                        <td>{{ repository.updatedAt }}</td>
                        <td><button class="button is-primary" @click="refresh(repository._id)">Refresh</button></td>
                    </tr>
                    <tr v-else>
                        <td colspan="5">No repository</td>
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
                    <tr v-if="contracts.length" v-for="contract in contracts">
                        <td>{{ contract.title }}</td>
                        <td>{{ contract.description }}</td>
                        <td>{{ contract.file }}</td>
                        <td>{{ contract.version }}</td>
                        <td>{{ contract.createdAt }}</td>
                        <td>{{ contract.updatedAt }}</td>
                    </tr>
                    <tr v-else>
                        <td colspan="6">No contract available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import swal from 'sweetalert'
import Create from "./Create";

export default {
    name: 'Home',
    components: {
        Create
    },
    mounted() {
        this.fetchRepositories()
        this.fetchContracts()
    },
    data() {
        return {
            repositories: [],
            contracts: [],
        }
    },
    methods: {

        async fetchRepositories() {
            const url = '/api/repositories?preview=1'
            const response = await axios.get(url)
            const data = await response.data
            this.repositories = data
        },

        async fetchContracts() {
            const url = `/api/contracts?preview=1`
            const response = await axios.get(url)
            const data = await response.data
            this.contracts = data
        },

        async refresh(id) {
            const url = `/api/repositories/${id}`
            const response = await axios.put(url)

            if ( ! response.status === 200) {
                swal('Error', 'Something is wrong', 'error')
            }
            else {
                swal('Success', 'Updated', 'success')
            }
        }
    }
}
</script>