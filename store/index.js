import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const state = () => ({
    characters: []
})

export const mutations = {
    GET_CHARACTERS(state, characters) {
        state.characters = characters
    }
}

export const actions = {
    getCharacters({commit}, characters) {
        return commit('GET_CHARACTERS', characters)
    }
}

export const getters = {
    characters(state) {
        return state.characters
    }
}

new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});
