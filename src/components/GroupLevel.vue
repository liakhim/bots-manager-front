<template>
  <div class="group-level-wrapper" :class="{expanded: expanded}">
    <div class="row" :class="{expanded: expanded}">
      <div class="expanded-group-card" v-if="expanded">
        <div style="border: 1px solid green">
          <ul>
            <li v-for="song in active_group.group_songs">{{song.title}}</li>
          </ul>
        </div>
      </div>
      <div class="column" :class="{expanded: expanded}">
        <div class="group-table"
             @click="setActiveGroup(group.id)"
             v-for="(group, ind) in songs_for_groups.slice(0, 4)"
             :style="{'z-index': ind, 'left': (expanded && ind < 4) ? ind*20 + 'px' : ind*420 + 'px', 'top': expanded ? ind*40 + 'px' : 0}"
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
             @click="setActiveGroup(group.id)"
             style="margin-top: 300px"
             v-for="(group, ind) in songs_for_groups.slice(4,8)"
             :style="{'z-index': ind + 4, 'left': (expanded && ind < 4) ? ind*20 + 80 + 'px' : ind*420 + 'px', 'top': expanded ? ind*40 - 140 + 'px' : 0}">
          <div class="title-line">
            <p>Group {{group.group_letter}}</p>
            <p>Open</p>
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
      setActiveGroup
    };
  },
}
</script>

<style lang="scss" scoped>
  h3 {
    color: green;
  }
  .group-level-wrapper {
    position: relative;
    background: transparent;
    box-shadow: 0 0 10px #00000050;
    border-radius: 10px;
    width: 1800px;
    height: 760px;
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
        width: 1100px;
        min-width: 1100px;
        border-radius: 20px;
        height: 650px;
        background: #fff;
      }
      .column {
        transition: 0.1s;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        height: 700px;
        width: 100%;
        position: relative;
      }
      .column.expanded {
        width: 1780px;
        border: 1px solid red;
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
</style>
