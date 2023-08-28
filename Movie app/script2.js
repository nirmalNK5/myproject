const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3ed5e55c55d69d04a4014bd1c179b33b&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=3ed5e55c55d69d04a4014bd1c179b33b&query=";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById('section');
  const form = document.getElementById('form');
  const search = document.getElementById('query');

  returnMovies(APILINK);

  function returnMovies(url) {
    fetch(url)
      .then(res => res.json())
      .then(function(data) {
        let row = document.createElement('div');
        row.classList.add('row');

        data.results.forEach((element, index) => {
          if (index % 3 === 0) {
            main.appendChild(row);
            row = document.createElement('div');
            row.classList.add('row');
          }

          const div_column = document.createElement('div');
          div_column.classList.add('column');

          const div_card = document.createElement('div');
          div_card.classList.add('card');

          const image = document.createElement('img');
          image.classList.add('thumbnail');
          image.src = IMG_PATH + element.poster_path;

          const title = document.createElement('h3');
          title.innerHTML = `${element.title}`;

          div_card.appendChild(image);
          div_card.appendChild(title);
          div_column.appendChild(div_card);
          row.appendChild(div_column);
        });

        main.appendChild(row);
      });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = search.value;

    if (searchItem) {
      returnMovies(SEARCHAPI + searchItem);
      search.value = '';
    }
  });
});
