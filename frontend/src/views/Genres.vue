<template>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="background-color:black;">
    <div class="scrollmenu">
      <router-link class="nav-link" to="/genres/Action">Action</router-link>
      <router-link class="nav-link" to="/genres/Adventure"
        >Adventure</router-link
      >
      <router-link class="nav-link" to="/genres/Animation"
        >Animation</router-link
      >
      <router-link class="nav-link" to="/genres/Comedy">Comedy</router-link>
      <router-link class="nav-link" to="/genres/Crime">Crime</router-link>
      <router-link class="nav-link" to="/genres/Documentary"
        >Documentary</router-link
      >
      <router-link class="nav-link" to="/genres/Drama">Drama</router-link>
      <router-link class="nav-link" to="/genres/Family">Family</router-link>
      <router-link class="nav-link" to="/genres/Fantasy">Fantasy</router-link>
      <router-link class="nav-link" to="/genres/History">History</router-link>
      <router-link class="nav-link" to="/genres/Horror">Horror</router-link>
      <router-link class="nav-link" to="/genres/Music">Music</router-link>
      <router-link class="nav-link" to="/genres/Mystery">Mystery</router-link>
      <router-link class="nav-link" to="/genres/Romance">Romance</router-link>
      <router-link class="nav-link" to="/genres/Science_fiction"
        >Science fiction</router-link
      >
      <router-link class="nav-link" to="/genres/TV_Movie">TV Movie</router-link>
      <router-link class="nav-link" to="/genres/Thriller">Thriller</router-link>
      <router-link class="nav-link" to="/genres/War">War</router-link>
      <router-link class="nav-link" to="/genres/Western">Western</router-link>
    </div>

    <h2></h2>
    <ul>
      <li v-for="movie in movies" :key="movie.original_title">
        <Movie :movie="movie" />
      </li>
    </ul>
  </body>
</template>

<script>
import Movie from "@/components/Movie.vue";
import axios from "axios";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export default {
  name: "Movies",
  components: {
    Movie,
  },
  data: function () {
    return {
      movies: [],
      movieName: "",
      movieLoadingError: "",
    };
  },
  methods: {
    fetchMovies: function () {
      const genreName = this.$route.params.genreName;
      let genreID = 21;
      for (const genre of genres) {
        if (genre.name == genreName) {
          genreID = genre.id;
        }
      }

      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=522d421671cf75c2cba341597d86403a&with_genres=" +
            genreID
        )
        .then((response) => {
          this.movies = response.data.results;
          console.log(response);
        })
        .catch((error) => {
          this.moviesLoadingError = "An error has occured";
          console.log(error);
        });
    },
  },
  mounted: function () {
    console.log(this.$route.params.genreName);
    this.fetchMovies();
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchMovies();
    next();
  },
};
</script>

<style>
div.scrollmenu {
  background-color: #333;
  overflow: auto;
  white-space: nowrap;
}

div.scrollmenu a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

div.scrollmenu a:hover {
  background-color: #777;
}

.nav-link {
  position: center;
  font-weight: bold;
  color: #2c3e50;
}

.nav-link.router-link-exact-active {
  color: #f1bf19;
}
ul {
  list-style-type: none;
  padding: 0;
  position: center;
}

li {
  display: inline-block;
  margin: 0 10px;
  position: center;
}
</style>
