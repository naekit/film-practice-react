import React, { useCallback, useEffect, useState } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
	const [movieArray, setMovieArray] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchHandler = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			const res = await fetch("https://swapi.dev/api/films/")

			if (!res.ok) {
				throw new Error(`Something went wrong!`)
			}

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
		} catch (error) {
			setError(error.message)
		}
		setLoading(false)
	}, [])

	useEffect(() => {
		fetchHandler()
	}, [fetchHandler])

	const content =
		!loading && movieArray.length > 0 ? (
			<MoviesList movies={movieArray} />
		) : !loading && !error && movieArray.length === 0 ? (
			<p>Found no movies</p>
		) : !loading && error ? (
			<p>{error}</p>
		) : (
			<p>Loading...</p>
		)

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	)
}

export default App
