// stores/songsStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useSongsStore = defineStore('songsStore', {
    state: () => ({
        artist_name: '',
        artist_info: [],
        selected_artist: null,
        songs: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchAuthor(author) {
            this.loading = true; // Устанавливаем флаг загрузки
            this.error = null;   // Сбрасываем ошибки
            try {
                const response = await axios.post('http://localhost:88/api/get-artists-info', {artist_name: author});
                this.artist_info = response.data; // Полностью заменяем массив песен
            } catch (error) {
                this.error = 'Ошибка при получении данных: ' + error.message;
            } finally {
                this.loading = false; // Отключаем флаг загрузки
            }
        },
        async fetchSongs(author) {
            this.loading = true; // Устанавливаем флаг загрузки
            this.error = null;   // Сбрасываем ошибки
            try {
                const response = await axios.post('http://localhost:88/api/get-artist-tracks', {artist_name: author});
                this.songs = response.data; // Полностью заменяем массив песен
            } catch (error) {
                this.error = 'Ошибка при получении данных: ' + error.message;
            } finally {
                this.loading = false; // Отключаем флаг загрузки
            }
        },
        setArtistName(name) { // Экшен для изменения artist_name
            this.artist_name = name;
        },
        setSelectedArtist(id) { // Экшен для изменения artist_name
            alert(id)
            this.selected_artist = this.artist_info.find(v => v.id === id);
        },
    },
});