/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router"
import { NavLink } from "react-router-dom";
import About from "./About";
import { Loader } from "./Loader";
import NavBar2 from "./NavBar2";
import { TbBrandPlanetscale } from "react-icons/tb";
export default function Location(){
    const {locationid}=useParams();    
    const locationUrl =  `https://rickandmortyapi.com/api/location/${locationid}`;
    const [locationObj, setLocationObj] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [characterList, setCharacterList] = useState<any>(null);
    useEffect(() => {
        try {
            const fetchcharacterObj = async () => {
                setIsLoading(true);
                if (!locationUrl) {
                    return;
                }
                const res = await fetch(locationUrl);
                const data = await res.json();

                setLocationObj(data);

                const characterPromise = data.residents.map((epi: any) => {
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
    }, [locationUrl])
    console.log("locationObj",locationObj);
    return(
        <div>
            <NavBar2></NavBar2>
            <div>
                {
                    isLoading ?
                        <Loader />
                        :
                        <div>

                            <div className="single-episode-container">
                                {!isLoading && locationObj ?

                                    <div className="single-episode-info">
                                        <NavLink to={'/'}>
                                            <IoMdArrowRoundBack size={40} style={{ margin: "1rem 2rem" }} />
                                        </NavLink>

                                        <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Location Info</h3>
                                        <div className="single-char-info-inner">
                                            <TbBrandPlanetscale size={200}/>
                                            <div className="single-char-data">
                                                <h3>{locationObj.name}</h3>
                                                <h3>{locationObj.type}</h3>
                                                <p>{locationObj.dimension}</p>
                                            </div>
                                        </div>
                                    </div>

                                    : <Loader />

                                }
                                <div className="char-episode" style={{ marginTop: "2rem" }}>
                                    <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>List of residents</h3>
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
