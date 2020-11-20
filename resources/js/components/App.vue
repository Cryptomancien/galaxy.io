<template>
    <div class="container">
        <div>
            <form @submit.prevent="create">
                <input type="text" placeholder="https://github.com/you/repository" v-model="new_sc_url_repo">
                <button type="submit">Go</button>
            </form>
        </div>

        <table>
            <thead>
                <th>Title</th>
                <th>Description</th>
                <th>File</th>
                <th>Refresh</th>
            </thead>
            <tbody>
                <tr v-if="! smart_contracts.length">
                    <td>NO smart contract yet</td>
                </tr>

                <tr v-for="smart_contract in smart_contracts">
                    <td>{{ smart_contract.title }}</td>
                    <td>{{ smart_contract.description }}</td>
                    <td>{{ smart_contract.file }}</td>
                    <td>
                        <div>
                            <button>Refresh</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import { create } from "../functions/SC";

export default {
    name: 'App',
    components: {
        //HelloWorld
    },
    mounted() {
        this.username = document.querySelector('#username').innerText
    },
    data() {
        return {
            username: '',
            new_sc_url_repo: '',
            smart_contracts: [
                {
                    title: 'hello world',
                    description: 'a simple hello world',
                    url: 'http://github.com/toto/helloworld',
                    file: 'index/bas',
                },

            ]
        }
    },
    methods: {
        async create() {
            console.log(this.new_sc_url_repo)

            if ( ! this.new_sc_url_repo) {
                console.error('The input can not be empty')
                return
            }

            let url = 'https://api.github.com/repos/${this.username}/${this.new_sc_url_repo}/contents/galaxy.json'

            axios
                .get(url)
                .then((response) => {

                })

            this.new_sc_url_repo = ''
        }
    }
}
</script>

<style scoped>
    .container {
        background: #fff;
        display: flex;
        flex-direction: column;
    }
</style>