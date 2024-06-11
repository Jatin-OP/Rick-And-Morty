/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import "./SingleCharacter.css"
import { NavLink } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiMovieLine } from "react-icons/ri";
import { Loader } from "./Loader";
import NavBar2 from "./NavBar2";
import About from "./About";

export const SingleCharacter = () => {
    const { characterid } = useParams();
    const [characterObj, setCharacterObj] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [episodeList, setEpisodeList] = useState<any>(null);
    const characterUrl = `https://rickandmortyapi.com/api/character/${characterid}`;

    useEffect(() => {
        try {
            const fetchcharacterObj = async () => {
                setIsLoading(true);
                if (!characterUrl) {
                    return;
                }
                const res = await fetch(characterUrl);
                const data = await res.json();
                const arr = data.location.url.split('/')
                data.loc_id = arr[arr.length - 1]
                console.log(data);
                setCharacterObj(data);
                // characterPromise
                const episodePromise = data.episode.map((epi:any) => {
                    // console.log(epi);
                    return fetch(epi).then((res) => res.json());
                })
                const episodeList = await Promise.all(episodePromise);
                console.log(episodeList);
                setEpisodeList(episodeList);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
            fetchcharacterObj();
        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }
    }, [characterUrl])
    // console.log(characterList);
    return (
        <>
            <NavBar2/>
            {
                !isLoading && characterObj ?
                    <div className="single-char-container">
                        <div className="single-char-info">
                            <NavLink to={'/'}>
                                <IoMdArrowRoundBack size={40} style={{ margin: "1rem 2rem" }} />
                            </NavLink>

                            <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Charater Info</h3>
                            <div className="single-char-info-inner">
                                <img src={characterObj.image} alt="" />
                                <div className="single-char-data">
                                    <h1>{characterObj.name}</h1>
                                    <h4><div style={{ backgroundColor: characterObj.status === 'Alive' ? "green" : characterObj.status === 'Dead' ? 'red' : 'gray' }} className="home-char-status"></div>{characterObj.status} - {characterObj.species}</h4>
                                    {characterObj.gender === 'Male' ? <p> 🚹 Male</p> : <p> 🚺 Female</p>}
                                    <NavLink to={`/location/${characterObj.loc_id}`}>
                                        <p>Location : {characterObj.location.name}</p>
                                    </NavLink>

                                    <p>Created at: {characterObj.created}</p>
                                </div>
                            </div>
                        </div>
                        <div className="char-episode" style={{marginTop:"2rem"}}>
                            <h3 style={{textAlign:'center' , textDecoration:'underline'}}>List of episodes</h3>
                            {
                                episodeList && episodeList.length ?
                                    <div className="episode-list">

                                        {episodeList.map((item:any) => {
                                            return <NavLink  key={item.id} to={`/episode/${item.id}`}>
                                                <div className="epi-list-item">
                                                <RiMovieLine size={'64px'}/>
                                                <p>{item.name}</p>
                                                <p>{item.episode}</p>
                                            </div>
                                            </NavLink>
                                        })}

                                    </div>

                                    : <h1>Loading...</h1>
                            }
                        </div>


                    </div>
                    : <Loader/>
            }
            <br /><br /><br />
            <About/>
        </>
    )
}
