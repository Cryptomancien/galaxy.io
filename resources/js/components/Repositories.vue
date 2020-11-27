<template>
    <div class="container">
        <div class="card card-mb-a">
            <div class="card-body">
                <router-link to="/app">Home</router-link> /
                <router-link to="/app/repositories">Repositories</router-link>
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
                        <th>Url</th>
                        <th>Created_at</th>
                        <th>Updated_at</th>
                        <th>Refresh</th>
                    </thead>
                    <tbody>
                        <tr v-if="repositories.length" v-for="repository in repositories">
                            <td>{{ repository.url }}</td>
                            <td>{{ repository.created_at }}</td>
                            <td>{{ repository.updated_at }}</td>
                            <td><button>refresh</button></td>
                        </tr>
                        <tr v-else>
                            <td colspan="4">No repository</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Repositories',

        mounted() {

        },

        data() {
            return {
                repositories: [

                ]
            }
        },

        methods: {
            fetchRepositories() {
                console.log('wait')
            }
        }
    }
</script>