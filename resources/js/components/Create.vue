<template>
    <div class="container">
        <div class="card card-mb-a">
            <div class="card-body">
                <router-link to="/app">Home</router-link> /
                <router-link to="/app/repositories">Repositories</router-link> /
                <router-link to="/app/repositories/create">Create</router-link>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h1>Create new SC</h1>

                <form @submit.prevent="loadConfig">
                    <div class="form-group">
                        <input type="text" v-model="url" placeholder="https://github.com/you/repository" required>
                    </div>
                    <div class="form-group">
                        <button type="submit">Go</button>
                    </div>
                </form>
                <hr>

                <div v-if="smart_contracts.length">
                    <div v-for="smart_contract in smart_contracts">
                        <div>Title: {{ smart_contract.title }}</div>
                        <div>Description: {{ smart_contract.description }}</div>
                        <div>File: {{ smart_contract.file }}</div>
                        <div>Version: {{ smart_contract.version }}</div>
                    </div>
                    <form @submit.prevent="validate">
                        <button>Validate</button>
                    </form>
                </div>
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
                config: {},
                smart_contracts: []
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

                this.smart_contracts = data.smart_contracts
            },
            async validate() {

                let url = ''
                let data = {}
                let response

                url = '/api/repository/store'
                data = {
                    url: this.url,
                    repository: this.repository,
                    config: this.smart_contracts,
                }

                console.log(data)
                console.log(this.smart_contracts)
                return
                //response = axios.post(url, data)
                /*
                 data = {
                    title: smart_contract.title,
                    description: smart_contract.description,
                    version: smart_contract.version,
                    file: smart_contract.file,
                    username: this.username,
                    repository: this.repo,
                    user_id: this.id,
                }


                url = '/api/sc/store'
                const response = await axios.post(url, data)
                if (response.data === 'success') {
                    swal('Success', 'Smart Contract created', 'success')
                }

                 */
            }
        },
    }
</script>