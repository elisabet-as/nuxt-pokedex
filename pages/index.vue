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
    fetch ({ store, params }) {
        let characters = [
            {
                name: 'pokemon1',
                id: 1
            },
            {
                name: 'pokemon2',
                id: 2
            },
        ]
        store.dispatch('getCharacters', characters)
        // for (let i = 1; i <= 19; i++) {
        //     const promises = new Promise((resolve, reject) => {
            // axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
            // })
        // }
        //     Promise.all(promises)
        // .then((result) => {
        //     characters.push(result.data)
        //     store.commit('getCharacters', characters)
        // })
        // store.dispatch('getCharacters', characters)
    },
    methods: {}
};
</script>
