<template>
  <div class="group-level-wrapper">
    <div class="row" v-for="it in 2">
      <div class="group-table" v-for="item in 4">
        <div class="title-line">
          <p>Group A</p>
        </div>
        <div class="progress-line">
          <div class="progress-line-step full-step"></div>
          <div class="progress-line-step full-step"></div>
          <div class="progress-line-step"></div>
          <div class="progress-line-step"></div>
          <div class="progress-line-step"></div>
          <div class="progress-line-step"></div>
        </div>
        <div class="header-line">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="lines">
          <div class="line" v-for="(line, index) in group_objects" :key="line.id">
            <div class="line-cover">
              <img :src="line.img" alt="">
            </div>
            <div class="line-title">
              <p>{{line.title}}</p>
            </div>
            <div class="line-total">
              <div class="line-total-medal">
                <img src="../assets/gold.svg" v-if="index === 0" alt="">
                <img src="../assets/silver.svg" v-if="index === 1" alt="">
              </div>
              <p>9</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupLevelComponent',
  props: {},
  data() {
    return {
      songs: [],
      group_objects: [
        {
          id: 0,
          letter: 'A',
          image: '',
          title: 'title of',
          rating: 1
        }
      ]
    }
  },
  methods: {
    getSongs() {
      this.$axios.post('http://localhost:88/api/get-artist-tracks', {artist_name: 'kino'})
          .then(response => {
            this.items = response.data;
            this.group_objects = response.data.map((v) => {
              return {
                title: v.title,
                img: 'https://' + v.ogImage.slice(0, -2) + "200x200"
              }
            }).slice(0, 4)
            console.log(response.data)
          })
          .catch(error => {
            console.error('Ошибка при получении данных:', error);
          });
    }
  },
  mounted() {
    this.getSongs()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h3 {
    color: green;
  }
  .group-level-wrapper {
    background: #ffffff;
    box-shadow: 0 0 10px #00000050;
    border-radius: 10px;
    width: 1800px;
    height: 760px;
    margin: auto;
    padding: 1em;
    transition: 1s;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin: 10px;
    }
  }
  .group-table {
    width: 400px;
    box-shadow: 0 0 10px #00000050;
    border-radius: 10px;
    cursor: pointer;
    transition: 1s;
    &:hover {
      transform: scale(1.03);
    }
    .title-line {
      border: 1px solid green;
      width: 100%;
      display: flex;
    }
    .progress-line {
      height: 10px;
      border: 1px solid green;
      width: 100%;
      display: flex;
      margin: 10px 0 ;
      &-step {
        width: 16.66%;
        border: 1px solid red;
        &.full-step {
          background: red;
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
          p {
            margin: 0 0 0 10px;
            text-align: left;
            font-size: 12px;
            font-weight: bold;
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
