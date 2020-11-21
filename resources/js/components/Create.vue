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
                        <input type="text" v-model="description" placeholder="Description" required>
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="tags" placeholder="Tags" required>
                    </div>
                    <div class="form-group">
                        <button type="submit">Go</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Create',
        mounted() {
            this.username = document.querySelector('#username').innerText
            const echo = 'https://api.github.com/repos/${this.username}/${this.new_sc_url_repo}/contents/galaxy.json'
            console.log(axios)
        },
        data() {
            return {
                user: '',
                url: '',
                description: '',
                tags: ''
            }
        },
        methods: {
            async handleForm() {

                if ( ! this.url) {
                    console.error('the repo must be valid. Example: https://github.com/<account>/<repository>/<fil.base>')
                    return
                }

                if ( ! this.description ) {
                     console.error('The description must be valid')
                    return
                }

                if ( ! this.tags) {
                    console.error('At least one tag please')
                    return
                }


            }
        }
    }
</script>