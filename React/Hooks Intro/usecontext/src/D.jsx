import {useContext} from "react";
 
import { countContext } from "./A";

let D = ()=>{

    let valueObject = useContext(countContext);
    return (
        <div className="d-vala-div">
            <button onClick={()=>{
                valueObject.setCount(valueObject.count + 1);
            }}>+</button>
            <p>{valueObject.count}</p>
        </div>
    );
}

export default D;