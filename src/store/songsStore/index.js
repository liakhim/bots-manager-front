// stores/songsStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useSongsStore = defineStore('songsStore', {
    state: () => ({
        artist_name: '',
        artist_info: null,
        selected_artist: null,
        songs: [],
        active_group: null,
        songs_for_groups: [
            {
                id: 0,
                group_letter: 'A',
                group_songs: [],
                group_matches: [],
                group_progress: 0
            },
            {
                id: 1,
                group_letter: 'B',
                group_songs: [],
                group_matches: [],
                group_progress: 3
            },
            {
                id: 2,
                group_letter: 'C',
                group_songs: [],
                group_matches: [],
                group_progress: 0
            },
            {
                id: 3,
                group_letter: 'D',
                group_songs: [],
                group_matches: [],
                group_progress: 0
            },
            {
                id: 4,
                group_letter: 'E',
                group_songs: [],
                group_matches: [],
                group_progress: 0
            },
            {
                id: 5,
                group_letter: 'F',
                group_songs: [],
                group_matches: [],
                group_progress: 0
            },
            {
                id: 6,
                group_letter: 'G',
                group_songs: [],
                group_matches: [],
                group_progress: 0
            },
            {
                id: 7,
                group_letter: 'H',
                group_songs: [],
                group_matches: [],
                group_progress: 0
            }
        ],
        songs_for_play_off: [
            { id: 0, songs: [] },
            { id: 1, songs: [] },
            { id: 2, songs: [] },
            { id: 3, songs: [] },
            { id: 4, songs: [] },
            { id: 5, songs: [] },
            { id: 6, songs: [] },
            { id: 7, songs: [] },
            { id: 8, songs: [] }
        ],
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
        async fetchSongs() {
            this.loading = true; // Устанавливаем флаг загрузки
            this.error = null;   // Сбрасываем ошибки
            try {
                const response = await axios.post('http://localhost:88/api/get-artist-tracks', {artist_id: this.selected_artist.id});
                this.songs = response.data; // Полностью заменяем массив песен
                response.data.forEach((song, index) => {
                    const groupIndex = Math.floor(index / 4);

                    if (groupIndex < this.songs_for_groups.length) {
                        song["score"] = 0;
                        this.songs_for_groups[groupIndex].matches = [
                            {
                                id: 0,
                                songs: []
                            },
                            {
                                id: 1,
                                songs: []
                            },
                            {
                                id: 2,
                                songs: []
                            },
                            {
                                id: 3,
                                songs: []
                            },
                            {
                                id: 4,
                                songs: []
                            },
                            {
                                id: 5,
                                songs: []
                            }
                        ];
                        const songMappings3 = [
                            [0, 1],
                            [0, 2],
                            [0, 3],
                            [1, 2],
                            [1, 3],
                            [2, 3]
                        ];

                        this.songs_for_groups[groupIndex].group_songs.push(song);
                        this.songs_for_groups[groupIndex].matches.forEach((match, index) => {
                            const [songIndex1, songIndex2] = songMappings3[index];
                            match.is_over = false;
                            match.winner = null
                            match.songs.push(this.songs_for_groups[groupIndex].group_songs[songIndex1]);
                            match.songs.push(this.songs_for_groups[groupIndex].group_songs[songIndex2]);
                        });
                    }

                    const coupleIndex = Math.floor(index / 2);

                    if (coupleIndex < this.songs_for_play_off.length) {
                        this.songs_for_play_off[coupleIndex].songs.push(song)
                    }
                    //this.songs_for_play_off[]
                })
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
            this.selected_artist = this.artist_info.find(v => v.id === id);
        },
        addPoints(group_id, song_id, points, match_id) {
            this.songs_for_groups.find(v => v.id === group_id).group_songs.find(v => v.id === song_id).score += points
            this.songs_for_groups.find(v => v.id === group_id).matches.find(v => v.id === match_id).is_over = true
            this.songs_for_groups.find(v => v.id === group_id).matches.find(v => v.id === match_id).winner = song_id
        },
        setActiveGroup(group_id) {
            // console.log(this.songs_for_groups.map(v => v.matches))
            this.active_group = group_id
        },

    },
});