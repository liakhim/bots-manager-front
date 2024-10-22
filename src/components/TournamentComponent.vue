<template>
<!--  :style="{'background-image': 'url(src/assets/' + image_number + '.jpg)'}"-->
  <div class="tournament-wrapper">
    <form>
      <input v-model="artist_name" type="text">
      <button type="button" @click="getSongs()">Send</button>
    </form>
    <div class="wrapper">
      <div class="song-blocks">
        <div class="song-block" v-for="song in songs.slice(0,16)">
          <div class="song-block-content">
            <img :src="song.img" alt="">
            <p>{{song.title}}</p>
          </div>
        </div>
      </div>
      <div class="one_eighth_final">
        <div class="block" v-for="item in 8">

        </div>
      </div>
      <div class="quarter_final">
        <div class="block" v-for="item in 4">

        </div>
      </div>
      <div class="semi_final">
      <div class="block" v-for="item in 2">

      </div>
    </div>
      <div class="semi_final">
        <div class="block" >
          <p>Winner</p>
        </div>
      </div>
      <div class="semi_final">
        <div class="block" v-for="item in 2">

        </div>
      </div>
      <div class="quarter_final">
        <div class="block" v-for="item in 4">

        </div>
      </div>
      <div class="one_eighth_final">
        <div class="block" v-for="item in 8">

        </div>
      </div>
      <div class="song-blocks">
        <div class="song-block reverse" v-for="song in songs.slice(16,32)">
          <div class="song-block-content">
            <img :src="song.img" alt="">
            <p>{{song.title}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TournamentComponent',
  data() {
    return {
      artist_name: '',
      image_number: 1,
      songs: []
    }
  },
  props: {
    msg: String
  },
  methods: {
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getSongs() {
      this.$axios.post('http://localhost:88/api/get-artist-tracks', {artist_name: this.artist_name})
          .then(response => {
            this.items = response.data;
            this.songs = response.data.map((v) => {
              return {
                title: v.title,
                img: 'https://' + v.ogImage.slice(0, -2) + "200x200"
              }
            })
            console.log(response.data)
          })
          .catch(error => {
            console.error('Ошибка при получении данных:', error);
          });
    }
  },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.tournament-wrapper {
  background: #ffffff;
  box-shadow: 0 0 10px #00000050;
  border-radius: 10px;
  width: 1800px;
  height: 760px;
  margin: auto;
  padding: 1em;
  transition: 1s;
  background-size: cover;
}
.song-blocks {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}
.song-block {
  height: 36px;
  display: flex;
  width: 240px;
  margin-bottom: 4px;
  cursor: pointer;
  padding: 1px;
  background: #fff;
  border-radius: 3px;
  position: relative;
  &-content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    transition: 0.3s;
    img {
      height: 36px;
      width: 36px;
      transition: 0.3s;
    }
    p {
      width: 100%;
      font-size: 12px;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &:hover {
    box-shadow: 0 0 10px #00000040;
    .song-block-content {
      img {
        height: 48px;
        width: 48px;
        z-index: 1;
      }
    }
  }
}
.song-block.reverse {
  flex-direction: row-reverse;
}
.one_eighth_final {
  width: 200px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .block {
    height: 36px;
    border: 1px solid red;
    margin-bottom: 10px;
  }
}
.quarter_final {
  width: 200px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .block {
    height: 36px;
    border: 1px solid red;
    margin-bottom: 10px;
  }
}
.semi_final {
  width: 200px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .block {
    height: 36px;
    border: 1px solid red;
    margin-bottom: 10px;
  }
}
.winner {
  width: 200px;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .block {
    height: 36px;
    border: 1px solid red;
    margin-bottom: 10px;
  }
}
</style>
