<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-content">
                <router-link class="button is-info" to="/">Back</router-link>

                <h1 class="mt-3 is-size-3">Register new contract</h1>

                <form class="mt-3" @submit.prevent="handleForm">

                    <div class="field mt-5">
                        <label class="label">Title</label>
                        <div class="control">
                            <input type="text" class="input is-info" placeholder="Title" v-model="title" required>
                        </div>
                    </div>

                    <div class="field mt-5">
                        <label class="label">Description</label>
                        <input type="text" class="input is-info" placeholder="Short description" v-model="description" required>
                    </div>

                    <div class="field mt-5">
                        <label class="label">Version</label>
                        <input type="text" class="input is-info" placeholder="0.0.1" v-model="version" required>
                    </div>

                    <div class="field mt-5">
                        <label class="label">URL <small v-if="error">{{ error }}</small></label>
                        <div class="control">
                            <input class="input is-info" :class="{ 'is-danger': error }" type="text" placeholder="https://github.com/account/repository/blob/branch/awesome-contract.bas" v-model="url" @input="handleInput">
                        </div>
                    </div>


                    <div class="field mt-5">
                        <pre>{{ content }}</pre>
                    </div>
                    <div class="field mt-5">
                        <div class="control">
                            <button type="submit" class="button is-info" :disabled=" ! form_submit_allowed">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {ValidateUrl, loadFileContent} from '../helpers/create2'

    export default {
        name: 'Create.vue',

        mounted() {

        },

        data() {
            return {
                title: '',
                description: '',
                version: '0.0.1',
                url: '',
                error: '',
                content: '',
                form_submit_allowed: false
            }
        },

        methods: {
            async handleInput() {
                if ( ! this.url) {
                    this.error = ''
                    this.contract = ''
                    this.form_submit_allowed = false
                }

                const validate = new ValidateUrl(this.url)

                const response = await validate.validate()
                //console.log(response)

                if (response.status === 'error') {
                    this.error = response.message
                    this.content = ''
                    return
                }

                this.error = ''
                this.content = ''
                this.form_submit_allowed = false

                this.content = await loadFileContent(this.url)

                if (this.url.length && ! this.error && this.content.length) {
                    this.form_submit_allowed = true
                }
            },

            async handleForm() {
                const url = '/api/contracts'
                const data = {
                    title: this.title,
                    description: this.description,
                    version: this.version,
                    url: this.url,
                    content: this.content
                }

                let response = await axios.post(url, data)
                response = await response.data
                console.log(response)

                await this.$router.push('/')
                alert('ok')

            },
        }
    }
</script>