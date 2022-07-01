import React, { useState } from 'react'
import './card.css'

const Card = (props:any) => {
  const [data, setData] = useState(props.data);
  if (data !== undefined) {
  const link = `animes/${ data.id }`;
  return (
    <a className = "card_link" href = { link }>
      <div className = "card">
          <img className = "card_img" alt = "" src = { data.posterImage }/>
      </div>
    </a>
  )
  }
}

export default Card