import React from 'react'

function Card(props) {
  return (
    <div onClick={() => props.addCardToSelectedCards(props.name)} className='bg-white border-[1px] border-black flex flex-col h-[300px] w-[280px] p-4 rounded-2xl cursor-pointer hover:animate-pulse'>
        <img className="scale-100" src={props.image} alt="" />
        <strong className='text-center text-[1.5rem] '>{props.name}</strong>
    </div>
  )
}

export default Card