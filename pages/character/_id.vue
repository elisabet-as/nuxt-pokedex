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
        // GET NAME AND IMAGE
        let details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        let characterInfo = await details.data
        let characterImg = await details.data.sprites.front_default
        // GET IF IS BABY AND WHO EVOLVES FROM
        let age = await axios.get(characterInfo.species.url)
        let urlEvolutions = await age.data.evolution_chain.url
        let evolvesFrom = await age.data.evolves_from_species
        let isBaby = await age.data.is_baby
        if (evolvesFrom == null) {
            evolvesFrom = ''
        } else {
            evolvesFrom = 'Este pokemon evoluciona de ' + evolvesFrom.name
        }
        // GET EVOLUTIONS
        let getEvolutions = await axios.get(urlEvolutions)
        let evolutions = getEvolutions.data.chain
        let firstEvolution = getEvolutions.data.chain.species.name
        let getSecondEvolution = evolutions.evolves_to.map((evolution) => {
            return evolution.species.name
        })
        let secondEvolution = getSecondEvolution.toString()
        let getThirdEvolution = evolutions.evolves_to.map((finalEvolution) => {
            if (finalEvolution.evolves_to.length == 0) {
                return undefined
            } else {
                return finalEvolution.evolves_to[0].species.name
            }
        })
        let thirdEvolution = getThirdEvolution.toString()
        // SHOW WHO EVOLVES TO
        let evolvesTo = ''
        if (characterInfo.name == firstEvolution) {
            evolvesTo = `Este Pokémon evoluciona a ${secondEvolution}`
        } else if (characterInfo.name == secondEvolution) {
            evolvesTo = `Este Pokémon evoluciona a ${thirdEvolution}`
        } else if (characterInfo.name == thirdEvolution) {
            evolvesTo = 'Este Pokémon no tiene evolución'
        }
        // CREATE OBJECT AND SEND TO STATE
        let character = {
            characterInfo,
            characterImg,
            evolvesFrom,
            isBaby: isBaby ? 'Pokemon bebé' : 'Pokemon adulto',
            evolvesTo
        }
        store.dispatch('getDetailsCharacter', character)
    }
};
</script>
