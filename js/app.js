// const addQuestionBtn = document.getElementById("show-btn");
const editQuestionBtn = document.getElementById("edit-flashcard");
const showAnswerBtn = document.querySelector("#questions-list > div > div > a");

////wkurwiacz
function firstQuestion() {
  const firstQuestion = document.querySelector(
    "#questions-list > div:nth-child(1)"
  );
  firstQuestion
    .querySelector("#delete-flashcard")
    .addEventListener("click", function () {
      firstQuestion.remove();
    });
  firstQuestion.querySelector("a").addEventListener("click", function () {
    firstQuestion.querySelector("h5").classList.toggle("showItem");
  });
  firstQuestion
    .querySelector("#edit-flashcard")
    .addEventListener("click", function (e) {
      e.preventDefault();
    });
}
firstQuestion();
//////

let idNum = 1;

class UI {
  constructor(addQuestionBtn) {
    this.addQuestionBtn = addQuestionBtn;
  }
  showForm() {
    const questionForm = document.querySelector(
      "body > div > div:nth-child(1) > div > div"
    );
    questionForm.classList.add("showItem");
    document
      .querySelector("body > div > div:nth-child(1) > div > div > a > i")
      .addEventListener("click", function () {
        questionForm.classList.remove("showItem");
      });
  }

  saveQuastion() {
    const inputQuestion = document.querySelector("#question-input");
    const inputAnswer = document.querySelector("#answer-input");
    document
      .querySelector("#question-form > button")
      .addEventListener("click", function (e) {
        e.preventDefault();
        const question = new Question(
          idNum,
          inputQuestion.value,
          inputAnswer.value
        );
        idNum++;
        inputAnswer.value = "";
        inputQuestion.value = "";
        question.render();
      });
  }

  addEventListener() {
    this.addQuestionBtn.addEventListener("click", this.showForm);
  }
}

class Question {
  constructor(id, title, answer) {
    this.id = id;
    this.title = title;
    this.answer = answer;
  }
  render() {
    if (this.title.trim() !== "" && this.answer.trim() !== "") {
      const questionList = document.querySelector("#questions-list");
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("col-md-4");
      questionDiv.innerHTML = `<div class="card card-body flashcard my-3">
    <h4 class="text-capitalize">${this.title}?</h4>
    <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
    <h5 class="answer mb-3">${this.answer}</h5>
    <div class="flashcard-btn d-flex justify-content-between">
    
    <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${this.id}">edit</a>
    <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
    </div>
   </div>`;
      questionList.appendChild(questionDiv);
      questionDiv
        .querySelector("#delete-flashcard")
        .addEventListener("click", function (e) {
          e.preventDefault();
          questionList.removeChild(questionDiv);
          idNum--;
        });
      questionDiv.querySelector("a").addEventListener("click", function (e) {
        e.preventDefault();

        questionDiv.querySelector("h5").classList.toggle("showItem");
      });
      questionDiv
        .querySelector("#edit-flashcard")
        .addEventListener("click", function (e) {
          e.preventDefault();
        });
    } else {
      const alertMessage = document.querySelector(
        "body > div > div:nth-child(1) > div > div > div"
      );

      alertMessage.classList.add("showItem", "alert-danger");
      alertMessage.textContent = "Cannot Add Empty Values";

      window.setTimeout(function () {
        alertMessage.classList.remove("showItem", "alert-danger");
      }, 2000);
    }
  }
}

const ui = new UI(document.getElementById("show-btn"));
ui.addEventListener();
ui.saveQuastion();
