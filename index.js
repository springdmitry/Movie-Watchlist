const serchInput = document.getElementById('movie-search')
const serchForm = document.getElementById('serch-form')
const movieList = document.getElementById('movie-list')
let movieInfo = []
serchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    handleResponce(serchInput)
})

document.addEventListener('click', function (e) {
    if (e.target.className === 'addBtn') {
        let savedMovie = movieInfo.filter(movie => movie.imdbID === e.target.id)
        localStorage.setItem(`${e.target.id}`, JSON.stringify(savedMovie))
    }
})

async function handleResponce(serch) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=6597f4de&s=${serch.value}`)
    const data = await res.json()

    movieList.innerHTML = ''

    if (data.Response === 'False') {
        return movieList.innerHTML = '<h3 class="error-msg"> Unable to find what you’re looking for. Please try another search.</h3>'
    } else {
        return data.Search.map(movie => handleRenderMovie(movie.imdbID))
    }

}

async function handleRenderMovie(imdbID) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=6597f4de&i=${imdbID}`)
    const movieData = await res.json()

    movieInfo.push(movieData)

    return movieList.innerHTML += `
        <div class="movie-container">
            <img src="${movieData.Poster}" class="poster" alt="movie poster"">
            <h4 class="title">${movieData.Title}</h4>
            <p class="raiting"> <i class="fa-solid fa-star" style="color: #fec654;"></i> ${movieData.imdbRating}</p>
            <p class="year">${movieData.Year}</>
            <p class="runtime">${movieData.Runtime}</p>
            <p class="genre">${movieData.Genre}</p>
            <button id="${imdbID}" class="addBtn"> 
                <i class="fa-solid fa-plus" style="color: #121212;"></i> 
                Watchlist
            </button>
            <p class="plot">${movieData.Plot}</p>
        </div>
    `
}
