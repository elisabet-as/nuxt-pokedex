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
import Characters from '~/components/Characters.vue';
import axios from 'axios'

export default {
    components: {
        Characters
    },
    created() {
        this.getCharacters()
    },
    computed: {},
    methods: {
        getCharacters() {
            let characters = []
            for (let i = 1; i <= 19; i++) {
                axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then((result) => {
                    characters.push(result.data)
                })
            }
            this.$store.dispatch('getCharacters', characters)
        },
    }
};
</script>
