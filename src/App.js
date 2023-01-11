import React, { useCallback, useEffect, useState } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"
import AddMovie from "./components/AddMovie"

function App() {
	const [movieArray, setMovieArray] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchHandler = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			const res = await fetch(
				"https://http-movie-basic-default-rtdb.firebaseio.com/movies.json"
			)
			if (!res.ok) {
				throw new Error(`Something went wrong!`)
			}
			const data = await res.json()

			const movieData = []
			for (const key in data) {
				movieData.push({
					id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				})
			}

			setMovieArray(movieData)
		} catch (error) {
			setError(error.message)
		}
		setLoading(false)
	}, [])

	useEffect(() => {
		fetchHandler()
	}, [fetchHandler])

	async function addMovieHandler(movie) {
		console.log(movie)
		const res = await fetch(
			"https://http-movie-basic-default-rtdb.firebaseio.com/movies.json",
			{
				method: "POST",
				body: JSON.stringify(movie),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		const data = await res.json()
		console.log(data)
		fetchHandler()
	}

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
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section>
				<button onClick={fetchHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	)
}

export default App
