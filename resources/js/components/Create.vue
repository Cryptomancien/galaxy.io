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
            <form @submit.prevent="loadConfig">
                <div class="field has-addons">
                    <div class="control">
                        <input type="text" class="input " placeholder="https://github.com/<username>/<repository>" v-model="url">
                        <small>https://github.com/username/repository</small>
                    </div>
                    <div class="control">
                        <button type="submit" class="button is-info">GO</button>
                    </div>
                </div>
            </form>
            <hr>

            <div v-if="smart_contracts.length">
                <div v-for="smart_contract in smart_contracts">
                    <div>Title: {{ smart_contract.title }}</div>
                    <div>Description: {{ smart_contract.description }}</div>
                    <div>File: {{ smart_contract.file }}</div>
                    <div>Version: {{ smart_contract.version }}</div>
                    <hr>
                </div>
                <form @submit.prevent="validate">
                    <button class="button is-success is-medium is-fullwidth">Validate</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import swal from 'sweetalert';

    export default {
        name: 'Create',
        mounted() {
            const user = document.querySelector('#username')
            this.username = user.innerText
        },
        data() {
            return {
                username: '',
                url: '',
                repository: '',
                smart_contracts: [],
                content: ''
            }
        },
        methods: {
            async loadConfig() {

                if ( ! this.url) {
                    swal("Error", 'the repo must be valid. Example: https://github.com/<account>/<repository>', "error");
                    return
                }

                if ( ! this.url.startsWith('https://github.com/')) {
                    swal('Error', 'the repo must be valid. Example: https://github.com/<account>/<repository>', 'error')
                    return
                }

                if ( ! this.url.includes(this.username)) {
                    swal('Error', 'you are the owner of the repository, all right ?', 'error')
                    return
                }

                let repository = this.url
                repository = repository.split('/')
                repository = repository.pop()
                this.repository = repository

                let url = `https://raw.githubusercontent.com/${this.username}/${this.repository}/main/galaxy.json`

                let response = await axios.get(url)
                let data = await response.data

                if ( ! data.smart_contracts) {
                    swal('Error', 'No smart contract found', 'error')
                    return
                }

                this.content = data

                this.smart_contracts = data.smart_contracts
            },
            async validate() {

                let url = ''
                let data = {}
                let response

                url = '/api/repositories'
                data = {
                    url: this.url,
                    repository: this.repository,
                    content: this.content
                }

                response = await axios.post(url, data)
                data = await response.data

                if (data === 'success') {
                    this.$router.push('/app')
                    //await this.createSmartContracts()
                }
            },

            async createSmartContracts() {

            }
        },
    }
</script>