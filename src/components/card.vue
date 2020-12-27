<template>
    <div>
        <p class="top">{{ parseType(type) }}</p>
        <h1>{{ name }}</h1>
        <p class="bot">{{ parseType(type) }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
    props: {
        name: String,
        type: Boolean
    },
    methods: {
        parseType(type: Boolean) {
            return type ? 'Práca' : 'Kvalita'
        }
    }
})
</script>

<style scoped>
div {
    border: 1px solid black;
    display: grid;

    grid-template:  "a . ."
                    "b b b"
                    ". . c";
    border-radius: 1rem;
    max-width: 25rem;
    margin: 1rem;
}
h1, p {
    all: unset;
}

.top {
    grid-area: a;
    background-color: #ee0000aa;
    border-top-left-radius: 1rem;
    padding: 0.5rem 1rem 0.5rem 1.5rem;
}
h1 {
    grid-area: b;
    margin: 2rem 0.5rem;
}
.bot {
    grid-area: c;
    padding: 0.5rem 1.5rem 0.5rem 1rem;
    background-color: #ee0000aa;
    border-bottom-right-radius: 1rem;
}
</style>