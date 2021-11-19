<template>
    <!-- TODO REPLACE ALERT BY SWAL -->
    <div class="container mt-3">
        <div class="card">
            <div class="card-content">

                <router-link class="button is-info" to="/">Back</router-link>

                <form class="mt-3" @submit.prevent="handleForm">
                    <div class="field mt-5">
                        <label class="label">Title</label>
                        <div class="control">
                            <input type="text" class="input is-info" placeholder="Title" v-model="contract.title" required>
                        </div>
                    </div>

                    <div class="field mt-5">
                        <label class="label">Description</label>
                        <div class="control">
                            <input type="text" class="input is-info" placeholder="Description" v-model="contract.description" required>
                        </div>
                    </div>

                    <div class="field mt-5">
                        <label class="label">Version</label>
                        <input type="text" class="input is-info" placeholder="0.0.1" v-model="contract.version" required>
                    </div>

                    <div class="field mt-5">
                        <label class="label">URL <small v-if="error">{{ error }}</small></label>
                        <div class="control">
                            <input class="input is-info" :class="{ 'is-danger': error }" type="text" placeholder="https://github.com/account/repository/blob/branch/awesome-contract.bas" v-model="contract.url" @input="handleInput">
                        </div>
                    </div>

                    <div class="field mt-5">
                        <pre>{{ contract.content }}</pre>
                    </div>

                    <div class="field mt-5">
                        <div class="control">
                            <button class="button is-success">Send</button>
                        </div>
                    </div>
                </form>
                <hr>
                <form class="is-flex is-justify-content-flex-end" @submit.prevent="handleDeleteForm">
                    <button class="button is-danger is-small">Delete</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Contract2.vue",

    mounted() {
        this.setId()
        this.fetchContract()
    },

    data() {
        return {
            error: '',
            id: Number,
            contract: {}
        }
    },

    methods: {
        async setId() {
            const id = this.$route.params.id
            this.id = id
        },

        async fetchContract() {

            const url = `/api/contracts/${this.id}`

            const response = await axios.get(url)
            const data = await response.data

            this.contract = data
        },

        async handleInput() {

        },

        async handleForm() {
            const url = `/api/contracts/${this.id}`

            const data_post = {
                title: this.contract.title,
                description: this.contract.description,
                version: this.contract.version,
                url: this.contract.url,
                content: this.contract.content,
            }

            const response = await axios.put(url, data_post)
            const data = await response.data

            alert('ok')

        },

        async handleDeleteForm() {
            confirm('delete the contract ?')

            const url = `/api/contracts/${this.id}`

            const response = await axios.delete(url)
            const data = await response

            console.log(data)

            await this.$router.push('/')
            alert('ok')

        }
    }
}
</script>