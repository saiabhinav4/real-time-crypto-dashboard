import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCoin } from "../store/coinDetailSlice";
const DropDown = () => {
    const value = useSelector(data=>data.currentSelected);
    const coinList = useSelector(data=>data.coinList);
    const dispatch = useDispatch();
    const options =  React.useMemo(()=>{
      return coinList?.map((option)=>({value:option,label:option}));
    },[coinList]);

    const onChangeHandler = React.useCallback((value)=>{
        dispatch(changeCoin(value));
    },[]); 

  return (
    <div className="dropdown">
      <select value={value} onChange={e => onChangeHandler(e.target.value)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;