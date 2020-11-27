<template>
    <div class="container">
        <div class="card card-mb-a">
            <div class="card-body">
                <router-link to="/app">Home</router-link> /
                <router-link to="/app/sc">Smart Contracts</router-link>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="flex-between">
                    <h1>Repositories</h1>
                    <router-link to="/app/repositories/create">Create repository</router-link>
                </div>
                <table>
                    <thead>
                        <th>Title</th>
                        <th>File</th>
                        <th>Version</th>
                    </thead>
                    <tbody>
                        <tr v-if="smart_contracts.length" v-for="smart_contract in smart_contracts">
                            <td>{{ smart_contract.repository }}</td>
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
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'SmartContracts',

        components: {

        },

        mounted() {
            this.fetchSmartContracts()
        },

        data() {
            return {
                smart_contracts: []
            }
        },

        methods: {
            async fetchSmartContracts() {
                const url = '/api/sc'
                const response = await axios.get(url)
                const data = await response.data
                this.smart_contracts = data
            }
        }
    }
</script>