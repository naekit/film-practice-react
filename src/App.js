import React, { useEffect, useState } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
	const [movieArray, setMovieArray] = useState([])
	const [loading, setLoading] = useState(false)

	async function fetchHandler() {
		setLoading(true)
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
		setLoading(false)
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchHandler}>Fetch Movies</button>
			</section>
			<section>
				{!loading ? (
					<MoviesList movies={movieArray} />
				) : (
					<p>Loading...</p>
				)}
			</section>
		</React.Fragment>
	)
}

export default App
