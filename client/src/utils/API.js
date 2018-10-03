import axios from "axios";

export default {
  signup: function(signupInfo) {
    console.log("Entered API.signup(" + signupInfo + ")");
    let response =  axios.post("/api/register", signupInfo);
    console.log("Response: " + JSON.stringify(response));
    return response;
  },
  login: function(loginInfo) {
    console.log("Enterd API.login(" + loginInfo + ")");
    let response =  axios.post("/api/login", loginInfo);
    console.log("Response: " + JSON.stringify(response));
    return response;
  },

  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
