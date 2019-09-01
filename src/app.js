import { http } from "./http";
import { ui } from "./UI";

const url = "http://localhost:3000/posts";

document.addEventListener("DOMContentLoaded", getPosts);
document.querySelector(".buttons").addEventListener("click", ctrlBtns);
document.querySelector("#submit").addEventListener("click", submitPost);
document.querySelector("#post-area").addEventListener("click", ctrlPost);

let dataId;

function getPosts() {
  http
    .get(url)
    .then(result => ui.displayPosts(result))
    .catch(err => ui.showAlret("There is a problem", "red"));
}

function submitPost() {
  const title = document.querySelector("#post-title").value;
  const body = document.querySelector("#post-body").value;
  if (title !== "" && body !== "") {
    const data = {
      title,
      body
    };
    http
      .post(url, data)
      .then(result => {
        ui.showAlret("Post Added!", "green");
        getPosts();
        ui.clearFields();
      })
      .catch(err => ui.showAlret("There is a problem", "red"));
  }
}

function ctrlPost(e) {
  if (e.target.id === "remove") {
    removePost(e);
  } else if (e.target.id === "edit") {
    editPost(e);
  }
}

function removePost(e) {
  const id = e.target.parentElement.parentElement.id;
  const delURL = url + `/${id}`;
  http
    .delete(delURL)
    .then(result => getPosts())
    .catch(err => ui.showAlret("There is a problem", "red"));
}
function editPost(e) {
  dataId = e.target.parentElement.parentElement.id;
  const post = e.target.parentElement.parentElement.firstElementChild;

  const title = post.querySelector("#title").innerHTML;
  const body = post.querySelector("#body").innerHTML;
  const data = {
    id: dataId,
    title,
    body
  };
  ui.editState(data);
}

function ctrlBtns(e) {
  if (e.target.id === "update") {
    const title = document.querySelector("#post-title").value;
    const body = document.querySelector("#post-body").value;
    if (title !== "" && body !== "") {
      const data = {
        title,
        body
      };
      http
        .put(url + `/${dataId}`, data)
        .then(result => {
          ui.showAlret("Post updated!", "green");
          getPosts();
          ui.readyState();
          ui.clearFields();
        })
        .catch(err => ui.showAlret("There is a problem", "red"));
    }
  } else if (e.target.id === "back") {
    ui.readyState();
    ui.clearFields();
  }
}
