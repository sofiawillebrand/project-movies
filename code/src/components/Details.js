import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { DETAILS_URL } from '../utils/urls'

const GoBackButton = styled.button`
  color: black;
	background-color: red;
`

const Details = () => {
  const [details, setDetails] = useState({})
	const [error, setError] = useState(false)

  const { pokemonName } = useParams()
	const history = useHistory()

	useEffect(() => {
		fetch(DETAILS_URL(pokemonName))
			.then((res) => res.json())
			.then((data) => {
				if (data.id) {
					setDetails(data)
				} else {
					setError(true)
				}
			})
			.catch(() => setError(true))
	}, [pokemonName])

	const onButtonBackClick = () => {
		// history.goBack()
		history.push('/')
	}

	if (error) {
		return(
		<div>
		  <GoBackButton onClick={onButtonBackClick}>Go back</GoBackButton>
		  <h2>No such pokemon!</h2>
	  </div>
		)
	}

  return (
	  <div>
			<GoBackButton onClick={onButtonBackClick}>Go back</GoBackButton>
			<h2>{details.name}</h2>
			<img src={details?.sprites?.other['official-artwork']?.front_default} alt={details.name}></img>
	  </div>
	)
}

export default Details