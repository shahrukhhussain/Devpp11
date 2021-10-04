let Search = (props) => {
    return (
      <>
<div class="col-8 mt-3">
        <p class="mt-3">Showing {props.total} movies form the database</p> 

        {/* <!-- Buttun --> */}
      <button type="button" class="btn btn-primary">Add New Movies</button>

        {/* <!-- Search bar --> */}
         <div class="row">
          <div class="col-5 mt-3">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                placeholder="Search...."
                value={props.search}
                onChange={(e)=>{
                  // console.log(e);
                  // console.log(e.currenTarget);
                  props.updateSearch(e.currentTarget.value);
                }}
              />
            </div>
          </div>
        </div>
        </div>
        </>
    )
}

export default Search;