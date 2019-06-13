export const strict = false

export const state = () => ({
    characters: [],
    character: {},
})

export const mutations = {
    GET_CHARACTERS(state, characters) {
        state.characters = characters
    },
    GET_DETAIL_CHARACTER(state, character) {
        state.character = character
    },
}

export const actions = {
    getCharacters({commit}, characters) {
        return commit('GET_CHARACTERS', characters)
    },
    getDetailsCharacter({commit}, character) {
        return commit('GET_DETAIL_CHARACTER', character)
    },
}

export const getters = {
    characters(state) {
        return state.characters
    },
    character(state) {
        return state.character
    },
}
