import { useSelector } from "react-redux";
import { RootState } from '../app/store';
// import React from 'react'
import './HomePage.css'
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import About from "./About";

export default function HomePage() {
    const RandomChar = useSelector(
        (state: RootState) => { return state.addRandomCharReducer.characters }
    );
    return (
        <>
            <NavBar></NavBar>
            <div className="home-char-card-container">
                {
                    RandomChar && RandomChar.length > 0 ?
                        RandomChar.map(item => {
                            return (

                                <div className="home-card" key={item.id}>
                                    <div className="home-card-img">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="home-card-info">
                                        <div>
                                            <NavLink to={`/character/${item.id}`} className="home-navlink" >
                                                <h2 className="home-card-title">{item.name}</h2>
                                            </NavLink>
                                           
                                            {item.gender === 'Male' ? <p style={{ color: 'blue', display: 'inline-block' }}>♂️</p> : <p style={{ color: 'red', display: 'inline-block' }}>♀️</p>}

                                            <h4><div style={{ backgroundColor: item.status === 'Alive' ? "green" : item.status === 'Dead' ? 'red' : 'gray' }} className="home-char-status"></div>{item.status} - {item.species}</h4>
                                        </div>


                                        <div>
                                        <h4>Last known location:</h4>
                                           <NavLink to={`location/${item.loc_id}`} className="home-navlink" >
                                           <h4 className="home-card-location">{item.location.name}</h4>
                                           </NavLink>
                                            

                                        </div>

                                        <div>
                                            <h4>First seen in:</h4>
                                            <NavLink to={`episode/${item.firstSeenID}`} className="home-navlink" >
                                                <h4 className="home-card-firstSeen">{item.firstSeen}</h4>
                                            </NavLink>
                                            
                                        </div>




                                    </div>



                                </div>
                            )
                        })

                        : null
                }

            </div>
            <About/>
        </>

    )
}
