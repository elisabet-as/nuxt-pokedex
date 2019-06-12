import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
        state: {
            characters: []
        },
        actions: {
            getCharacters(state, characters) {
                return state.commit('getCharacters', characters)
            }
        },
        mutations: {
            getCharacters(state, characters) {
                state.characters = characters
            }
        },
        getters: {
            characters(state) {
                return state.characters
            }
        }
    });
