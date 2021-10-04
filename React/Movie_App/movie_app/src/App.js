import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Filter from "./Filter";
import Navbar from "./Navbar";
import Search from "./Search";
import Table from "./Table";
import Login from "./Login";
import Customers from "./Customers";
import Rentals from "./Rentals";

class App extends React.Component {
  state = {
    movies: [],
    genre: [],
    selectedFilter: "All Genre",
    search: "",
  };

  updateSearch = (searchString) => {
    this.setState({ search: searchString });
  };

  //To set the current filter
  setFilter = (filter) => {
    this.setState({ selectedFilter: filter });
  };

  toggleLike = (id) => {
    // console.log(id);
    let index = this.state.movies.findIndex((el) => {
      console.log(el._id);
      // console.log("#");
      return el._id === id;
    });
    let currMoviesArr = this.state.movies.map((el) => el);
    console.log(index);
    // (Arr[index].liked) ? (Arr[index].liked) = false : currMovies[index].liked = true;
    if (currMoviesArr[index].liked) {
      currMoviesArr[index].liked = false;
    } else {
      currMoviesArr[index].liked = true;
    }
    this.setState({ movies: currMoviesArr });
  };

  deleteMovie = (id) => {
    let filteredArr = this.state.movies.filter((el) => {
      return el._id != id;
    });
    this.setState({ movies: filteredArr });
  };

  componentDidMount() {
    const URL = "http://localhost:4000";

    let f = async () => {
      let responseGenre = await fetch(`${URL}/genre`);
      let responseMovies = await fetch(`${URL}/movies`);
      let moviesJson = await responseMovies.json();
      let genreJson = await responseGenre.json();

      // console.log(result);
      // let json = await result.json();
      // console.log(json);

      // console.log(genreJson);
      // console.log(moviesJson);
      this.setState({
        movies: moviesJson,
        genre: genreJson,
      });
    };
    f();
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route exact path="/rentals/premium">
              <Login />
            </Route>

            <Route exact path="/rentals">
              <Rentals />
            </Route>

            <Route path="/Customers">
              <Customers />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/">
              <div className="row">
                <div class="col-3 ">
                  <Filter
                    setFilter={this.setFilter}
                    selectedFilter={this.state.selectedFilter}
                    genreData={this.state.genre}
                  />
                </div>

                <div className="col-9 ">
                  <Search
                    search={this.state.search}
                    updateSearch={this.updateSearch}
                    total={this.state.movies.length}
                  />
                  <Table
                    search={this.state.search}
                    deleteMovie={this.deleteMovie}
                    toggleLike={this.toggleLike}
                    selectedFilter={this.state.selectedFilter}
                    moviesData={this.state.movies}
                  />
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
