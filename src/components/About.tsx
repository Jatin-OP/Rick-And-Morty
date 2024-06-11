import React from 'react'
import { NavLink } from 'react-router-dom'
import './About.css'
export default function About(){
    return(
        <div className='about'>
            <div className='about-container'>
                <div className='about-char'> 
                    <NavLink to={'/allcharacters'} > 
                        <p>characters:826</p>
                    </NavLink>
                    <NavLink to={'/allepisodes'}> 
                        <p>episodes:51</p>
                    </NavLink>
                    <NavLink to={'/alllocations'}> 
                        <p>locations:126</p>
                    </NavLink>
                   
                </div>
                <h2 style={{marginTop:'2rem'}}>Made By : Jatin</h2>
            </div>
        </div>
    )
    
}
