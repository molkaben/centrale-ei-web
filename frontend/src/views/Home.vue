<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/i.jpg" />
    <h1>Voici une page de suggéstion de film</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank">vue-cli documentation</a>.
    </p>
    <input type="text" id="name" v-model="movieName" placeholder="edit me" />
    <p>Hola {{ answer }}</p>
    <div class="page">
      <div
        v-for="movie in movies"
        :key="movie.id"
        width="300"
        height="400"
        class="cadre"
      >
        <p class="image">
          <img
            class="bas"
            :src="
              'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' +
              movie.poster_path
            "
            width="300"
            height="400"
          />
        </p>

        <p
          style="white-space: normal; width: 300px; height: 20px"
          class="para"
          align="left"
        >
          Title: {{ movie.original_title }}
        </p>
        <p align="left">Date: {{ movie.release_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data: function () {
    return {
      movieName: "",
      usersLoadingError: "",
      answer: "",
      movies: [],
    };
  },
  created: function () {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb`
      )
      .then((response) => {
        this.movies = response.data.results;
        // Do something if call succe
      });
  },
  watch: {
    // whenever question changes, this function will run
    movieName(newMovie, oldMovie) {
      this.getAnswer(newMovie);
    },
  },
  methods: {
    getAnswer(newMovie) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${newMovie}`
        )
        .then((response) => {
          console.log(response);
          this.movies = response.data.results;
          // Do something if call succe
        })
        .catch((error) => {
          this.answer = "Error! Could not reach the API. " + error;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
  background: #42b983;
}
.page {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-left: auto;
}

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

.cadre {
  margin: 1em;
}
.image span {
  visibility: hidden;
}

.image img:hover + span {
  visibility: visible;
}
a {
  color: #42b983;
}
</style>
