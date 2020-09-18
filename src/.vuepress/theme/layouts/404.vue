<template>
    <div class="theme-container">
        <div class="theme-default-content">
            <h1>404</h1>

            <blockquote>{{ getMsg() }}</blockquote>

            <RouterLink to="/">Click here to go home...</RouterLink>
        </div>
    </div>
</template>

<script>
const msgs = [
    `Page probably doesn't exist. Refreshing this page might help.`,
    `Guess the page doesn't exist.`,
    `Poppin' a mean 404. Page translation doesn't exist.`,
    `Yea, there's definitely no translation for that page.`,
];

export default {
    methods: {
        getMsg() {
            return msgs[Math.floor(Math.random() * msgs.length)];
        },
    },
};
</script>
