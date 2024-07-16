import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import { updateLatestResult } from "../store/coinDetailSlice";
import loading from "../images/loading.gif";
import { v4 as uuidv4 } from 'uuid';
const Table = ()=>{

    const selectedCoin = useSelector(state=>state.currentSelected);
    const rows = useSelector(state=>state.result);
    const dispatch = useDispatch();
    const headers = ["NAME","PRICE","MARKET CAP"];

    React.useEffect(() => {
      const interval = setInterval(() => {
        fetchCoinDetails();
      }, 5000);
      return () => clearInterval(interval);
    }, [selectedCoin]);

    const fetchCoinDetails = React.useCallback(() =>{
      fetch(`/api/coin-detail/${selectedCoin}`)
      .then(response=>response.json())
      .then(data=>dispatch(updateLatestResult(data)));
    },[selectedCoin]);
    if(rows.length==0){
        return <div>
          <Image
                src={loading}
                alt="loading image"
                width={200}
                height={200}
                priority
              />
        </div>;
    }
    return (
      <table className="table">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={uuidv4()}>
              {row.map(cell => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default Table;