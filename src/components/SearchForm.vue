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
    <div class="artist-list-wrapper">
      <ul class="artist-list">
        <li class="artist-list-item" v-for="artist in artist_info">
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

    const songs = computed(() => songsStore.songs);
    const artist_info = computed(() => songsStore.artist_info);
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

    return {
      artistName,
      getSongs,
      getArtist,
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
  padding: 30px 0;
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
          border: 1px solid red;
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
