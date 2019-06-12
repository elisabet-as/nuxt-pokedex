<template lang="html">
    <v-container class="grid-list-xl text-xs-center">
        <h3 class="pokemon-title secondary--text">Pokédex</h3>
        <v-layout class="row wrap">
            <v-flex v-for="(character, key) in characters" :key="key" @click="showPokemon(character.id)" class="xs12 sm6 md3">
                <v-card height="230px" class="light px-4 py-2">
                    <div class="pokemon-img">
                        <img :src="character.sprites.front_default" alt="character"/>
                    </div>
                    <p class="pokemon-name info--text">{{ character.name }}</p>
                    <ul class="pokemons-types info--text">
                        <li class="types-word">Types: </li>
                        <ul class="types">
                            <li class="type" v-for="(skill, key) in character.types" :key="key">
                                {{ skill.type.name }}
                            </li>
                        </ul>
                    </ul>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'Characters',
    data() {
        return {};
    },
    created() {},
    computed: {
        characters() {
            this.$store.state.characters
        }
    },
    methods: {
        showPokemon(id) {
            this.$router.push(`/character/${id}`);
        }
    }
};
</script>
