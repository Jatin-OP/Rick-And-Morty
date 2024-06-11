import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: string[];
    url: string;
    created: string;
    firstSeen:string;
    firstSeenID:string;
    loc_id:string;

}

interface RandomCharState {
    characters: Character[];
}

const initialState: RandomCharState = {
    characters: [],
};

const randomCharSlice = createSlice({
    name: 'randomChar',
    initialState,
    reducers: {
        addRandomChar: (state, action: PayloadAction<Character[]>) => {
            state.characters = action.payload;
        },
    },
});

export const { addRandomChar } = randomCharSlice.actions;
export default randomCharSlice.reducer;