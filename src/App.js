import React, { useEffect, useState } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
	const [movieArray, setMovieArray] = useState([])

	async function fetchHandler() {
		const res = await fetch("https://swapi.dev/api/films/")
		const data = await res.json()
		const transformedMovieArray = data.results.map((movie) => {
			return {
				id: movie.episode_id,
				title: movie.title,
				openingText: movie.opening_crawl,
				releaseDate: movie.release_date,
			}
		})
		setMovieArray(transformedMovieArray)
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchHandler}>Fetch Movies</button>
			</section>
			<section>
				{movieArray.length > 1 && <MoviesList movies={movieArray} />}
			</section>
		</React.Fragment>
	)
}

export default App
