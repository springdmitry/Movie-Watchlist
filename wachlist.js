const movieList = document.getElementById('movie-list')
let savedMovies = []


document.addEventListener('click', function (e) {
    if (e.target.className === 'addBtn') {
        localStorage.removeItem(`${e.target.id}`)
        savedMovies = []
        renderList()
    }
})



function renderList() {
    Object.keys(localStorage).forEach(key => {
        savedMovies.push(localStorage.getItem(key))
    })

    if (savedMovies.length > 0) {
        movieList.innerHTML = ''
        return savedMovies.map(movie => {
            let movieData = JSON.parse(movie)
            movieList.innerHTML += `
                <div class="movie-container">
                    <img src="${movieData[0].Poster}" class="poster" alt="movie poster">
                    <h4 class="title">${movieData[0].Title}</h4>
                    <p class="raiting"> <i class="fa-solid fa-star" style="color: #fec654;"></i> ${movieData[0].imdbRating}</p>
                    <p class="year">${movieData[0].Year}</>
                    <p class="runtime">${movieData[0].Runtime}</p>
                    <p class="genre">${movieData[0].Genre}</p>
                    <button id="${movieData[0].imdbID}" class="addBtn">
                        <i class="fa-solid fa-minus" style="color: #121212;"></i>
                        Remove
                    </button>
                    <p class="plot">${movieData[0].Plot}</p>
                </div>
            `
        })
    } else {
        return movieList.innerHTML = `
            <div class="placeholder">
                <h3>Your watchlist is looking a little empty...</h3>
                <a href="index.html">
                    <i class="fa-solid fa-plus" style="color: #121212;"></i>
                    Let’s add some movies!
                </a>
        </div>`
    }
}


renderList()
