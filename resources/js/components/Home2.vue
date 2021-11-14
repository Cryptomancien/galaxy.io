<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-content">

                <router-link class="button is-info" to="/create">Create new contract</router-link>

                <table class="table is-stripped is-fullwidth is-hoverable is-bordered mt-3">
                    <thead>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Test</td>
                        <td>https://github.com/toto/toto/toto.bas</td>
                        <td>11/11/11</td>
                        <td>11/11/11</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home2'
    }
</script>
