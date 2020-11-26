<template>
    <div class="container">
        <div class="row">
            <div class="app-nav">
                <router-link to="/app">Home</router-link>
                <router-link to="/app/repositories">Repositories</router-link>
                <router-link to="/app/sc/create">Smart Contracts</router-link>
                <a href="/logout">Logout</a>
            </div>
            <div class="card">
                <router-view />
            </div>
        </div>
    </div>
</template>