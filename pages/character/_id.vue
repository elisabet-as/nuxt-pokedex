<template>
    <v-app class="medium">
        <v-content>
            <v-flex text-xs-center>
                <Character/>
            </v-flex>
        </v-content>
    </v-app>
</template>

<script>
import Character from '~/components/Character.vue';
import axios from 'axios';

export default {
    components: {
        Character
    },
    async fetch ({ store, params }) {
        const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        const characterInfo = await details.data
        const characterImg = await details.data.sprites.front_default
        let character = {
            characterInfo,
            characterImg,
        }
        store.dispatch('getDetailsCharacter', character)
    }
};
</script>
