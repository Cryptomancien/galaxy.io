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
    import swal from 'sweetalert'

    import {validateUrlConfig, parseRepository} from '../helpers/create'

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
                content: '',
                repository_id: ''
            }
        },
        methods: {
            async loadConfig() {
                // Validate the url
                const error = validateUrlConfig(this.url, this.username)
                if (error) {
                    swal('Error', error, 'error')
                    return
                }

                // Get the repository
                this.repository = this.url.split('/').pop()

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

                await this.saveRepository()
                await this.saveSmartContracts()

                await this.$router.push('/app')
                swal('Success', 'All fine', 'success')
            },

            async saveRepository() {
                let url = ''
                let data = {}
                let response

                url = '/api/repositories'
                data = {
                    url: this.url,
                    name: this.repository,
                    content: this.content
                }

                response = await axios.post(url, data)
                data = await response.data
                const id = data.id
                this.repository_id = id
            },

            async saveSmartContracts() {

                async function getContent(file, username, repository) {
                    try {
                        const url = `https://raw.githubusercontent.com/${username}/${repository}/main/${file}`
                        const response = await axios.get(url)
                        const data = await response.data
                        return data
                    } catch (error) {
                        console.error(error)
                        throw new Error(error)
                    }
                }

                for await (let sc of this.smart_contracts) {
                    let data_to_post = {
                        title: sc.title,
                        description: sc.description,
                        file: sc.file,
                        version: sc.version,
                        repository: this.repository,
                        content:  '',
                        repository_id: this.repository_id
                    }

                    const content = await getContent(sc.file, this.$data.username, this.$data.repository)

                    data_to_post.content = await content

                    const url = '/api/contracts'
                    const response = await axios.post(url, data_to_post)
                    if (response.status === 200) {
                        console.log(response.data)
                    }
                    else {
                        throw new Error('something is wrong')
                    }
                }
            },
        },
    }
</script>