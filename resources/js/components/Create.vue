<template>
    <div class="card mb-2">
        <div class="card-content">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><router-link to="/app">Home</router-link></li>
                    <li><router-link to="/app/repositories">Repositories</router-link></li>
                    <li class="is-active"><a href="#" aria-current="page">Create</a></li>
                </ul>
            </nav>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <h1 class="card-header-title">Create new repository</h1>
        </div>
        <div class="card-content">
            <form @submit.prevent="handleSelect">
                <div class="field has-addons">
                    <div class="control">
                        <div class="select">
                            <select v-model="repository_input">
                                <option
                                    v-for="repository in repositories"
                                    :value="JSON.stringify(
                                        {
                                            public_id: repository.id,
                                            name: repository.name,
                                            url: repository.html_url,
                                            content: ''
                                        }
                                    )"
                                >
                                    {{ repository.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="control">
                        <button type="submit" class="button is-info">GO</button>
                    </div>
                </div>
            </form>
            <hr>
            <form v-if="contracts.length" @submit.prevent="validate">
                <div v-for="contract in contracts">
                    <div>Name: {{ contract.title }}</div>
                    <div>Description: {{ contract.description }}</div>
                    <div>File: {{ contract.file }}</div>
                    <div>Version: {{ contract.version }}</div>
                </div>
                <hr>
                <div class="field">
                    <div class="control">
                        <button type="submit" class="button is-success">Validate</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import toml from "toml";
    import { getRepositoriesByUser, getConfig, saveRepository, saveContracts } from '../helpers/create'

    export default {
        name: 'Create',

        async mounted() {
            const user = document.querySelector('#user')
            this.user.id = user.dataset.id
            this.user.username = user.dataset.username

            this.repositories = await getRepositoriesByUser(this.user.username)
        },
        data() {
            return {
                user: {
                    id: '',
                    username: '',
                },
                repositories: [],
                repository_input: '',
                repository: {
                    id: '',
                    public_id: '',
                    url: '',
                    name: '',
                    content: ''
                },
                contracts: []
            }
        },
        methods: {

            async handleSelect() {

                let repository = JSON.parse(this.repository_input)
                this.repository.public_id = repository.public_id
                this.repository.url = repository.url
                this.repository.name = repository.name
                this.repository.content = await getConfig(this.user.username, JSON.parse(this.repository_input).name )

                let contracts = this.repository.content
                contracts = toml.parse(contracts)
                contracts = contracts.sc
                this.contracts = contracts

                await this.validate()
            },

            async validate() {
                const repository = await saveRepository(this.repository)
                await saveContracts(this.contracts, repository.id)

                await this.$router.push('/app')
                swal('Success', 'All fine', 'success')
            },

        },
    }
</script>