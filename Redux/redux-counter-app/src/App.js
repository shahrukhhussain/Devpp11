import React from 'react'
import {useDispatch , useSelector } from "react-redux";
import { incrementCreator } from "./redux/actions";
import {decrementCreator} from "./redux/actions";


let  App = () => {
  let state = useSelector(function(state){
    return state
  });

  let dispatch = useDispatch();
  return (
    <>

      <button onClick={()=>{
        dispatch(incrementCreator());
      }}>+</button>
      <p>{state}</p>
      <button onClick={()=>{
        dispatch(decrementCreator());
      }}>-</button>

    </>
  );
}

export default App
