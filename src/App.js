import React, { useEffect, useState } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
	const [movieArray, setMovieArray] = useState([])

	async function fetchHandler() {
		const res = await fetch("https://swapi.dev/api/films/")
		const data = await res.json()
		setMovieArray(data.results)
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={() => fetchHandler()}>Fetch Movies</button>
			</section>
			<section>
				{movieArray.length > 1 && <MoviesList movies={movieArray} />}
			</section>
		</React.Fragment>
	)
}

export default App
