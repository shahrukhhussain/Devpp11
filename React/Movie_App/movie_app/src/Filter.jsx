import React from "react";

let Filter = (props)=>{
    // console.log(props);
    console.log(props.setFilter);
    return (
        <>
        <ul class="list-group">
          <li 
          onClick={()=>{
            props.setFilter("All Genre");
          }}
          class={`list-group-item ${props.selectedFilter == "All Genre" ? "active" : ""}`}>All Genre</li>
          {
            props.genreData.map((el)=>{
                return( 
                <li onClick={() => {

                  props.setFilter(el.name)
                }} key={el._id} 
                class={`list-group-item ${props.selectedFilter == el.name ? "active" : ""}`}>{el.name}</li>
                )
            })
          }
          
        
        </ul>
      </>
    );

};

export default Filter;