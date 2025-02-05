import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import popcorn from "../images/popcorn.svg"

import { DETAILS_URL } from '../utils/urls'
import Button from './Button'
import Loading from './Loading'

const Details = () => {
  const [details, setDetails] = useState({})
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)

  const { movie_id } = useParams()
	const history = useHistory()

	useEffect(() => {
		setLoading(true)
		fetch(DETAILS_URL(movie_id))
		.then((res) => res.json())
		.then((data) => {
			if (data.id) {
				setDetails(data)
			} else {
				setError(true)
			}	
			})
			.finally(() => setTimeout(() => setLoading(false), 500))
			.catch(() => setError(true))
		}, [movie_id])

	const onButtonBackClick = () => {
		history.push('/')
	}

	if (error) {
		return(
		<div className="errorContainer">
		  <Button onClick={onButtonBackClick}>Go back</Button>
		  <img src={popcorn} alt="popcorn" />
		  <h2>Sorry, no such movie!</h2>
	  </div>
		)
	}

  return (
	<main className='posterBackground' style={{ 
      	backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 70%, rgb(0, 0, 0) 100%), url(https://image.tmdb.org/t/p/w1280${details.backdrop_path})` 
    	}}>
        <div className="detailsContainer" >
		    <Button onClick={onButtonBackClick}/>
				{loading && <Loading />}
					<div className="movieDetailsContainer">
						<img className="smallMoviePoster" src={`https://image.tmdb.org/t/p/w342${details.poster_path}`} alt={details.title} />
							<div className="movieDetailsText">
				  				<h2>{details.title} <span className="rating">{details.vote_average}/10</span></h2>
								<p>{details.overview}</p>
							</div>
					</div>
		</div>
	</main>
	)
}

export default Details