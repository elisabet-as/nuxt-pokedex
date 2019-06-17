<template>
    <div class="pokemon-info">
        <v-layout class="row mb-4">
            <v-btn fab dark color="secondary" class="ml-5" @click="returnHome()">
                <v-icon center>arrow_back</v-icon>
            </v-btn>
        </v-layout>
        <v-layout class="row d-flex justify-center mb-5">
            <v-flex class="xs12 sm8 md6">
                <v-card color="light" height="350px" class="d-flex align-center pa-5 my-4" v-for="(character, id) in character"  :key="id">
                    <div class="pokemon-info-details info--text d-flex">
                        <h3 class="pokemon-info-name">
                            {{character.name}}
                        </h3>
                        <p>
                            {{character.isBaby}}
                        </p>
                        <p v-if="showEvolvesFrom">
                            {{character.evolvesFrom}}
                        </p>
                        <p>
                            {{character.evolvesTo}}
                        </p>
                    </div>
                    <div class="pokemon-info-img">
                        <img :src="character.img" alt="character">
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout class="row justify-center mb-4">
            <v-btn color="secondary" dark @click="nextRoute('substract')" v-if="showBtnLastCharacter">
                <v-icon left>arrow_back</v-icon>anterior
            </v-btn>
            <v-btn color="secondary" dark @click="nextRoute('sum')" v-if="showBtnNextCharacter">
                siguiente<v-icon right>arrow_forward</v-icon>
            </v-btn>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios';
import Character from '~/models/Character'

export default {
    name: "CharacterComponent",
    data() {
        return {
            id: this.$route.params.id,
            showEvolvesFrom: true,
        }
    },
    created() {},
    computed: {
        characters() {
            return this.$store.getters['entities/characters/all']()
        },
        character() {
            return this.$store.getters['entities/character/all']()
        },
        showBtnLastCharacter() {
            return parseInt(this.id) == 1 ? false : true
        },
        showBtnNextCharacter() {
            return parseInt(this.id) == this.characters.length ? false : true
        }
    },
    watch: {
        '$route' (to, from) {
            this.nextRoute(operation)
        }
    },
    methods: {
        isVisibleEvolvesFrom() {
            if (character.evolvesFrom == null) {
                this.showEvolvesFrom = false
            } else {
                this.showEvolvesFrom = true
            }
        },

        nextRoute(operation) {
            let nextCharacter;
            if (operation == 'sum') {
                nextCharacter = parseInt(this.id) + 1
            } else {
                nextCharacter = parseInt(this.id) - 1
            }
            this.$router.push(`/character/${nextCharacter}`)
        },

        returnHome() {
            this.$router.push('/')
        }
    }
};
</script>
