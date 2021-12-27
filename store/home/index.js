export const state = () => {
  return{
    loading: true,
    movies: null,
    page: 1,
    genre: null,
    date: []
  }
}

export const getters = {
  getLoading(state){
    return state.loading
  },
  getMovies(state){
    return state.movies
  },
  getPage(state){
    return state.page
  },
  getGenre(state){
    return state.genre
  },
  getDate(state){
    return state.date
  }
}

export const mutations = {
  SET_LOADING(state, payload){
    state.loading = payload
  },
  SET_MOVIES(state, payload){
    state.movies = payload
  },
  SET_INCREMENT_PAGE(state){
    if(state.page < 20){
      state.page++
    }
  },
  SET_DECREMENT_PAGE(state){
    if(state.page > 1){
      state.page--
    }
  },
  SET_GENRE(state, payload){
    state.genre = payload
  },
  SET_DATE(state, payload){
    state.date = payload
  },
  SER_RESET_PAGE(state){
    state.page = 1
  }
}

export const actions = {
  async getMovies({ commit, state }){
    commit('SET_LOADING', true)
    await this.$axios({
      method: 'get',
      url: `/discover/movie?api_key=f62f750b70a8ef11dad44670cfb6aa57&page=${state.page}`,
      params:{
        'release_date.gte': state.date.length ? state.date[0] : null,
        'release_date.lte': state.date.length ? state.date[1] : null
      }
    }).then((response) => {
      console.log(response);
      commit('SET_LOADING', false)
      commit('SET_MOVIES', response.data)
    }).catch((err) => {
      commit('SET_LOADING', false)
    })
  },
  async getGenre({ commit, state }){
    await this.$axios({
      method: 'get',
      url: `/genre/movie/list?api_key=f62f750b70a8ef11dad44670cfb6aa57`
    }).then((response) => {
      commit('SET_GENRE', response.data.genres)
    }).catch((err) => {
    })
  },
}