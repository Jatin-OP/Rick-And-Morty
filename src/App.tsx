/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import { Character, addRandomChar } from './features/RandomCharSlice';
import HomePage from './components/HomePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { SingleCharacter } from './components/SingleCharacter';
import Location from './components/Location';
import Episode from './components/Episode';
import Allchars from './components/all_Characters';
import AllEpisode from './components/allEpisode';
import AllLocations from './components/AllLocations';

function App() {
    const [randomChars, setRandomChars] = useState<Character[]>([]);
    const dispatch = useDispatch();

    async function fetchRandomChar(id: number): Promise<Character> {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data: Character = await res.json();
        const res1 = await fetch(data.episode[0]);
        const data1: any = await res1.json();
        data.firstSeen = data1.name;
        data.firstSeenID = data1.id;
        const arr = data.location.url.split('/')
        data.loc_id = arr[arr.length - 1];
        return data;
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchPromises = [];
            for (let i = 0; i < 6; i++) {
                fetchPromises.push(fetchRandomChar(Math.floor(Math.random() * 826) + 1));
            }
            const chars = await Promise.all(fetchPromises);
            setRandomChars(chars);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (randomChars.length >= 6) {
            dispatch(addRandomChar(randomChars));
        }
    }, [randomChars, dispatch]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/character/:characterid' element={<SingleCharacter />} />
                    <Route path='/episode/:episodeid' element={<Episode />} />
                    <Route path='/location/:locationid' element={<Location />} />
                    <Route path='/allcharacters' element={<Allchars />} />
                    <Route path='/allepisodes' element={<AllEpisode />} />
                    <Route path='/alllocations' element={<AllLocations />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
