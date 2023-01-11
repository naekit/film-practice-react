import React, { useRef } from "react"

import classes from "./AddMovie.module.css"

function AddMovie(props) {
	const titleRef = useRef("")
	const openingTextRef = useRef("")
	const releaseDateRef = useRef("")
	const formRef = useRef()

	function submitHandler(event) {
		event.preventDefault()
		// validation
		if (!titleRef.current.value) {
			titleRef.current.placeholder = "Please fill in title"
			return
		} else if (!openingTextRef.current.value) {
			openingTextRef.current.placeholder = "Please fill in opening text"
			return
		} else if (!releaseDateRef.current.value) {
			releaseDateRef.current.placeholder = "Please fill in release date"
			return
		} else {
			const movie = {
				title: titleRef.current.value,
				openingText: openingTextRef.current.value,
				releaseDate: releaseDateRef.current.value,
			}
			props.onAddMovie(movie)
			formRef.current.reset()
		}
	}

	return (
		<form ref={formRef} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="title">Title</label>
				<input type="text" id="title" ref={titleRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor="opening-text">Opening Text</label>
				<textarea
					rows="5"
					id="opening-text"
					ref={openingTextRef}
				></textarea>
			</div>
			<div className={classes.control}>
				<label htmlFor="date">Release Date</label>
				<input type="text" id="date" ref={releaseDateRef} />
			</div>
			<button>Add Movie</button>
		</form>
	)
}

export default AddMovie
