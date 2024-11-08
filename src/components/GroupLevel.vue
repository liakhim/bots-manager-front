<template>
  <div class="group-level-wrapper" :class="{expanded: expanded}">
    <div style="overflow: auto; width: 400px;height: 500px;position: fixed; background: #fff; right: 0; bottom: 0;z-index: 1000">
      <pre>
<!--        {{songs_for_groups.map(v => v.group_songs.map(t => t.title))}}-->
        {{songs_for_groups.map(v => v.matches)[0][0]}}
      </pre>
    </div>
    <div class="row" :class="{expanded: expanded}">
      <div class="expanded-group-card" v-if="expanded">
        <div class="match-list">
          <div class="match-list-title">
            <p>Матчи</p>
          </div>
          <ul v-if="active_group !== null">
            <li v-for="match in songs_for_groups.find(v => v.id === active_group).matches" :style="{border: match.is_over ? '1px solid #fff' : 'none'}">
              <div class="match-song" :class="{'disabled': match.winner !== null && match.winner !== match.songs[0].id}" @click="addPoints(songs_for_groups.find(v => v.id === active_group).id, match.songs[0].id, 3, match.id)">
                <div class="icon">
                  <img :src="'https://' + match.songs[0].ogImage.slice(0, -2) + '30x30'" alt="">
                </div>
                <div class="title">
                  <p>{{match.songs[0].title}} - {{match.songs[0].is_winner}}</p>
                  <a href="#">
                    <img src="../assets/ymlogo.svg" alt="">
                  </a>
                </div>
              </div>
              <div class="match-delimiter">
                <span v-if="!match.winner">VS</span>
                <img v-if="!!match.winner" src="../assets/check-icon.svg" alt="">
              </div>
              <div class="match-song" :class="{'disabled': match.winner !== null &&  match.winner !== match.songs[1].id}" @click="addPoints(active_group, match.songs[1].id, 3, match.id)">
                <div class="icon">
                  <img :src="'https://' + match.songs[1].ogImage.slice(0, -2) + '30x30'" alt="">
                </div>
                <div class="title">
                  <p>{{match.songs[1].title}} - {{match.songs[0].is_winner}}</p>
                  <a href="#">
                    <img src="../assets/ymlogo.svg" alt="">
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="column" :class="{expanded: expanded}">
        <div class="main-group">
          wefwewe
        </div>
        <div class="groups">
          <div class="group-table"
               :class="{'selected': group.id === active_group}"
               @click="setActiveGroup(group.id)"
               v-for="(group, ind) in songs_for_groups.slice(0, 4)"
               :style="{'z-index': ind, 'left': (expanded && ind < 4) ? (group.id === active_group ? 0 : ind*20) + 'px' : ind*420 + 'px', 'top': expanded ? (group.id === active_group ? -275 : ind*30) + 'px' : 0}"
          >
            <div class="title-line">
              <p>Group {{group.group_letter}}</p>
              <!--            <p>Open</p>-->
            </div>
            <div class="progress-line">
              <div class="progress-line-step" v-for="(step, index) in 6" :class="{'full-step': index<group.group_progress}"></div>
            </div>
            <div class="header-line">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="lines">
              <div class="line" v-for="(line, index) in group.group_songs" :key="line.id">
                <div class="line-cover">
                  <img :src="'https://' + line.ogImage.slice(0, -2) + '30x30'" alt="">
                </div>
                <div class="line-title">
                  <p>{{line.title}}</p>
                  <div class="line-title-link">
                    <a href="#">
                      <img src="../assets/ymlogo.svg" alt="">
                    </a>
                  </div>
                </div>
                <div class="line-total">
                  <div class="line-total-medal">
                    <img src="../assets/gold.svg" v-if="index === 0" alt="">
                    <img src="../assets/silver.svg" v-if="index === 1" alt="">
                  </div>
                  <p>{{line.score}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="group-table"
               :class="{'selected': group.id === active_group}"
               @click="setActiveGroup(group.id)"
               style="margin-top: 260px"
               v-for="(group, ind) in songs_for_groups.slice(4,8)"
               :style="{'z-index': ind + 4, 'left': (expanded && ind < 4) ? (group.id === active_group ? 0 + 'px' : ind*20 + 80 + 'px') : ind*420 + 'px', 'top': expanded ? (group.id === active_group ? -535 : ind*30 - 140) + 'px' : 0}">
            <div class="title-line">
              <p>Group {{group.group_letter}}</p>
              <!--            <p>Open</p>-->
            </div>
            <div class="progress-line">
              <div class="progress-line-step" v-for="(step, index) in 6" :class="{'full-step': index<group.group_progress}"></div>
            </div>
            <div class="header-line">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="lines">
              <div class="line" v-for="(line, index) in group.group_songs" :key="line.id">
                <div class="line-cover">
                  <img :src="'https://' + line.ogImage.slice(0, -2) + '30x30'" alt="">
                </div>
                <div class="line-title">
                  <p>{{line.title}}</p>
                  <div class="line-title-link">
                    <a href="#">
                      <img src="../assets/ymlogo.svg" alt="">
                    </a>
                  </div>
                </div>
                <div class="line-total">
                  <div class="line-total-medal">
                    <img src="../assets/gold.svg" v-if="index === 0" alt="">
                    <img src="../assets/silver.svg" v-if="index === 1" alt="">
                  </div>
                  <p>{{line.score}}</p>
                </div>
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
  name: 'GroupLevelComponent',
  setup() {
    let expanded = ref(true);

    const changeView = () => {
      expanded.value = !expanded.value; // доступ к значению через .value
    };

    const songsStore = useSongsStore();

    const selectedArtist = ref(songsStore.selected_artist);

    const activeGroup = ref(songsStore.active_group);

    watch(activeGroup, (group_id) => {
      songsStore.setActiveGroup(group_id);
    });

    const setActiveGroup = (group_id) => {
      songsStore.setActiveGroup(group_id);
    };

    const addPoints = (group_id, song_id, points, match_id) => {
      songsStore.addPoints(group_id, song_id, points, match_id);
    };

    const songs = computed(() => songsStore.songs);
    const songs_for_groups = computed(() => songsStore.songs_for_groups);
    const selected_artist = computed(() => songsStore.selected_artist);
    const active_group = computed(() => songsStore.active_group);

    return {
      selected_artist,
      songs,
      songs_for_groups,
      expanded,
      changeView,
      active_group,
      setActiveGroup,
      addPoints
    };
  },
}
</script>

<style lang="scss" scoped>
  h3 {
    color: green;
  }
  ul {
    li {
      list-style-type: none;
    }
  }
  .group-level-wrapper {
    position: relative;
    background: transparent;
    box-shadow: 0 0 10px #00000050;
    border-radius: 10px;
    width: 1800px;
    height: 820px;
    margin: auto;
    padding: 1em;
    transition: 0.1s;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    backdrop-filter: blur(20px);
    .row {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      // flex-wrap: wrap;
      margin: 10px;
      .expanded-group-card {
        position: absolute;
        top: 70px;
        right: 100px;
        width: 900px;
        min-width: 900px;
        border-radius: 20px;
        // height: 650px;
        z-index: 5;
        background: #00000060;
        .match-list{
          border-radius: 10px;
          overflow: hidden;
          width: 100%;
          &-title {
            background: #000;
            height: 125px;
            display: flex;
            align-items: center;
            justify-content: center;
            p {
              color: #fff;
              font-size: 20px;
              text-transform: uppercase;
            }
          }
          ul {
            padding: 0;
            li {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 10px;
              margin-bottom: 10px;
              .match-song {
                width: 400px;
                height: 60px;
                display: flex;
                align-items: center;
                background: #000;
                border-radius: 10px;
                padding: 0 10px;
                cursor: pointer;
                .icon {
                  width: 44px;
                  height: 44px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  border-radius: 10px;
                  img {
                    width: 100%;
                  }
                }
                .title {
                  padding: 0 10px;
                  display: flex;
                  align-items: center;
                  width: 100%;
                  p {
                    color: #fff;
                    font-size: 13px;
                  }
                  a {
                    width: 80px;
                    margin-left: auto;
                    cursor: pointer;
                    filter: grayscale(1);
                    color: #fff;
                    &:hover {
                      filter: none;
                    }
                    img {
                      width: 100%;
                    }
                  }
                }
              }
              .match-song.disabled {
                opacity: 0.3;
                cursor: not-allowed;
              }
              .match-delimiter {
                // border: 1px solid blue;
                background: #000;
                height: 30px;
                width: 30px;
                margin: 0 20px;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                span {
                  line-height: 1;
                  color: yellow;
                  font-size: 12px;
                  font-weight: bold;
                }
                img {
                  width: 32px;
                }
              }
            }
          }
        }
      }
      .main-group {
        height: 280px;
        // border: 1px solid #fff;
      }
      .groups {
        position: relative;
        height: 542px;
        .column {
          transition: 0.1s;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          height: 700px;
          width: 100%;
          position: relative;
        }
      }
      .column.expanded {
        width: 542px;
        margin-right: auto;
        flex-direction: column;
      }
    }
    .row.expanded {
      flex-direction: row-reverse;
    }
  }
  .group-level-wrapper.expanded {
    .group-table {
      position: absolute;
      &:hover {
        transform: rotate(-5deg) translateY(-50px);
      }
    }
    .expanded-group-card {
      display: flex;
    }
  }

  .group-table {
    width: 400px;
    max-height: 266px;
    box-shadow: 0 0 10px #000000;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.1s;
    margin-bottom: 30px;
    background: #ffffff;
    position: absolute;
    border: 1px solid #c9c9c9;
    // position: relative;

    .title-line {
      padding: 0 20px;
      width: calc(100% - 40px);
      display: flex;
      justify-content: space-between;
    }
    .progress-line {
      height: 4px;
      border-radius: 3px;
      width: calc(100% - 20px);
      display: flex;
      margin: 0 10px 5px 10px;
      border: 1px solid green;
      &-step {
        width: 16.66%;
        &.full-step {
          background: green;
          border-radius: 0 3px 3px 0;
        }
      }
    }
    .lines {
      .line {
        display: flex;
        justify-content: space-between;
        border: 1px solid #C9C9C9FF;
        height: 50px;
        overflow: hidden;
        &:hover {
          .line-title {
            &-link {
              z-index: 2;
              img {
                width: 100px;
                filter: none;
              }
            }
          }
        }
        &:first-child {
          border-radius: 8px 8px 0 0;
          border-bottom: none;
          background: rgba(169, 255, 222, 0.31);
        }
        &:nth-child(2) {
          border-bottom: none;
          background: rgba(169, 255, 222, 0.31);
        }
        &:nth-child(3) {

        }
        &:last-child {
          border-radius: 0 0 8px 8px;
          border-top: none;
        }
        &-cover {
          width: 50px;
          height: 50px;
          img {
            width: 100%;
            min-width: 50px ;
          }
        }
        &-title {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p {
            margin: 0 0 0 10px;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
          }
          &-link {
            width: 100px;
            padding: 0 10px 0 0;
            img {
              width: 100%;
              transition: 0.5s;
              filter: grayscale(1);
            }
          }
        }
        &-total {
          display: flex;
          align-items: center;
          padding: 0 10px;
          border-left: 1px solid #C9C9C9FF;
          p {
            margin: 0 0 0 3px;
            width: 20px;
            font-weight: bold;
          }
          &-medal {
            width: 20px;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .group-table.selected {
    // border: 2px solid red;
  }
</style>
