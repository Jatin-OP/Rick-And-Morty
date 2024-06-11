/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import NavBar2 from "./NavBar2";
import { Loader } from "./Loader";
import './allEpisode.css'
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import About from "./About";
import { RiMovieLine } from "react-icons/ri";
export default function AllEpisode() {
    const [page, setPage] = useState(1);
    const [allEpisodeData, setAllEpisodeData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);
    const [input1,setInput1] = useState("")
    const [totalpages, settotalpages] = useState(0);
    useEffect(() => {
        async function fetchAllChar() {
            setLoading(true);
            try {
                let url1=`https://rickandmortyapi.com/api/episode?page=${page}`
                if(input1){
                    url1 = `https://rickandmortyapi.com/api/episode?page=${page}&name=${input1}`
                }
                const res = await fetch(url1);
                const data = await res.json();
                settotalpages(data.info.pages);
                setAllEpisodeData(data.results);
            } catch (error) {
                console.error("Failed to fetch character data:", error);
            }
            setLoading(false);
        }
        fetchAllChar();
    }, [page,input1]);
    console.log(allEpisodeData);
    
    return (
        <>
            <NavBar2 setInput={setInput1} />
            <div className="all-episode-container">
                <h2 style={{ textDecoration: 'underline', textAlign: 'center', margin: "2rem 0" }}>Episodes</h2>
                <div className="all-episode-list">
                    <div className="pagination-controls" style={{ margin: "2rem 0" }}>
                        <GrLinkPrevious onClick={() => { setPage(page - 1) }} size={30} />
                        <h3>Page {page}</h3>
                        <GrLinkNext onClick={() => { setPage(page + 1) }} size={30} />
                    </div>
                    
                    {  page > 0 && page<= totalpages?
                        !loading && allEpisodeData?
                        allEpisodeData.map((item:any)=>{
                                return(
                                <div className="all-episode-card">
                                    <RiMovieLine size={'200'} />
                                    <div className="all-episode-info">
                                        <NavLink to={`/episode/${item.id}`}>
                                            <h2>{item.name}</h2>
                                        </NavLink>
                                        
                                        <h3>{item.episode}</h3>
                                        <p>AirDate : {item.air_date}</p>
                                    </div>
                                    
                                </div>
                            )
                        })
                        
                        :    <Loader/>
                    : <h2>Out of Pages</h2>

                    }
                    <div className="pagination-controls" style={{ margin: "2rem 0" }}>
                        <GrLinkPrevious onClick={() => { setPage(page - 1) }} size={30} />
                        <h3>Page {page}</h3>
                        <GrLinkNext onClick={() => { setPage(page + 1) }} size={30} />
                    </div>
                </div>

                <br /><br /><br />
                <About />
            </div >
        </>
    )
}
