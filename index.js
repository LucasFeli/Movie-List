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
    const StorageMovies = [
      {
        title: "Titanic",
        gender: "Drama",
        rate: 5,
      },
      {
        title: "The Fast and Furious",
        gender: "Action",
        rate: 4,
      },
    ];

    const movies = StorageMovies;

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
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".container");
    const form = document.querySelector("#movie-form")
    container.insertBefore(div, form)
}

  static clearInputs() {
    document.querySelector("#title").value = "";
    document.querySelector("#gender").value = "";
    document.querySelector("#rate").value = "";
  }
}

//Storage

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
      UI.alertsMessage("Please fill in all inputs", "danger")
  } else {
    //Instatiate movie
    const movie = new Movie(title, gender, rate);
    console.log(movie);

    //Add movie to UI
    UI.addMovieToList(movie);

    //clear inputs
    UI.clearInputs();
  }
});

//Event : remove a Movie
document.querySelector("#movie-list").addEventListener("click", (e) => {
  UI.deleteMovie(e.target);
});