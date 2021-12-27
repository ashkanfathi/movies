<template>
  <div class="max-w-5xl mx-auto page">
    <DetailBar v-if="getMovie && !getLoading" :movieData="getMovie" />
    <DetailBarLoading v-else />

    <MovieDetail v-if="getMovie && getCredit && !getLoading" :movieData="getMovie" :movieCredit="getCredit" />
    <MovieDetailLoading v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MoviePage',
  async fetch(){
    await this.$store.dispatch('video/getMovie', this.$route.params.id)
    await this.$store.dispatch('video/getCredit', this.$route.params.id)
  },
  fetchOnServer: false,
  computed:{
    ...mapGetters('video', ['getMovie', 'getCredit', 'getLoading'])
  }
}
</script>

<style scoped>
.movies_list{
  padding: 120px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 30px;
  column-gap: 70px
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