<template>
    <div class="card mb-2">
        <div class="card-header is-justify-content-space-between is-align-items-center">
            <h1 class="card-header-title">Repository: {{ repository.name }}</h1>
            <form @submit.prevent="destroy">
                <button type="submit" class="button is-danger is-small">Delete</button>
            </form>
        </div>
        <div class="card-content">
            <div class="mb-2">
                Link: <a :href="repository.url" target="_blank">{{ repository.url }}</a>
            </div>
            <div class="mb-2">
                <button class="button is-primary" @click="refresh">Refresh</button>
            </div>

            <h2 class="is-size-4 mb-2">Contracts in this repository</h2>
            <div class="box" v-for="contract in repository.contracts">
                <div class="mb-2">Title: {{ contract.title }}</div>
                <div class="mb-2">Description: {{ contract.description }}</div>
                <div class="mb-2">File: {{ contract.file }}</div>
                <div class="mb-2">Version: {{ contract.version }}</div>
                <div class="mb-2">
                    Content:
<pre>
{{ contract.content }}
</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import swal from 'sweetalert'

export default {
    name: 'Repository',

    mounted() {
        const id = window.location.pathname.split('/').pop() // get the id in url
        this.id = id
        this.fetchRepository(id)
    },

    data() {
        return {
            id: null,
            repository: {},
            smart_contracts: []
        }
    },

    methods: {

        async fetchRepository(id) {
            const url = `/api/repositories/${id}`

            const response = await axios.get(url)
            const data = await response.data

            this.repository = data
        },

        async refresh() {
            const id = this.id
            const url = `/api/repositories/${id}`

            const response = await axios.put(url)
            const data = await response.data

            this.repository = data

            await swal('Success', 'Repository and smart contracts updated', 'success')
        },

        async destroy() {

            const confirm = await swal('Are you sure to delete ?', {
                buttons: ["Nope", true],
            })

            if ( ! confirm) {
                return
            }

            const url = `/api/repositories/${this.id}`
            const response = await axios.delete(url)
            console.log(response)
            const data = await response.data

            if (data === true) {
                this.$router.push('/app')
                swal('Success', 'Repository deleted and all his contracts', 'success')
            }
            else {
                swal('Error', 'Try later', 'error')
            }
        }
    }
}
</script>