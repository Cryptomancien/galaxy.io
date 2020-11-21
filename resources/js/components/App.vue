<template>
    <div id="app">
        <div id="nav">
            <div class="container">
                <div class="row">
                    <router-link to="/app">Home</router-link> |
                    <router-link to="/app/sc/create">Create new SC</router-link>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>