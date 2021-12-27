<template>
  <nuxt-link :to="`/v/${movieData.id}`" class="card">
    <v-img
      max-height="188"
      max-width="125"
      class="card_image"
      :src="`https://image.tmdb.org/t/p/w500${movieData.poster_path}`"
    ></v-img>
    <div class="card_detail">
      <div class="card_detail_title">{{movieData.title}}</div>
      <div class="card_detail_footer">
        <div class="card_detail_footer_date">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="16" height="16" fill="url(#pattern0)"/>
            <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_8_18" transform="translate(0 -0.015625) scale(0.03125)"/>
            </pattern>
            <image id="image0_8_18" width="32" height="33" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAQAAAASL2HaAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiAwoOOCiX8bOWAAAA8ElEQVRIx+2VTw7BUBCHv9afBVsShxHHEAcQcQaLLiyqV+AGIjiDOAzClkVbxkbrTUkpEpv+ZtHk9958b+a9ZAr/lvXgtGkBa6YJv0MTWDFLBzrILYbKH8a+kw7YIHi4CAfl7xFcPIRtOiBEKABnxGjPQjgDBYRQJxRv3yp96oBtrI2eHmHjAVsmnEx7Efd4r0BHVEEUC809ZgYcdQslA1YnfPK8FrV4t5ERbfQV4h0FlElc2kcyixpweTPLxk1aPqJgr44V/Ij1pXJADsgBPwIU4/lSopthHkCgreXDEH0Vcz0TK/RoZKh8x1j/F/6nK0D2d+Xdbd9cAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAzLTEwVDE0OjU2OjQwKzAwOjAwQn9tOgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMy0xMFQxNDo1Njo0MCswMDowMDMi1YYAAAAASUVORK5CYII="/>
            </defs>
          </svg>
          {{movieData.release_date}}
        </div>
        <div class="card_detail_footer_genre">
          <div class="card_detail_footer_genre_item" v-for="item in genre" :key="item.id">{{item.name}}</div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: "Card",
  props: ['movieData', 'movieGenre'],
  computed:{
    genre(){
      let genreIds = this.movieData.genre_ids
      let genreList = []
      genreIds.map((genreId) => {
        let filterItem = this.movieGenre.filter(item => item.id == genreId)
        genreList.push({
          id: filterItem[0].id,
          name: filterItem[0].name
        })
      })
      return genreList
    }
  }
}
</script>

<style scoped>
.card{
  background-color: #F1F1F1;
  padding: 4px;
  border-radius: 6px;
  display: flex;
}
.card_image{
  border-radius: 6px 0 0 6px;
  width: 125px;
  height: 188px;
}
.card_detail{
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card_detail_title{
  font-size: 16px;
  font-weight: bold;
  color: #000
}
.card_detail_footer{
  display: flex;
  flex-direction: column;
  gap: 15px
}
.card_detail_footer_date{
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: #4E4E4E
}
.card_detail_footer_genre{
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
}
.card_detail_footer_genre_item{
  font-size: 12px;
  position: relative;
  color: #505050;
}
.card_detail_footer_genre_item:not(:last-child):after{
  content: '';
  position: absolute;
  right: -9.5px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #505050;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>