<template>
    <div class="card mb-2">
        <div class="card-content">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><router-link to="/app">Home</router-link></li>
                    <li class="is-active"><router-link to="/app/repositories">Repositories</router-link></li>
                </ul>
            </nav>
        </div>
    </div>

    <div class="card">
        <div class="card-header">
            <h1 class="card-header-title">Repositories</h1>
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