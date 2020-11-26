<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <div class="flex-between">
                    <h4>Repositories</h4>
                    <router-link to="/app/repositories/create">Create new repository</router-link>
                </div>
                <table>
                    <thead>
                        <th>Url</th>
                        <th>Created_at</th>
                        <th>Updated_at</th>
                        <th>Refresh</th>
                    </thead>
                </table>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="flex-between">
                    <h4>Smart Contracts</h4>
                </div>
                <table>
                    <thead>
                        <th>Title</th>
                        <th>Description</th>
                        <th>File</th>
                        <th>Version</th>
                        <th>Created_at</th>
                        <th>Updated_at</th>
                        <!--
                        <th>Refresh</th>
                         -->
                    </thead>
                    <tbody>
                        <tr v-if="smart_contracts.length" v-for="smart_contract in smart_contracts">
                            <td>{{ smart_contract.title }}</td>
                            <td>{{ smart_contract.description }}</td>
                            <td>{{ smart_contract.file }}</td>
                            <td>{{ smart_contract.version }}</td>
                            <td>{{ smart_contract.created_at }}</td>
                            <td>{{ smart_contract.updated_at }}</td>
                            <!--
                            <td><button>refresh</button></td>
                             -->
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
    name: 'Home',
    components: {
    },
    mounted() {
        const user_data = document.querySelector('#username')
        this.username = user_data.innerText
        this.id = user_data.dataset.id

        this.fetchSmartContracts()
    },
    data() {
        return {
            smart_contracts: []
        }
    },
    methods: {
        async fetchSmartContracts() {
            const url = `/api/sc`
            const response = await axios.get(url)
            const data = await response.data
            this.smart_contracts = data
        }
    }
}
</script>