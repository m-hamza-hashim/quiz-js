// data
var questions = [
  {
    question: "Which HTML tag is used to create a hyperlink?",
    option1: "&lt;link&gt;",
    option2: "&lt;a&gt;",
    option3: "&lt;href&gt;",
    option4: "&lt;hyperlink&gt;",
    answer: "<a>",
  },
  {
    question: "Which attribute specifies the URL of the page the link goes to?",
    option1: "href",
    option2: "src",
    option3: "url",
    option4: "link",
    answer: "href",
  },
  {
    question: "Which input type is used to create a checkbox in HTML?",
    option1: "checkbox",
    option2: "check",
    option3: "input",
    option4: "box",
    answer: "checkbox",
  },
  {
    question:
      "Which HTML5 element is used to define content aside from the page content, such as a sidebar?",
    option1: "&lt;aside&gt",
    option2: "&lt;section&gt",
    option3: "&lt;nav&gt",
    option4: "&lt;article&gt",
    answer: "<aside>",
  },
  {
    question: "Which HTML tag is used to create an unordered list?",
    option1: "&lt;ol&gt",
    option2: "&lt;li&gt",
    option3: "&lt;ul&gt",
    option4: "&lt;list&gt",
    answer: "<ul>",
  },
];

// questions and btn
var question = document.getElementsByClassName("question")[0];
var options = document.getElementsByClassName("options")[0];
var btn = document.getElementsByClassName("btn")[0];
var opt1, opt2, opt3, opt4, answer;
var quesNo = 0;

function nextQuestion(no) {
  question.innerHTML = questions[no].question;
  options.innerHTML = `<div>
<div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="${questions[no].option1}"/>
    <label class="form-check-label" for="flexRadioDefault1"> ${questions[no].option1} </label>
  </div>
  
  <!-- Default checked radio -->
  <div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="${questions[no].option2}"/>
    <label class="form-check-label" for="flexRadioDefault2"> ${questions[no].option2} </label>
  </div>
  <!-- Default radio -->
<div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="${questions[no].option3}"/>
    <label class="form-check-label" for="flexRadioDefault1"> ${questions[no].option3} </label>
  </div>
  
  <!-- Default checked radio -->
  <div class="form-check"> 
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="${questions[no].option4}" />
    <label class="form-check-label" for="flexRadioDefault2"> ${questions[no].option4} </label>
  </div></div>`;

  btn.setAttribute("disabled", "true");

  opt1 = document.getElementById("flexRadioDefault1");
  opt2 = document.getElementById("flexRadioDefault2");
  opt3 = document.getElementById("flexRadioDefault3");
  opt4 = document.getElementById("flexRadioDefault4");

  opt1.addEventListener("click", function () {
    btn.removeAttribute("disabled");
    answer = opt1.value;
  });
  opt2.addEventListener("click", function () {
    btn.removeAttribute("disabled");
    answer = opt2.value;
  });

  opt3.addEventListener("click", function () {
    btn.removeAttribute("disabled");
    answer = opt3.value;
  });
  opt4.addEventListener("click", function () {
    btn.removeAttribute("disabled");
    answer = opt4.value;
  });
}

nextQuestion(quesNo);

var score = 0;
var attempted = false;

btn.addEventListener("click", function () {
 if (answer === questions[quesNo].answer) {
  score++;
 }

  if (opt1.checked || opt2.checked || opt3.checked || opt4.checked) {
    if (quesNo < questions.length - 1) {
    nextQuestion(++quesNo);
    if (quesNo === 4) {
      btn.innerHTML = "submit";
    }
  } else {
    attempted = true;
    Swal.fire({
      title: "On Time!",
      icon: "success",
      text: `You scored ${score} out of 5`,
    })
  }
}});

// timer
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  var interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

if (attempted || --timer < 0) {
clearInterval(interval);
}
    if (timer < 0 && !attempted) {
      Swal.fire({
        title: "Time up!",
        icon: "warning",
        text: `You scored ${score} out of 5`,
        confirmButtonText: "Restart",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          timer = duration; 
          startTimer(duration, display); 
          quesNo = 0;
          score = 0;
          nextQuestion(0);
        }
      });
    }
  }, 1000);
}

var fiveMinutes = 60 * 1,
  display = document.querySelector("#time");
startTimer(fiveMinutes, display);




