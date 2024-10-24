<template>
  <div class="search-form-wrapper">
    <form @keydown.enter.prevent="getArtist">
      <label>
        <span></span>
        <input name="author_name" type="text" placeholder="Исполнитель" v-model="artistName">
      </label>
      <div class="button-box">
        <button type="button" @click="getArtist">
          <span>Найти</span>
        </button>
      </div>
    </form>
    <div v-if="!!selected_artist" class="selected-author-wrapper">
      <div class="selected-author-block">
        <div class="selected-author-block-image">
          <img :src="'https://' + selected_artist.ogImage.slice(0, -2) + '60x60'" alt="">
        </div>
        <div class="selected-author-block-name">
          <p>{{selected_artist.name}}</p>
        </div>
      </div>
    </div>
    <div v-if="!!selected_artist" class="game-type-wrapper">
      <div @click="$router.push('/group')" class="game-type">
        <div class="game-type-image">
          <img src="../assets/1.jpg" alt="">
        </div>
        <div class="game-type-text">
          <p>Group Level + Play-off (32 songs)</p>
        </div>
      </div>
      <div @click="$router.push('/tournament')" class="game-type">
        <div class="game-type-image">
          <img src="../assets/2.jpg" alt="">
        </div>
        <div class="game-type-text">
          <p>Only Play-off (16 songs)</p>
        </div>
      </div>
    </div>
    <div v-if="artist_info.length" class="artist-list-wrapper">
      <ul class="artist-list">
        <li class="artist-list-item" v-for="artist in artist_info" @click="setSelectedArtist(artist.id)">
          <div class="icon">
            <img :src="'https://' + artist.ogImage.slice(0, -2) + '30x30'" alt="">
          </div>
          <div class="text">
            <p>{{artist.name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue';
import { useSongsStore } from '@/store/songsStore';

export default {
  name: 'SearchForm',
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
    const artist_info = computed(() => songsStore.artist_info);
    const selected_artist = computed(() => songsStore.selected_artist);
    const loading = computed(() => songsStore.loading);
    const error = computed(() => songsStore.error);

    // Метод для вызова экшена fetchSongs
    const getSongs = () => {
      songsStore.fetchSongs(artistName.value);
    };

    // Метод для вызова экшена fetchSongs
    const getArtist = () => {
      songsStore.fetchAuthor(artistName.value);
    };

    const setSelectedArtist = (id) => {
      songsStore.setSelectedArtist(id);
    };


    return {
      artistName,
      selected_artist,
      getSongs,
      getArtist,
      setSelectedArtist,
      songs,
      artist_info,
      loading,
      error,
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.search-form-wrapper {
  background: #fff;
  width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 10px;
  form {
    display: flex;
    justify-content: center;
    label {
      input {
        height: 44px;
        padding: 0 10px;
        border-radius: 10px 0 0 10px;
        border: 2px solid #000;
        border-right: none;
        min-width: 500px;
      }
    }
    .button-box {
      button {
        height: 48px;
        border-radius: 0 10px 10px 0;
        border: none;
        background: #000;
        padding: 0 30px;
        span {
          color: #fff;
          font-size: 18px;
        }
      }
    }
  }
  .selected-author-wrapper {
    width: 100%;
    margin-top: 20px;
    display: flex;
    .selected-author-block {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 2px solid #000;
      margin: auto;
      border-radius: 50px;
      &-image {
        width: 60px;
        min-width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }
      &-name {
        width: auto;
        p {
          font-weight: bold;
          text-align: left;
          padding: 0 30px 0 20px;
        }
      }
    }
  }
  .game-type-wrapper {
    display: flex;
    align-items: flex-start;
    padding: 20px 0 0 0;
    cursor: pointer;
    .game-type {
      overflow: hidden;
      border: 2px solid #000;
      border-radius: 10px;
      margin: 0 10px;
      width: 280px;
      background: #fff;
      &:hover {
        box-shadow: 0 0 10px #00000050  ;
      }
      &-image {
        img {
          width: 100%;
        }
      }
      &-text {
        p {
          font-weight: bold;
        }
      }
    }
  }
  .artist-list-wrapper {
    width: 100%;
    .artist-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 30px;
      .artist-list-item {
        list-style-type: none;
        display: flex;
        align-items: center;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #6e6e6e;
        padding: 5px 10px;
        border-radius: 10px;
        cursor: pointer;
        .icon {
          border-radius: 50%;
          width: 30px;
          height: 30px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .text {
          margin-left: 10px;
          p {
            font-size: 14px;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
