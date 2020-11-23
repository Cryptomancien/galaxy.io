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
            this.username = document.querySelector('#username').innerText
        },
        data() {
            return {
                username: '',
                url: '',
                repo: '',
                config: {}
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

                try {
                    let response = await axios.get(url)
                    this.config = await response.data

                } catch (error) {
                    await console.log('the file galaxy.json is missing at the root of the repository')
                }

                url = '/api/sc/store'
                axios.post(url, {
                    config: this.config,
                    username: this.username,
                    repo: this.repo
                })
                .then(response => console.log(response))

            }
        },
    }
</script>