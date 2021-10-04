//Actions are just objects

//when writing actions in redux we create something called action creator function

export const incrementCreator = ()=>{
    return {
        type : "INCREMENT",
    };
};
export const decrementCreator = ()=>{
    return {
        type : "DECREMENT",
    };
};
