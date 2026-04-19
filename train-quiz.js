const quizSets = {
  "New York City": [
    {
      question: "Which station has a view of the NYC skyltine ",
      options: ["Queensboro Plaza", "Brooklyn Plaza", "Coney Island"],
      answer: "Queensboro Plaza"
    },
    {
      question: "Which NYC photo was taken in 2023?",
      options: ["125th Street Station", "Queensboro Plaza", "Holiday Train"],
      answer: "125th Street Station"
    },
    {
      question: "What color was the first two cars of the holiday train",
      options: ["Blue", "Red", "Green"],
      answer: "Red"
    },
    {
      question: "Where can you take the brighton line train too",
      options: [
        "The Zoo",
        "The Airport",
        "The Beach"
      ],
      answer: "The Beach"
    }
  ],

  "London": [
    {
      question: "What is the Class Number of the train in the video",
      options: ["Class 707", "Class 705", "Class 700"],
      answer: "Class 700"
    },
    {
      question: "What station was the Underground photo? at",
      options: ["Paddington", "Kings Cross", "Euston"],
      answer: "Paddington"
    },
    {
      question: "What is the nickname class 465",
      options: ["Lemon", "Networker", "Metroliner"],
      answer: "Networker"
    },
    {
      question: "What is the name of the operator of the freight train",
      options: ["Freightliner", "Freighertrain", "Royal Freight"],
      answer: "Freightliner"
    }
  ],

  "Rome": [
    {
      question: "What color is the high speed train",
      options: ["Blue", "Red", "Grey"],
      answer: "Red"
    },
    {
      question: "Where did I go on the Rome Metro Train",
      options: ["Colosseum", "The Vactian", "St. Peter's Basilica"],
      answer: "Colosseum"
    },
    {
      question: "How many years has rome had street cars",
      options: [
        "130 Years",
        "127 Years",
        "125 Years"
      ],
      answer: "125 Years"
    },
    {
      question: "What was the name of the railway station in the last photo",
      options: [
        "Roma San Pietro",
        "Roma Santa Maria Novella",
        "Roma Termni"
      ],
      answer: "Roma San Pietro"
    }
  ]
};

if (document.getElementById("startForm")) {
  document.getElementById("startForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const playerName = document.getElementById("playerName").value.trim();
    const favoriteCity = document.getElementById("favoriteCity").value;
    const errorMessage = document.getElementById("errorMessage");

    if (playerName.length < 2) {
      errorMessage.textContent = "Please enter a name with at least 2 characters.";
      return;
    }

    if (favoriteCity === "") {
      errorMessage.textContent = "Please choose your favorite city.";
      return;
    }

    errorMessage.textContent = "";

    localStorage.setItem("playerName", playerName);
    localStorage.setItem("favoriteCity", favoriteCity);

    window.location.href = "quiz.html";
  });
}

let currentQuestion = 0;
let score = 0;
let questions = [];

if (document.getElementById("quizContainer")) {
  const playerName = localStorage.getItem("playerName") || "Guest";
  const favoriteCity = localStorage.getItem("favoriteCity");

  if (!favoriteCity) {
    window.location.href = "quiz-start.html";
  } else {
    questions = quizSets[favoriteCity];

    const welcomeMessage = document.getElementById("welcomeMessage");
    const questionText = document.getElementById("questionText");
    const answerButtons = document.getElementById("answerButtons");
    const feedback = document.getElementById("feedback");
    const nextButton = document.getElementById("nextButton");
    const scoreText = document.getElementById("scoreText");
    const resultBox = document.getElementById("resultBox");
    const finalMessage = document.getElementById("finalMessage");
    const leaderboardList = document.getElementById("leaderboardList");
    const resetBtn = document.getElementById("resetScoresBtn");

    welcomeMessage.textContent = playerName + ", you chose the " + favoriteCity + " quiz!";

    function showQuestion() {
      const question = questions[currentQuestion];
      questionText.textContent = question.question;
      answerButtons.innerHTML = "";
      feedback.textContent = "";
      nextButton.style.display = "none";

      question.options.forEach(function (option) {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("quiz-btn");
        button.addEventListener("click", function () {
          checkAnswer(option);
        });
        answerButtons.appendChild(button);
      });

      scoreText.textContent = "Score: " + score;
    }

    function checkAnswer(selectedOption) {
      const correctAnswer = questions[currentQuestion].answer;
      const buttons = answerButtons.querySelectorAll("button");

      buttons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
          button.classList.add("correct");
        }

        if (button.textContent === selectedOption && selectedOption !== correctAnswer) {
          button.classList.add("wrong");
        }
      });

      if (selectedOption === correctAnswer) {
        score++;
        feedback.textContent = "Correct!";
      } else {
        feedback.textContent = "Wrong! The correct answer was " + correctAnswer + ".";
      }

      scoreText.textContent = "Score: " + score;
      nextButton.style.display = "inline-block";
    }

    nextButton.addEventListener("click", function () {
      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResults();
      }
    });

    function showResults() {
      document.getElementById("quizContainer").style.display = "none";
      resultBox.style.display = "block";

      let message = "";

      if (score === questions.length) {
        message = "Wow! You got every question right. You did a great job paying attention. If you ever go to " +
          favoriteCity +
          ", I hope you recognize the locations from this website!";
      } else {
        message = "You didn’t get a perfect score. I recommend going back and reviewing the " +
          favoriteCity +
          " page to see what you may have missed!";
      }

      finalMessage.textContent =
        playerName + ", you scored " + score + " out of " +
        questions.length + " on the " + favoriteCity + " quiz. " + message;

      saveScore(playerName, favoriteCity, score);
      displayLeaderboard();
    }

    function saveScore(name, city, playerScore) {
      let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

      leaderboard.push({
        name: name,
        city: city,
        score: playerScore
      });

      leaderboard.sort(function (a, b) {
        return b.score - a.score;
      });

      leaderboard = leaderboard.slice(0, 10);

      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }

    function displayLeaderboard() {
      let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      leaderboardList.innerHTML = "";

      leaderboard.forEach(function (entry) {
        const li = document.createElement("li");
        li.textContent = entry.name + " - " + entry.city + " - " + entry.score;
        leaderboardList.appendChild(li);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to reset all scores?")) {
          localStorage.removeItem("leaderboard");
          displayLeaderboard();
        }
      });
    }

    showQuestion();
  }
}