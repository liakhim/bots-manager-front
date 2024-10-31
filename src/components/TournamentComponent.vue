<template>
<!--  :style="{'background-image': 'url(src/assets/' + image_number + '.jpg)'}"-->
  <div class="tournament-wrapper">
    <div class="wrapper">
      <div class="song-blocks">
        <div class="song-couple" v-for="couple in songs_for_play_off.slice(0,4)">
          <div class="song-couple-lines"></div>
          <div class="songs">
            <div class="song-block" v-for="song in couple.songs">
              <div class="song-block-content">
                <img :src="'https://' + song.ogImage.slice(0, -2) + '30x30'" alt="">
                <p>{{song.title}}</p>
              </div>
            </div>
          </div>
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
      <div class="song-blocks">
        <div class="song-couple" v-for="couple in songs_for_play_off.slice(4,8)">
          <div class="song-couple-lines"></div>
          <div class="songs">
            <div class="song-block" v-for="song in couple.songs">
              <div class="song-block-content">
                <img :src="'https://' + song.ogImage.slice(0, -2) + '30x30'" alt="">
                <p>{{song.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useSongsStore} from "@/store/songsStore";
import {computed, ref, watch} from "vue";

export default {
  name: 'TournamentComponent',
  setup() {
    const songsStore = useSongsStore();

    // Локальное состояние для двустороннего связывания с инпутом
    const artistName = ref(songsStore.artist_name);

    // Наблюдение за изменениями локального состояния
    watch(artistName, (newName) => {
      songsStore.setArtistName(newName);
    });

    const selectedArtist = ref(songsStore.selected_artist);

    watch(selectedArtist, (newName) => {
      songsStore.setArtistName(newName);
    });

    const songs = computed(() => songsStore.songs);
    const songs_for_groups = computed(() => songsStore.songs_for_groups);
    const songs_for_play_off = computed(() => songsStore.songs_for_play_off);
    const selected_artist = computed(() => songsStore.selected_artist);

    return {
      selected_artist,
      songs,
      songs_for_groups,
      songs_for_play_off
    };
  },
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
  position: relative;
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
  justify-content: center;
  .song-couple {
    border: 2px solid blue;
    margin-bottom: 20px;
    display: flex;
    &-lines {
      width: 30px;
      border: 1px solid green
    }
    .songs {
      display: flex;
      flex-direction: column;
    }
  }
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
