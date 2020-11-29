<template>
    <div class="card mb-2">
        <div class="card-header">
            <h1 class="card-header-title is-size-4">Repository {{ repository.url }}</h1>
        </div>
        <div class="card-content">

            <div v-for="sc in smart_contracts">
                <div>{{ sc.title }}</div>
                <div>{{ sc.description }}</div>
                <div>{{ sc.file }}</div>
                <div>{{ sc.version }}</div>
            </div>

            <form @submit.prevent="destroy(repository._id)">
                <button type="submit" class="button is-danger">Delete</button>
            </form>
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

        async destroy(id) {

            const confirm = await swal('Are you sure to delete ?', {
                buttons: ["Nope", true],
            })

            if ( ! confirm) {
                return
            }

            const url = `/api/repositories/${id}`
            const response = await axios.delete(url)
            const data = await response.data

            if (data === 'success') {
                this.$router.push('/app')
            }
        }
    }

}
</script>