/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "react-router";
import About from "./About";
import NavBar2 from "./NavBar2";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { RiMovieLine } from "react-icons/ri";
import'./Episode.css'
export default function Episode() {
    const { episodeid } = useParams()
    const [episodeObj, setEpisodeObj] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [characterList, setCharacterList] = useState<any>(null);
    const episodeUrl = `https://rickandmortyapi.com/api/episode/${episodeid}`;
    useEffect(() => {
        try {
            const fetchcharacterObj = async () => {
                setIsLoading(true);
                if (!episodeUrl) {
                    return;
                }
                const res = await fetch(episodeUrl);
                const data = await res.json();

                setEpisodeObj(data);

                const characterPromise = data.characters.map((epi: any) => {
                    // console.log(epi);
                    return fetch(epi).then((res) => res.json());
                })
                const characterList = await Promise.all(characterPromise);
                setCharacterList(characterList);


                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
            fetchcharacterObj();
        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }
    }, [episodeUrl])

    return (
        <div>
            <NavBar2></NavBar2>
            <div>
                {
                    isLoading ?
                        <Loader />
                        :
                        <div>

                            <div className="single-episode-container">
                                {!isLoading && episodeObj ?

                                    <div className="single-episode-info">
                                        <NavLink to={'/'}>
                                            <IoMdArrowRoundBack size={40} style={{ margin: "1rem 2rem" }} />
                                        </NavLink>

                                        <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Episode Info</h3>
                                        <div className="single-char-info-inner">
                                            <RiMovieLine size={'64px'} />
                                            <div className="single-char-data">
                                                <h3>{episodeObj.name}</h3>
                                                <h3>{episodeObj.episode}</h3>
                                                <p>AirDate : {episodeObj.air_date}</p>
                                            </div>
                                        </div>
                                    </div>

                                    : <Loader />

                                }
                                <div className="char-episode" style={{ marginTop: "2rem" }}>
                                    <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>List of characters</h3>
                                    {
                                        characterList && characterList.length ?
                                            <div className="char-list">

                                                {characterList.map((item: any) => {
                                                    return (
                                                        <NavLink className='char-list-nav' to={`/character/${item.id}`}>
                                                            <img src={item.image} alt="" />
                                                            <div style={{display:'flex' , flexDirection:'column' ,'justifyContent':'center' }}>
                                                                <h3>{item.name}</h3>
                                                                <p>{item.gender === 'Male' ? <p> 🚹 Male</p> : <p> 🚺 Female</p>}</p>
                                                                <h4><div style={{ backgroundColor: item.status === 'Alive' ? "green" : item.status === 'Dead' ? 'red' : 'gray' }} className="home-char-status"></div>{item.status} - {item.species}</h4>
                                                            </div>
                                                            

                                                        </NavLink>
                                                    )
                                                })}

                                            </div>

                                            : <Loader/>
                                    }
                                </div>
                            </div>
                        </div>

                }

            </div>
            <br /><br /><br />
            <About></About>
        </div>
    )
}
