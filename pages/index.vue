<template>
    <v-app class="medium">
        <v-content>
            <v-flex>
                <Characters/>
            </v-flex>
        </v-content>
    </v-app>
</template>

<script>
import Characters from '~/components/Characters.vue'
import axios from 'axios'

export default {
    components: {
        Characters
    },
    created() {},
    async fetch ({ store, params }) {
        let characters = []

        for (let i = 1; i <= 18; i++) {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            characters.push(result.data)
            store.dispatch('getCharacters', characters)
        }
    },
    methods: {

    }
};
</script>
