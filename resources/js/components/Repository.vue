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

            <h2 class="is-size-4 mb-2">Smart contracts in this repository</h2>
            <div class="box" v-for="sc in smart_contracts">
                <div class="mb-2">Title: {{ sc.title }}</div>
                <div class="mb-2">Description: {{ sc.description }}</div>
                <div class="mb-2">File: {{ sc.file }}</div>
                <div class="mb-2">Version: {{ sc.version }}</div>
                <div class="mb-2">Content: {{ sc.content }}</div>
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
        this.fetchRepository(id)
    },

    data() {
        return {
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

            await this.fixSmartContracts()
        },

        async refresh() {
            const id = this.repository._id
            const url = `/api/repositories/${id}`
            const response = await axios.put(url)
            const data = await response.data

            this.repository = data
            await this.fixSmartContracts()

            await swal('Success', 'Repository and smart contracts updated', 'success')
        },

        async fixSmartContracts() {
            let smart_contracts = []
            this.repository.content.smart_contracts.forEach((x) => {
                const o = {
                    title: x.title,
                    description: x.description,
                    file: x.file,
                    version: x.version,
                }

                smart_contracts.push(o)
            })

            this.smart_contracts = smart_contracts
        },

        async destroy() {

            const confirm = await swal('Are you sure to delete ?', {
                buttons: ["Nope", true],
            })

            if ( ! confirm) {
                return
            }

            const url = `/api/repositories/${this.repository._id}`
            const response = await axios.delete(url)
            const data = await response.data

            if (data === 'success') {
                this.$router.push('/app')
            }
        }
    }
}
</script>