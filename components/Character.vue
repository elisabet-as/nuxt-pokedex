<template>
    <div class="pokemon-info">
        <v-layout class="row mb-4">
            <v-btn fab dark color="secondary" class="ml-5" @click="returnHome()">
                <v-icon center>arrow_back</v-icon>
            </v-btn>
        </v-layout>
        <v-layout class="row d-flex justify-center mb-5">
            <v-flex class="xs12 sm8 md6">
                <v-card color="light" height="350px" class="d-flex align-center pa-5 my-4">
                    <div class="pokemon-info-details info--text d-flex">
                        <h3 class="pokemon-info-name">
                            {{character.name}}
                        </h3>
                        <p>
                            {{isBaby}}
                        </p>
                        <p v-if="showEvolvesFrom">
                            {{evolvesFrom}}
                        </p>
                        <p>
                            {{evolvesTo}}
                        </p>
                    </div>
                    <div class="pokemon-info-img">
                        <img :src="characterImg" alt="character">
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

export default {
    name: "Character",
    data() {
        return {
            id: this.$route.params.id,
            character: {},
            characterImg: '',
            urlEvolutions: '',
            isBaby: '',
            evolvesFrom: '',
            showEvolvesFrom: true,
            evolvesTo: '',
        }
    },
    created() {
        this.getCharacter()
    },
    computed: {
        showBtnLastCharacter() {
            return parseInt(this.id) == 1 ? false : true
        },
        showBtnNextCharacter() {
            return parseInt(this.id) == 19 ? false : true
        }
    },
    watch: {
        '$route' (to, from) {
            this.nextRoute(operation)
        }
    },
    methods: {
        async getCharacter() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
                const character = await result.data
                const characterImg = await result.data.sprites.front_default
                this.character = character
                this.characterImg = characterImg
                await this.getCharacterAge()
                await this.getCharacterEvolutions()
            } catch(e) {
                console.log(e)
            }


        },
        async getCharacterAge() {
            try {
                const result = await axios.get(this.character.species.url)
                const urlEvolutions = await result.data.evolution_chain.url
                const evolvesFrom = await result.data.evolves_from_species
                const isBaby = await result.data.is_baby
                this.urlEvolutions = urlEvolutions
                if (evolvesFrom == null) {
                    this.evolvesFrom = ''
                    this.showEvolvesFrom = false
                } else {
                    this.evolvesFrom = 'Este pokemon evoluciona de ' + evolvesFrom.name
                    this.showEvolvesFrom = true
                }
                isBaby ? this.isBaby = 'Pokemon bebé' : this.isBaby = 'Pokemon adulto'
            } catch (e) {
                console.log(e)
            }
        },
        async getCharacterEvolutions() {
            try {
                const result = await axios.get(this.urlEvolutions)
                const evolutions = result.data.chain
                const firstEvolution = result.data.chain.species.name
                const getSecondEvolution = evolutions.evolves_to.map((evolution) => {
                    return evolution.species.name
                })
                const secondEvolution = getSecondEvolution.toString()
                const getThirdEvolution = evolutions.evolves_to.map((finalEvolution) => {
                    if (finalEvolution.evolves_to.length == 0) {
                        return undefined
                    } else {
                        return finalEvolution.evolves_to[0].species.name
                    }
                })

                const thirdEvolution = getThirdEvolution.toString()

                if (this.character.name == firstEvolution) {
                    this.evolvesTo = `Este Pokémon evoluciona a ${secondEvolution}`
                } else if (this.character.name == secondEvolution) {
                    this.evolvesTo = `Este Pokémon evoluciona a ${thirdEvolution}`
                } else if (this.character.name == thirdEvolution) {
                    this.evolvesTo = 'Este Pokémon no tiene evolución'
                }
            } catch (e) {
                console.log(e)
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
