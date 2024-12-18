const API_KEY = "8e7d23723e7ad447422c57182424fb80";

let page = 1;

const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
const API_IMG_URL = "https://image.tmdb.org/t/p/w1280";
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

async function getMovies(url) {
  const respons = await fetch(url);
  const data = await respons.json();
  showMovies(data.results);
}

function updatePage() {
  getMovies(API_URL());
  currentPage.innerHTML = page;
}

function nextPage() {
  // jika page lebih dari sama dengan 1 maka page akan bertambah
  if (page >= 1) {
    page += 1;
    updatePage();
  }
}

function prevPage() {
  // page harus lebih dari 1 agar bisa mengklik prev
  if (page > 1) {
    page -= 1;
    updatePage();
  }
}

// untuk tombol nex dan prev
next.addEventListener("click", () => {
  nextPage();
});

prev.addEventListener("click", () => {
  prevPage();
});

// function untuk menampilkan list film
function showMovies(movies) {
  moviesElement.innerHTML = "";
  movies.forEach((movies) => {
    const { title, poster_path, overview } = movies;
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    movieCard.innerHTML = `
    <img src=" ${API_IMG_URL + poster_path}" alt="${title}"/>
    <div class="movie-info">
        <h3>${title}</h3>
        <p>${overview.substring(0, 150)}...</p>
    </div>
    `;
    moviesElement.appendChild(movieCard);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  searchInput.value = "";

  if (searchTerm !== "") {
    getMovies(API_SEARCH_URL + searchTerm);
  }
});

// dark mode
toggle.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark");
  toggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  navbar.style.backgroundColor = isDarkMode ? " rgb(222, 144, 0)" : "cadetblue";
});

updatePage();
title.addEventListener("click", () => {
  location.reload();
});
