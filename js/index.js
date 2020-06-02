$(document).ready(()=> {

      

    $('#searchform').on('input', (e)=>{

        let searchText=  $('#searchText').val();
        getMovies(searchText.trim());
        e.preventDefault();
    });
    $('#searchform').on('submit', (e)=>{

        let searchText=  $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
   
});

function getMovies(searchText){

    axios.get('https://www.omdbapi.com/?s='+searchText+'&apikey=8a619475')
     .then((response)=>{

        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie)=>{


            output += `
            
            <div class="col-md-3">
            
            <div class="well text-center">
            <img src="${movie.Poster}">    
            <h5>${movie.Title}</h5>
            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href=
            
            "#">Movie Details</a>
            </div>

            </div>
            
            `;

        });

        $('#movies').html(output);

        })
     .catch((error)=>{

            console.log(error);

        });
}


function movieSelected(id){

    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;

}

function getMovie(){

    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com/?i='+movieId+'&apikey=8a619475')
     .then((response)=>{

        console.log(response);
        let movie = response.data;

        let down = movie.Title +" "+  movie.Year;
        let down2 = down.toLowerCase();
        let string = down2.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        let down3 = string.split(" ").join("-");

        console.log(down3);

        let output = `
        
        <div  class="row">
        
        <div class="col-md-4">
        
        <img src="${movie.Poster}" class="thumbnail">
        </div>

        <div class="col-md-8">
        
        <h2>${movie.Title}</h2>

        <ul class="list-group">
        
        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
        
        </ul>
        </div>
        </div>

        <div class="row">
        <div class="col-md-8">
        <div class="well">
        <h3>Plot</h3>
        <p>${movie.Plot}</p>
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank"  class="btn btn-primary">View IMDB</a>
        <a href="https://yts.mx/movie/${down3}" data-toggle="tooltip" data-placement="right" title="download from the torrent link on the next page!!" target="_blank" class="btn btn-warning">Download</a>
        <a href="index.html" class="btn btn-success">Go Back To Search</a>

        </div>
</div>
        </div>


        `;

        $('#movie').html(output);


        })
     .catch((error)=>{

            console.log(error);

        });

}