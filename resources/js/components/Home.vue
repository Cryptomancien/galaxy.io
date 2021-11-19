<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-content">

                <router-link class="button is-info" to="/create">Register new contract</router-link>

                <table class="table is-stripped is-fullwidth is-hoverable is-bordered mt-3">
                    <thead>
                        <th>Name</th>
                        <th>Description</th>
                        <th>URL</th>
                        <th>Version</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                    </thead>
                    <tbody>
                        <tr v-if="contracts.length" v-for="contract in contracts">
                            <td>
                                <router-link :to="'/contracts/' + contract.id">{{ contract.title }}</router-link>
                            </td>
                            <td>{{ contract.description }}</td>
                            <td>{{ contract.url }}</td>
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
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Home',

        mounted() {
            this.fetchContracts()
        },

        data() {
            return {
                contracts: [],
            }
        },

        methods: {
            async fetchContracts() {
                const url = `/api/contracts`
                const response = await axios.get(url)
                const data = await response.data
                this.contracts = data
            },
        }
    }
</script>
