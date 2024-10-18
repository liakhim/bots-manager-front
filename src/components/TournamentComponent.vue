<template>
  <div class="tournament-wrapper">
    <form>
      <input v-model="artist_name" type="text">
      <button type="button" @click="getSongs()">Send</button>
    </form>
    <pre>
      {{songs.map(v => v.title)}}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'TournamentComponent',
  data() {
    return {
      artist_name: '',
      songs: []
    }
  },
  props: {
    msg: String
  },
  methods: {
    getSongs() {
      this.$axios.post('http://localhost:88/api/get-artist-tracks', {artist_name: this.artist_name})
          .then(response => {
            this.items = response.data;
            this.songs = response.data
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
  width: 1400px;
  height: 760px;
  margin: auto;
  padding: 1em;
}
</style>
