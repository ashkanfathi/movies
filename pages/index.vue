<template>
  <div class="page">
    <SearchBar />

    <div v-if="getMovies && getGenre && !getLoading" class="movies_list">
      <MovieCard v-for="movie in getMovies.results" :key="movie.id" :movieData="movie" :movieGenre="getGenre"/>
    </div>
    <div class="movies_list" v-if="getLoading">
      <MovieCardLoading v-for="i in 6" :key="i" />
    </div>

    <div class="movies_pagination" v-if="getMovies && getMovies.total_pages">
      <div class="previous" @click="prevPage" :class="{item_active : getPage > 1}">Previous Page</div>
      <div class="line"></div>
      <div class="next" @click="nextPage" :class="{item_active : getPage < getMovies.total_pages}">Next Page</div>
    </div>

    <div class="movies_results" v-if="getMovies && getMovies.total_pages">Showing results {{getPage}}-{{getMovies.total_pages > 20 ? 20 : getMovies.total_pages}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomePage',
  async fetch(){
    await this.$store.dispatch('home/getMovies')
    await this.$store.dispatch('home/getGenre')
  },
  fetchOnServer: false,
  computed:{
    ...mapGetters('home', ['getMovies', 'getLoading', 'getPage', 'getGenre'])
  },
  methods:{
    prevPage(){
      this.$store.commit('home/SET_DECREMENT_PAGE')
      this.$fetch()
    },
    nextPage(){
      if(this.getPage < this.getMovies.total_pages){
        this.$store.commit('home/SET_INCREMENT_PAGE')
        this.$fetch()
      }
    }
  }
}
</script>

<style scoped>
.movies_list{
  padding: 120px 0;
  row-gap: 30px;
  column-gap: 65px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.movies_pagination{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px
}
.previous,
.next{
  color: #0000007A;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.item_active{
  color: #318FE7;
}
.line{
  width: 1px;
  height: 40px;
  background-color: #0000007A
}
.movies_results{
  display: flex;
  align-items: center;
  justify-content: center;
}
.movies_results{
  color: #989898;
  margin-top: 15px;
}
</style>