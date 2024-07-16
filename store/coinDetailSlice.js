import { createSlice } from '@reduxjs/toolkit';
import { cryptoList } from "../helpers/constants";
const initialState = {
    coinList: cryptoList,
    currentSelected: cryptoList?.[0],
    result:[],
  };

const coinSlice = createSlice({
    name:"coinDetails",
    initialState,
    reducers:{
        changeCoin: (state,action) => {
            state.currentSelected = action.payload;
            state.result=[];
        },
        updateLatestResult: (state,action) =>{
            if(state.currentSelected==action.payload?.[0]?.[0]){
                state.result = action.payload;
            }
            else{
                state.result = [];
            }
        }
    },
});

export const { changeCoin, updateLatestResult } = coinSlice.actions;
export default coinSlice.reducer;
