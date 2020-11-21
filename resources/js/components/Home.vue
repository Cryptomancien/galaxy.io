<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <table>
                    <thead>
                        <th>Title</th>
                        <th>Description</th>
                        <th>File</th>
                        <th>Refresh</th>
                    </thead>
                    <tbody>
                        <tr v-if="! smart_contracts.length">
                            <td colspan="4">NO smart contract yet</td>
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
        </div>
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
                /*
                {
                    title: 'hello world',
                    description: 'a simple hello world',
                    url: 'http://github.com/toto/helloworld',
                    file: 'index/bas',
                },
                */
            ]
        }
    },
    methods: {

    }
}
</script>

<style scoped>

</style>