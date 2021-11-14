<template>
    <router-view />

  <!--
    <div class="mt-2">
        <div class="columns">
            <div class="column is-one-quarter app-nav">
                <router-link to="/app">Home</router-link>
                <router-link to="/app/repositories">Repositories</router-link>
                <router-link to="/app/contracts">Contracts</router-link>
                <a href="/logout">Logout</a>
            </div>
            <div class="column">
                <router-view />
            </div>
        </div>
    </div>
     -->


</template>

<script>
    export default {
        name: 'App'
    }
</script>