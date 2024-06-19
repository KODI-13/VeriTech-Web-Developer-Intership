// Const 
const apikey = "abc7b012c6d54459b6b71a6ee6edaacd";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}//discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyDj9ruPn0H8rCZ2cxfpwPIf8K8t4DQahwM`
}

// Boots up the app
function init(){
    // alert("hii your app is up")
    // fetchAndBuildMovieSection(apiPaths.fetchTrending, 'Tredning Now');
    fetchTrendingMovies();
    fetchAndBuildAllSections();
}

function fetchTrendingMovies(){
    fetchAndBuildMovieSection(apiPaths.fetchTrending, 'Trending Now')
    .then(list => {
        const randomIndex = parseInt(Math.random() * list.length);
        buildBannerSection(list[randomIndex]);
    }).catch(err=>{
        console.error(err);
    });
}

function buildBannerSection(movie){
    const bannerCont = document.getElementById('banner-section');
    bannerCont.style.backgroundImage = `url(${imgPath}${movie.backdrop_path})`;

    const div = document.createElement('div');

    div.innerHTML = `
    <h2 class="banner__title">${movie.title || movie.name}</h2>
    <p class="banner__info">Trending in Movies | Realeased - ${movie.release_date}</p>
    <p class="banner__overview">${movie.overview && movie.overview.length > 200? movie.overview.slice(0, 200).trim()+'...': movie.overview}</p>
    <div class="action-buttons-cont">
        <button class="action-button"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd"/>
          </svg> &nbsp;&nbsp; Play</button>
        <button class="action-button"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg> &nbsp;&nbsp;
           More Info</button>
    </div>
    `;

    div.className = "banner-content container";
    bannerCont.append(div);
    
}

function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res=>res.json())
    .then(res=>{
        const categories = res.genres;
        if (Array.isArray(categories) && categories.length){
            categories.forEach(category => {
                fetchAndBuildMovieSection(
                    apiPaths.fetchMoviesList(category.id), 
                    category.name
                );
            });
        }
        // console.table(categories);
    })
    .catch(err=>console.error(err));
}

function fetchAndBuildMovieSection(fetchUrl, categoryName){
    console.log(fetchUrl, categoryName);
    return fetch(fetchUrl)
    .then(res => res.json())
    .then(res => {
        //  console.log(res.results);
         const movies = res.results
         if (Array.isArray(movies) && movies.length){
            buildMoviesSection(movies, categoryName);
         }
         return movies;
    })
    .catch(err => console.error(err));
}

function buildMoviesSection(list, categoryName){
    console.log(list, categoryName);
    
    const moviesCont = document.getElementById('movies-cont');

    const moviesListHTML = list.map(item => {
        return `
        <div class="movie-item" onmouseenter="searchMovieTrailer('${item.title || item.name}', 'yt${item.id}')">
            <img class="movie-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}">
            <iframe width="245px" height="150px" src="" id="yt${item.id}"></iframe>
        </div>
        `;
    }).join('');

    const moviesSectionHTML = `
        <h2 class="movie-section-heading">${categoryName} <span class="expolre-nudge">Explore All</span></h2>
        <div class="movies-row">
            ${moviesListHTML}
        </div> 
    `

    // console.log(moviesSectionHTML);

    const div = document.createElement('div');
    div.className = "movies-section"
    div.innerHTML = moviesSectionHTML;

    // append html into movies container
    moviesCont.append(div);
}

function searchMovieTrailer(movieName, iframeId){
    if(!movieName) return;

    fetch(apiPaths.searchOnYoutube(movieName))
    .then(res => res.json())
    .then(res => {
        // console,log(res.items[0]);
        const bestResult = res.items[0];
        const youtubeUrl = `https://www.youtube.com/watch?v=${bestResult.id.videoId}`;
        console.log(youtubeUrl);
        // window.open(youtubeUrl,'_blank');
        document.getElementById(iframeId).src = `https://www.youtube.com/embed/${bestResult.id.videoId}?autoplay=1&mute=1`
    })
    .catch(err => console.log(err));
}

window.addEventListener('load', function(){
    init();
    this.window.addEventListener('scroll', function(){
        // Header ui update
        if (this.window.scrollY > 5) header.classList.add('black-bg')
        else header.classList.remove('black-bg');
    })
})