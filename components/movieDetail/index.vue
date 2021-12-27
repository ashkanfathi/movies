<template>
  <div class="detail">
    <div class="detail_row">
      <div class="detail_row_poster">
        <v-img
          max-height="495"
          max-width="330"
          class="card_image"
          :src="`https://image.tmdb.org/t/p/w500${movieData.poster_path}`"
        ></v-img>
      </div>
      <div class="detail_row_list">
        <div class="detail_row_list_item">
          <div class="detail_row_list_item_key">Budget:</div>
          <div class="detail_row_list_item_value">${{movieData.budget.toLocaleString()}}</div>
        </div>
        <div class="detail_row_list_item">
          <div class="detail_row_list_item_key">Revenue:</div>
          <div class="detail_row_list_item_value">${{movieData.revenue.toLocaleString()}}</div>
        </div>
        <div class="detail_row_list_item">
          <div class="detail_row_list_item_key">Release Date:</div>
          <div class="detail_row_list_item_value">{{movieData.release_date}}</div>
        </div>
        <div class="detail_row_list_item">
          <div class="detail_row_list_item_key">Runtime:</div>
          <div class="detail_row_list_item_value">{{hours}}h {{minutes}}m</div>
        </div>
        <div class="detail_row_list_item">
          <div class="detail_row_list_item_key">Score:</div>
          <div class="detail_row_list_item_value">{{movieData.vote_average}} <span>({{movieData.vote_count}}votes)</span></div>
        </div>
        <div class="detail_row_list_item">
          <div class="detail_row_list_item_key">Genres:</div>
          <div class="detail_row_list_item_value item_genres">
            <span v-for="item in movieData.genres" :key="item.id">{{item.name}}</span>
          </div>
        </div>
        <div class="detail_row_list_item">
          <div class="detail_row_list_item_key">IMDB Link:</div>
          <div class="detail_row_list_item_value">{{movieData.imdb_id}}</div>
        </div>
        <div class="detail_row_list_item">
          <div class="detail_row_list_item_key">Homepage Link:</div>
          <div class="detail_row_list_item_value">
            <a :href="movieData.homepage" target="_blank" rel="noopener noreferrer">Link</a>
          </div>
        </div>
      </div>
    </div>

    <div class="detail_description">{{movieData.overview}}</div>

    <div class="detail_credit">
      <div class="detail_credit_titr">Credit:</div>
      <div class="detail_credit_description item_credit">
        <span v-for="item in crefitList" :key="item.id">{{item.name}}</span>{{`and ${this.movieCredit.cast.length - 10} more.`}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ['movieData', 'movieCredit'],
  computed:{
    hours(){
      return Math.floor(this.movieData.runtime / 60)
    },
    minutes(){
      return Math.round(((this.movieData.runtime / 60) - Math.floor(this.movieData.runtime / 60)) * 60)
    },
    crefitList(){
      return this.movieCredit.cast.filter((item, index) => index < 10)
    }
  }
}
</script>

<style scoped>
.detail{
  padding: 75px 0
}
.detail_row{
  display: flex;
}
.detail_row_poster{
  width: 330px;
  height: 495px;
  border-radius: 12px;
  overflow: hidden;
}
.detail_row_list{
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 70px;
  width: calc(100% - 330px);
}
.detail_row_list_item{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.detail_row_list_item_key{
  color: #151515;
  font-weight: bold;
}
.detail_row_list_item_value{
  color: #151515;
  font-weight: normal;
}
.detail_row_list_item_value span{
  font-size: 14px
}
.item_genres,
.item_credit{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px
}
.item_genres span:not(:last-child):after,
.item_credit span:not(:last-child):after{
  content: ","
}
.detail_row_list_item_value a{
  color: #318FE7;
  text-decoration: line !important
}
.detail_description{
  padding: 50px 0 80px;
  color: #1E1E1E
}
.detail_credit{
  display: flex;
  flex-direction: column;
}
.detail_credit_titr{
  font-size: 18px;
  color: #000000;
  font-weight: bold;
}
</style>