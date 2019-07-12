<template lang="html">
    <v-container class="grid-list-xl text-xs-center">
        <h3 class="pokemon-title secondary--text">Pokédex</h3>
        <v-layout class="row wrap">
            <v-flex v-for="(character, key) in characters" :key="key" @click="showPokemon(character.id)" class="xs12 sm6 md3">
                <v-card height="230px" class="light px-4 py-2">
                    <div class="pokemon-img">
                        <img :src="character.img" alt="character"/>
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
            <v-flex class="xs12 sm6 md3 btn-add-card">
                <v-btn fab outline color="secondary" class="d-flex" @click="createCard()">
                    <v-icon center>add</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Characters from '~/models/Characters'

export default {
    name: 'CharactersComponent',
    data() {
        return {};
    },
    created() {},
    computed: {
        characters() {
            return this.$store.getters['entities/characters/all']()
        }
    },
    methods: {
        showPokemon(id) {
            this.$router.push(`/character/${id}`)
        },
        createCard() {
            console.log('hola')
            Characters.insert({
                data: {
                    name: 'Pokémon nuevo'
                }
            })
        }
    }
};
</script>
