<template>
  <div class="search_bar d-flex align-center justify-space-between">
    <div class="search_row">
      <div class="search_row_label">Search by release date:</div>
      <client-only>
        <date-picker
          placeholder="MM/DD/YYYY"
          v-model="date"
          valueType="format"
          range
        />
      </client-only>
    </div>
    <v-btn
      depressed
      color="#549DF2"
      rounded
      class="btn"
      @click="search"
      :loading="btnLoading"
    >
      Search
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data(){
    return{
      btnLoading: false
    }
  },
  computed:{
    date:{
      get(){
        return this.$store.getters['home/getDate']
      },
      set(value){
        this.$store.commit('home/SET_DATE', value)
      }
    } 
  },
  methods:{
    async search(){
      this.btnLoading = true
      this.$store.commit('home/SER_RESET_PAGE')
      await this.$store.dispatch('home/getMovies').then(() => {
        this.btnLoading = false
      })
    }
  }
}
</script>

<style scoped>
.search_bar{
  height: 85px;
  background-color: #E2E2E2;
  padding: 0 65px;
  border-radius: 6px;
}
.search_row{
  display: flex;
  align-items: center;
  gap: 30px
}
.search_row_label{
  font-size: 16px;
  color: #000;
}
.search_row_input{
  width: 221px;
  height: 31px;
  outline: none;
  border: 1px solid #CFCFCF;
  padding: 0 10px
}
>>>.btn .v-btn__content{
  color: #fff !important;
}
>>>.btn .v-btn__loader .v-progress-circular svg{
  color: #fff;
}
</style>