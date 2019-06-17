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
            const id = result.data.id
            const name = result.data.name
            const img = result.data.sprites.front_default
            const types = result.data.types
            const character = {
                id,
                name,
                img,
                types
            }
            characters.push(character)
            Characters.create({ data: characters })
        }
    },
    methods: {}
};
</script>
