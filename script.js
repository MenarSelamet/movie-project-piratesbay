'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};


// This function is to fetch genres.
const fetchGenre = async () => {
  const dropDownContent = document.querySelector(".dropdown-content")
  const url = constructUrl("genre/movie/list");
  const res = await fetch(url);
  const data = await res.json();
  //console.log(data.genres);
  data.genres.forEach(element => {
    const genreLink = document.createElement("a");
    genreLink.textContent = element.name
    genreLink.classList.add("genre")
    dropDownContent.appendChild(genreLink);
  });
};
fetchGenre();

// This function is to fetch actors.
const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.results);
  return data.results;
};
fetchActors();

// This fetch is to fetch popular movies.
const fetchPopularMovies = async () => {
  const url = constructUrl(`movie/popular`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.results);
  return data.results;
 
};
fetchPopularMovies();

// This function is to fetch Top rated movies.
const fetchTopRated = async () => {
  const url = constructUrl(`movie/top_rated`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.results);
  return data.results;
};
fetchTopRated();


// This function is to fetch upcoming movies.
const fetchUpComing = async () => {
  const url = constructUrl(`movie/upcoming`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.results);
  return data.results;
};
fetchUpComing();


// This function is to fetch movie cast.
const fetchCast = async () => {
  const url = constructUrl(`movie/${movie_id}/credits`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.cast);
  return data.cast;
};
fetchCast();


// This function is to fetch actor.
const fetchActor = async () => {
  const url = constructUrl(`person/${person_id}`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  return data;
};
fetchActor();


// This function is to fetch trailers.
const fetchVideos = async () => {
  const url = constructUrl(`movie/${movie_id}/videos`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.results);
  return data.results;
};
fetchVideos();


// This function is to fetch similar movies.
const fetchSimilarMovies = async () => {
  const url = constructUrl(`movie/${movie_id}/similar`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.results);
  return data.results;
};
fetchSimilarMovies();

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};



// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("class","movieDiv");
    movieDiv.innerHTML = `
        <img class="movieImage" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};



// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
            <img id="movie-backdrop" src=${
              BACKDROP_BASE_URL + movie.backdrop_path
            }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
            <h3>vote_average:</h3>
            <p id="movie-vote_average">${movie.vote_average}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

document.addEventListener("DOMContentLoaded", autorun);

const dropDownButton = document.querySelector(".dropbtn")
const dropDownContent = document.querySelector(".dropdown-content")
dropDownButton.addEventListener("click", () => {
  dropDownContent.classList.toggle("show")
})

window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    if (dropDownContent.classList.contains('show')) {
      dropDownContent.classList.remove('show');
    }
  }
}

//Shortcut for moving the cursor to the search box
const searchInput = document.getElementById("search-input");

let isKeyPressed = { 
  'a': false, // ASCII code for 'a'
  'q': false, // ASCII code for 'k'
   // ... Other key codes you want to track
};

document.onkeydown = (e) => {
  isKeyPressed[e.key] = true; 
  if (e.ctrlKey && isKeyPressed["q"]) {
    searchInput.focus();
  }
};

document.onkeyup = (e) => {
  isKeyPressed[e.key] = false;
};


const button = document.querySelector('.trailer');
button.addEventListener('click', (e) => {
  window.open('https://www.youtube.com/watch?v=umIeYcQLABg', '_blank');
});


const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".superContainer");
console.log(movieLists);

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll(".movieImage").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});