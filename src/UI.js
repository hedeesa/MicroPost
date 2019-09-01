class UI {
  constructor() {
    this.postArea = document.getElementById("post-area");
    this.inputTitle = document.getElementById("post-title");
    this.inputBody = document.getElementById("post-body");
    this.inputArea = document.getElementById("input-area");
    this.submitBtn = document.getElementById("submit");
    this.buttons = document.querySelector(".buttons");

    this.state = "ready";
  }

  displayPosts(posts) {
    let html = "";

    posts.forEach(post => {
      html += `<div class="container-card post" id="${post.id}">
      <div class="post-header">
        <h2 id="title">${post.title}</h2>
        <p id="body">${post.body}</p>
      </div>
      <div class="buttons">
        <i class="fa fa-pencil" id="edit"></i>
        <i class="fa fa-remove" id="remove"></i>
      </div>
    </div>`;
    });

    this.postArea.innerHTML = html;
  }
  clearFields() {
    this.inputTitle.value = "";
    this.inputBody.value = "";
  }
  showAlret(message, type) {
    const alert = document.createElement("p");
    alert.classList = `alert ${type}`;
    alert.textContent = message;
    this.inputArea.appendChild(alert);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }
  editState(data) {
    this.state = "edit";

    const backBtn = this.createBtn("back", "Back");
    const updateBtn = this.createBtn("update", "Update");

    this.submitBtn.style.display = "none";
    // create BackBtn
    this.buttons.appendChild(updateBtn);
    this.buttons.appendChild(backBtn);

    // fill inputs
    this.inputTitle.value = data.title;
    this.inputBody.value = data.body;
  }
  readyState() {
    this.state = "ready";
    this.submitBtn.style.display = "block";
    document.getElementById("back").remove();
    document.getElementById("update").remove();
  }
  createBtn(id, text) {
    const button = document.createElement("button");
    button.className = "btn";
    button.id = id;
    button.textContent = text;

    return button;
  }
}

export const ui = new UI();
