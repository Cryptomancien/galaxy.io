<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-content">
                <router-link class="button is-info" to="/">Back</router-link>

                <h1 class="mt-3 is-size-3">Register new contract</h1>
                <pre>{{$data}}</pre>

                <form class="mt-3" @submit.prevent="handleForm">
                    <div class="field">
                        <label class="label">URL <small v-if="error">{{ error }}</small></label>

                        <div class="control">
                            <input class="input is-info" :class="{ 'is-danger': error }" type="text" placeholder="https://github.com/account/repository/blob/branch/awesome-contract.bas" v-model="url" @input="handleInput">
                        </div>
                    </div>
                    <div class="field">
                        <pre>{{ contract }}</pre>
                    </div>
                    <div class="field">
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
    import {ValidateUrl, loadFileContent} from '../helpers/create2'

    export default {
        name: 'Create2.vue',

        mounted() {

        },

        data() {
            return {
                url: '',
                error: '',
                contract: '',
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
                    this.contract = ''
                    return
                }

                this.error = ''
                this.contract = ''
                this.form_submit_allowed = false

                this.contract = await loadFileContent(this.url)

                if (this.url.length && ! this.error && this.contract.length) {
                    this.form_submit_allowed = true
                    this.handleForm()
                }
            },

            async handleForm() {
                alert('ok')
            },
        }
    }
</script>