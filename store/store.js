import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

new Vuex.Store({
    state: {
        characters: []
    },
    mutations: {
        getCharacters(state, characters) {
            state.characters = characters
        }
    },
    actions: {
        getCharacters(context, characters) {
            context.commit('getCharacters', characters)
        }
    },
    getters: {
        characters(state) {
            return state.characters
        }
    }
})
