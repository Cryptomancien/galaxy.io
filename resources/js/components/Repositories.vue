<template>
    <div class="container">
        <div class="card">
            <div class="card-body">

                <div class="button">
                    <router-link to="/app/repositories/create">Create Repository</router-link>
                </div>

                <table v-for="repository in repositories ">
                    <thead>
                        <th>Url</th>
                        <th>Created_at</th>
                        <th>Updated_at</th>
                        <th>Refresh</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ repository.url }}</td>
                            <td>{{ repository.created_at }}</td>
                            <td>{{ repository.updated_at }}</td>
                            <td><button>refresh</button></td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <table>
                                    <thead>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>File</th>
                                        <th>Refresh</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="smart_contract in repository.smart_contracts">
                                            <td>{{ smart_contract.title }}</td>
                                            <td>{{ smart_contract.description }}</td>
                                            <td>{{ smart_contract.file }}</td>
                                            <td><button>Refresh</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
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
                    {
                        url: 'github.com/toto/toto',
                        created_at: '10/20/20',
                        updated_at: '10/20/20',
                        smart_contracts: [
                            {
                                title: 'hello world',
                                description: 'a simple hello world',
                                file: 'hello_world.bas'
                            },
                            {
                                title: 'hello world',
                                description: 'a simple hello world',
                                file: 'hello_world.bas'
                            },
                            {
                                title: 'hello world',
                                description: 'a simple hello world',
                                file: 'hello_world.bas'
                            },
                        ]
                    },
                    {
                        url: 'github.com/toto/toto',
                        created_at: '10/20/20',
                        updated_at: '10/20/20',
                        smart_contracts: [
                            {
                                title: 'hello world',
                                description: 'a simple hello world',
                                file: 'hello_world.bas'
                            },
                            {
                                title: 'hello world',
                                description: 'a simple hello world',
                                file: 'hello_world.bas'
                            },
                            {
                                title: 'hello world',
                                description: 'a simple hello world',
                                file: 'hello_world.bas'
                            },
                        ]
                    },
                    {
                        url: 'github.com/toto/toto',
                        created_at: '10/20/20',
                        updated_at: '10/20/20',
                        smart_contracts: [
                            {
                                title: 'hello world',
                                description: 'a simple hello world',
                                file: 'hello_world.bas'
                            },
                            {
                                title: 'hello world',
                                description: 'a simple hello world',
                                file: 'hello_world.bas'
                            },
                            {
                                title: 'hello world',
                                description: 'a simple hello world',
                                file: 'hello_world.bas'
                            },
                        ]
                    }
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