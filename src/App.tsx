/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import { Character, addRandomChar } from './features/RandomCharSlice';
import HomePage from './components/HomePage';
import { Route,Routes,BrowserRouter} from 'react-router-dom'
import { SingleCharacter } from './components/SingleCharacter';
import Location from './components/Location';
import Episode from './components/Episode';
import Allchars from './components/all_Characters';
import AllEpisode from './components/allEpisode';
import AllLocations from './components/AllLocations';

function App() {
    const [randomChars, setRandomChars] = useState<Character[]>([]);
    const dispatch = useDispatch();

    async function fetchRandomChar(id: number) {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data: Character = await res.json();
        const res1 = await fetch(data.episode[0]);
        const data1:any=await res1.json();
        data.firstSeen = data1.name;
        data.firstSeenID =data1.id;
        const arr = data.location.url.split('/')
        data.loc_id = arr[arr.length -1]
        setRandomChars((prevChars) => [...prevChars, data]);
    }

    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            fetchRandomChar(Math.floor(Math.random() * 826) + 1);
        }
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
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/character/:characterid' element={<SingleCharacter/>}></Route>
                <Route path='/episode/:episodeid' element={<Episode/>}></Route>
                <Route path='/location/:locationid' element={<Location/>}></Route>
                <Route path='/allcharacters' element={<Allchars/>}></Route>
                <Route path='/allepisodes' element={<AllEpisode/>}></Route>
                <Route path='/alllocations' element={<AllLocations/>}></Route>
            </Routes>
            
        </BrowserRouter>
        
      </>
    )

}

export default App;
