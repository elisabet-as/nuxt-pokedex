<template>
    <v-app class="medium">
        <v-content>
            <v-flex text-xs-center>
                <CharacterComponent/>
            </v-flex>
        </v-content>
    </v-app>
</template>

<script>
import CharacterComponent from '~/components/CharacterComponent.vue';
import Character from '~/models/Character'
import axios from 'axios';

export default {
    components: {
        CharacterComponent
    },
    async fetch ({ store, params }) {
        // GET NAME AND IMAGE
        const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        const characterInfo = details.data
        const name = characterInfo.name
        const img = details.data.sprites.front_default
        // GET IF IS BABY AND WHO EVOLVES FROM
        const age = await axios.get(characterInfo.species.url)
        const urlEvolutions = age.data.evolution_chain.url
        let evolvesFrom = age.data.evolves_from_species
        let isBaby = age.data.is_baby
        if (evolvesFrom == null) {
            evolvesFrom = ''
        } else {
            evolvesFrom = 'Este pokemon evoluciona de ' + evolvesFrom.name
        }
        // GET EVOLUTIONS
        const getEvolutions = await axios.get(urlEvolutions)
        const evolutions = getEvolutions.data.chain
        const firstEvolution = getEvolutions.data.chain.species.name
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
        // SHOW WHO EVOLVES TO
        let evolvesTo = ''
        if (name == firstEvolution) {
            evolvesTo = `Este Pokémon evoluciona a ${secondEvolution}`
        } else if (name == secondEvolution) {
            evolvesTo = `Este Pokémon evoluciona a ${thirdEvolution}`
        } else if (name == thirdEvolution) {
            evolvesTo = 'Este Pokémon no tiene evolución'
        }
        // CREATE OBJECT AND SEND TO STATE
        const character = {
            name,
            img,
            evolvesFrom,
            isBaby: isBaby ? 'Pokemon bebé' : 'Pokemon adulto',
            evolvesTo
        }
        Character.create({ data: character })
    }
};
</script>
