<template>
    <div class="container">
        <div class="row">
            <div class="app-nav">
                <router-link to="/app">Home</router-link>
                <router-link to="/app/repositories">Repositories</router-link>
                <router-link to="/app/sc">Smart Contracts</router-link>
                <a href="/logout">Logout</a>
            </div>
            <div class="" style="width: 100%;">
                <router-view />
            </div>
        </div>
    </div>
</template>