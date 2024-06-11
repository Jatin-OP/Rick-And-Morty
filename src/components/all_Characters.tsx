/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import NavBar2 from "./NavBar2";
import { Loader } from "./Loader";
import './all_Characters.css'
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import About from "./About";
export default function Allchars() {
    const [page, setPage] = useState(1);
    const [allCharData, setAllCharData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);
    const [input, setInput] = useState('');
    const [totalpages, settotalpages] = useState(0);
    useEffect(() => {
        async function fetchAllChar() {
            setLoading(true);
            try {
                let url = `https://rickandmortyapi.com/api/character?page=${page}`;
                if (input) {
                    url = `https://rickandmortyapi.com/api/character?page=${page}&name=${input}`
                }
                const res = await fetch(url);
                const data = await res.json();
                settotalpages(data.info.pages);
                setAllCharData(data.results);
            } catch (error) {
                console.error("Failed to fetch character data:", error);
            }
            setLoading(false);
        }
        fetchAllChar();
    }, [page, input]);
    useEffect(() => {
        console.log(input);

    })

    return (

        <>
            <NavBar2 setInput={setInput} />
            <div className="all-char-container">
                <h2 style={{ textDecoration: 'underline', textAlign: 'center', margin: "2rem 0" }}>Characters</h2>

                <div className="all-char-list">
                    <div className="pagination-controls" style={{ margin: "2rem 0" }}>
                        <GrLinkPrevious onClick={() => { setPage(page - 1) }} size={30} />
                        <h3>Page {page}</h3>
                        <GrLinkNext onClick={() => { setPage(page + 1) }} size={30} />
                    </div>

                    {  page>0 &&page <= totalpages?
                        loading ? (
                            <Loader />
                        ) : (
                            allCharData ? (
                                allCharData.map((char: any) => (
                                    <div key={char.id} className="all-character-card">

                                        <img src={char.image} alt={char.name} />



                                        <div className="all-character-card-info">
                                            <NavLink to={`/character/${char.id}`}>
                                                <h1>{char.name}</h1>
                                            </NavLink>

                                            <h4><div style={{ backgroundColor: char.status === 'Alive' ? "green" : char.status === 'Dead' ? 'red' : 'gray' }} className="home-char-status"></div>{char.status} - {char.species}</h4>
                                            {char.gender === 'Male' ? <p> 🚹 Male</p> : <p> 🚺 Female</p>}
                                            {
                                                <NavLink to={`/location/${char.location.url.split('/')[char.location.url.split('/').length - 1]}`}>
                                                    <p>Location : {char.location.name}</p>
                                                </NavLink>
                                            }


                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No characters found.</p>
                            )
                        )
                        : <h1>Out of Pages</h1>
                    }
                    <div className="pagination-controls" style={{ marginTop: "3rem" }}>
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
