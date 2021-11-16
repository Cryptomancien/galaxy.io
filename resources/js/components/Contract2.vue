<template>
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
                    <button class="button is-danger">Delete</button>
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
        this.fetchContract()
    },

    data() {
        return {
            error: '',
            contract: {}
        }
    },

    methods: {
        async fetchContract() {
            const id = this.$route.params.id

            const url = `/api/contracts/${id}`


            const response = await axios.get(url)
            const data = await response.data

            this.contract = data
        },

        async handleInput() {

        },

        async handleForm() {

        },

        async handleDeleteForm() {

        }
    }
}
</script>