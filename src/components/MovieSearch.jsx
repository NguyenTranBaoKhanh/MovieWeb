import React, { useContext, useState } from 'react'
import { MovieContext } from '../context/MovieProvider'

const MovieSearch = ({ title, data }) => {

    const {handleTrailer} = useContext(MovieContext);

    return (
        <div className='text-white p-10 mb-10'>
            <h2 className='uppercase text-xl mb-4'>{title}</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
                {data && data.length > 0 && data.map((item) => {
                    return (
                        <div key={item.id} className='w-[200px] h-[300px] relative group' onClick={() => handleTrailer(item.id)}>
                            <div className='w-full h-full group-hover:scale-110 transition-transform duration-500 cursor-pointer'>
                                <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
                                <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`} alt={item.title} className='w-full h-full object-cover' />
                                <div className=' absolute bottom-3 left-2'>
                                    <p className='uppercase text-md'>{item.title || item.original_title}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MovieSearch