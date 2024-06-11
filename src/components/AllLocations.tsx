/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import NavBar2 from "./NavBar2";
import { Loader } from "./Loader";
import './AllLocations.css'
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import About from "./About";
import { TbBrandPlanetscale } from "react-icons/tb";
export default function AllLocations() {
    const [page, setPage] = useState(1);
    const [allLocaionsData, setAllLocationData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);
    const [input1,setInput1] = useState("")
    const [totalpages, settotalpages] = useState(0);
    useEffect(() => {
        async function fetchAllChar() {
            setLoading(true);
            try {
                let url1=`https://rickandmortyapi.com/api/location?page=${page}`
                if(input1){
                    url1 = `https://rickandmortyapi.com/api/location?page=${page}&name=${input1}`
                }
                const res = await fetch(url1);
                const data = await res.json();
                settotalpages(data.info.pages);
                setAllLocationData(data.results);
            } catch (error) {
                console.error("Failed to fetch location data:", error);
            }
            setLoading(false);
        }
        console.log(input1);
        
        fetchAllChar();
    }, [page,input1]);
    return (
        <>
            <NavBar2 setInput={setInput1} />
            <div className="all-episode-container">
                <h2 style={{ textDecoration: 'underline', textAlign: 'center', margin: "2rem 0" }}>Locations</h2>
                <div className="all-episode-list">
                    <div className="pagination-controls" style={{ margin: "2rem 0" }}>
                        <GrLinkPrevious onClick={() => { setPage(page - 1) }} size={30} />
                        <h3>Page {page}</h3>
                        <GrLinkNext onClick={() => { setPage(page + 1) }} size={30} />
                    </div>
                    {   page > 0 && page<= totalpages?
                            !loading && allLocaionsData?
                            allLocaionsData.map((item:any)=>{
                                    return(
                                    <div className="all-episode-card" key={item.id}>
                                        <TbBrandPlanetscale size={200} />

                                        <div className="all-episode-info">
                                            <NavLink to={`/location/${item.id}`}>
                                                <h2>{item.name}</h2>
                                            </NavLink>
                                            
                                            <h3>{item.type}</h3>
                                            <p>{item.dimension}</p>
                                        </div>
                                        
                                    </div>
                                )
                            })
                            
                            :    <Loader/>
                        : <h1>Out of Pages</h1>

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
