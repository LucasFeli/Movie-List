//Movie Class

class Movie {
  constructor(title, gender, rate) {
    this.title = title;
    this.gender = gender;
    this.rate = rate;
  }
}

//UI class : Handle UI Taks

class UI {
  static displayMovies() {
    

    const movies = Store.getMovies();

    movies.forEach((movie) => UI.addMovieToList(movie));
  }

  static addMovieToList(movie) {
    const list = document.querySelector("#movie-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${movie.title}</td>
    <td>${movie.gender}</td>
    <td>${movie.rate}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
   `;
    list.appendChild(row);
  }

  static deleteMovie(elem) {
    if (elem.classList.contains("delete")) {
      elem.parentElement.parentElement.remove();
    }
  }

  static alertsMessage(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#movie-form");
    container.insertBefore(div, form);

    //show up 3 seconds

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearInputs() {
    document.querySelector("#title").value = "";
    document.querySelector("#gender").value = "";
    document.querySelector("#rate").value = "";
  }
}

//Storage

class Store {
  static getMovies() {
    let movies;
    if (localStorage.getItem("movies") === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem("movies"));
    }

    return movies;
  }

  static addMovie(movie) {
    const movies = Store.getMovies();

    movies.push(movie);

    localStorage.setItem("movies", JSON.stringify(movies));
  }

  static removeMovie(gender) {
    const Movies = Store.getMovies();
    movies.forEach((movie, index) => {
      if (movie.gender === gender) {
        movies.splice(index, 1);
      }
    });
    localStorage.setItem("movies", JSON.stringify(books));
  }
}

//Event: dysplay movies

document.addEventListener("DOMContentLoaded", UI.displayMovies);

//Event :add a Movie

document.querySelector("#movie-form").addEventListener("submit", (e) => {
  e.preventDefault();
  //Get form values
  const title = document.querySelector("#title").value;
  const gender = document.querySelector("#gender").value;
  const rate = document.querySelector("#rate").value;

  //Validate title

  if (title === "" || gender === "" || rate === "") {
    UI.alertsMessage("Please fill in all inputs", "danger");
  } else {
    //Instatiate movie
    const movie = new Movie(title, gender, rate);
    

    //Add movie to UI
    UI.addMovieToList(movie);

    //add movie to Store

    Store.addMovie(movie)

    //succes message
    UI.alertsMessage("Movie added", "success");
    //clear inputs
    UI.clearInputs();
  }
});

//Event : remove a Movie
document.querySelector("#movie-list").addEventListener("click", (e) => {
  UI.deleteMovie(e.target);

  //remove message
  UI.alertsMessage("Movie Removed", "success");
});
