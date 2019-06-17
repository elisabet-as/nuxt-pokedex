<template>
    <v-app class="medium">
        <v-content>
            <v-flex>
                <CharactersComponent/>
            </v-flex>
        </v-content>
    </v-app>
</template>

<script>
import CharactersComponent from '~/components/CharactersComponent.vue';
import Characters from '~/models/Characters'
import axios from 'axios';

export default {
    components: {
        CharactersComponent
    },
    created() {},
    async fetch ({ store, params }) {
        let characters = []

        for (let i = 1; i <= 18; i++) {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            Object.defineProperty(result.data, 'img', {
                value: result.data.sprites.front_default
            });
            characters.push(result.data)
            Characters.create({ data: characters })
            // store.dispatch('getCharacters', characters)
        }
    },
    methods: {}
};
</script>
