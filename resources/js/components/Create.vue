<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h1>Create new SC</h1>

                <form action="" @submit.prevent="handleForm">
                    <div class="form-group">
                        <input type="text" v-model="url" placeholder="https://github.com/you/repository" required>
                    </div>
                    <div class="form-group">
                        <button type="submit">Go</button>
                    </div>
                </form>
                <hr>

                <div v-if="smart_contracts.length" v-for="smart_contract in smart_contracts">
                    <form @submit.prevent="add(smart_contract)">
                        <div>Title: {{ smart_contract.title }}</div>
                        <div>Description: {{ smart_contract.description }}</div>
                        <div>File: {{ smart_contract.file }}</div>
                        <div>Version: {{ smart_contract.version }}</div>
                        <button type="submit">Add in database</button>
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
            const user_data = document.querySelector('#username')
            this.username = user_data.innerText
            this.id = user_data.dataset.id
        },
        data() {
            return {
                id: '',
                username: '',
                url: '',
                repo: '',
                config: {},

                loading: false,
                smart_contracts: []
            }
        },
        methods: {
            async handleForm() {
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

                let repo = this.url
                repo = repo.split('/')
                repo = repo.pop()
                this.repo = repo

                let url = `https://raw.githubusercontent.com/${this.username}/${this.repo}/main/galaxy.json`

                let response = await axios.get(url)
                let data = await response.data

                if ( ! data.smart_contracts) {
                    swal('Error', 'No smart contract found', 'error')
                    return
                }

                this.smart_contracts = data.smart_contracts
            },
            async add(smart_contract) {

                const data = {
                    title: smart_contract.title,
                    description: smart_contract.description,
                    version: smart_contract.version,
                    file: smart_contract.file,
                    username: this.username,
                    repository: this.repo,
                    user_id: this.id,
                }


                const url = '/api/sc/store'
                const response = await axios.post(url, data)
                if (response.data === 'success') {
                    swal('Success', 'Smart Contract created', 'success')
                }
            }
        },
    }
</script>