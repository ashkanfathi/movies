export const state = () => {
  return{
    loading: true,
    movie: null,
    credit: null
  }
}

export const getters = {
  getLoading(state){
    return state.loading
  },
  getMovie(state){
    return state.movie
  },
  getCredit(state){
    return state.credit
  }
}

export const mutations = {
  SET_LOADING(state, payload){
    state.loading = payload
  },
  SET_MOVIE(state, payload){
    state.movie = payload
  },
  SET_CREDIT(state, payload){
    state.credit = payload
  }
}

export const actions = {
  async getMovie({ commit }, id){
    commit('SET_LOADING', true)
    await this.$axios({
      method: 'get',
      url: `/movie/${id}?api_key=f62f750b70a8ef11dad44670cfb6aa57`
    }).then((response) => {
      commit('SET_LOADING', false)
      commit('SET_MOVIE', response.data)
    }).catch((err) => {
      commit('SET_LOADING', false)
    })
  },
  async getCredit({ commit }, id){
    commit('SET_LOADING', true)
    await this.$axios({
      method: 'get',
      url: `/movie/${id}/credits?api_key=f62f750b70a8ef11dad44670cfb6aa57`
    }).then((response) => {
      commit('SET_LOADING', false)
      commit('SET_CREDIT', response.data)
    }).catch((err) => {
      commit('SET_LOADING', false)
    })
  },
}