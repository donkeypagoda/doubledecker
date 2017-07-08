// copied over from AJAX hero:
$("form").on('submit', function(event){
    event.preventDefault();
    if ($('#search').val() === ""){
      Materialize.toast("Please enter a search term.", 4000);
    }
    sendRequest($('#search').val());
  });
  function sendRequest(searchVal){
    const url = `https://www.omdbapi.com/?apikey=19099f8d&s=${searchVal}`;
    const xhr = $.getJSON(url);
    xhr.done(function(data){
      if (xhr.status !== 200){
        return;
      }
      let movieData = data.Search;
      let lowCase = movieData.map(function(p) {
        return {title: p.Title, poster: p.Poster, year: p.Year, id: p.imdbID};
      });
      movies = lowCase;
      for (let i = 0; i < movies.length; i++){
        let movie = movies[i];
        let iD = movie.id;
        let urlId = "http://www.omdbapi.com/?apikey=19099f8d&i=" + iD + "&plot=full";
        const xhrId = $.getJSON(urlId);
        xhrId.done(function(data){
          if (xhrId.status !== 200){
            return;
          }
          movies[i].plot = data.Plot;
          renderMovies();
        })
      }
    });
  }
})();
