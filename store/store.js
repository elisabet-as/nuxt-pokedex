import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

new Vuex.Store({
    state: {
        characters: []
    },
    mutations: {
        saveCharacters: (state, characters) => state.characters = characters
    },
    actions: {
        getCharacters: ({commit}, characters) => {
            for (let i = 1; i <= 19; i++) {
                axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then((result) =>{
                    characters = result.data
                })
            }
            characters.sort((a, b) => a.id - b.id)
            commit('saveCharacters', characters)
        }
    },
})
