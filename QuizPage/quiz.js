let questions = []; // Global Array of Objects (each Object representing a Question)
let stats = {
  questionsAsked: 0,
  correct: 0,
  correctStreak: 0,
  currentTime: null,
  averageResponseTime: 0
}; // Global stats Object

const questionArray = [
  {
    question: `Why would a hacker use a proxy server?
    a. To create a stronger connection with the target.
    b. To create a ghost server on the network.
    c. To obtain a remote access connection.
    d. To hide malicious activity on the network.\n`,
    answer: "d",
  },
  {
    question: `What is the purpose of a Denial of Service attack?
    a. Exploit a weakness in the TCP/IP stack
    b. To execute a Trojan on a system
    c. To overload a system so it is no longer operational
    d. To shut down services by turning them off\n`,
    answer: "c",
  },
  {
    question: `If you fall for a phishing scam, what should you do to limit the damage? 
    a. Delete the phishing email. 
    b. Unplug the computer. This will get rid of any malware. 
    c. Change any compromised passwords.\n`,
    answer: "c",
  },
  {
    question: `What is the process of verifying the identity of a user?
    a. Authentication
    b. Identification
    c. Validation
    d. Verification\n`,
    answer: "a",
  },
  {
    question: `What does the “https://” at the beginning of a URL denote, as opposed to "http://" (without the “s”)?
    a. That the site has special high definition
    b. That information entered into the site is encrypted
    c. That the site is the newest version available
    d. That the site is not accessible to certain computers\n`,
    answer: "b",
  },
  {
    question: `Which of the following is an example of a “phishing” attack?
    a. Sending someone an email that contains a malicious link that is disguised to look like an email from someone the person knows
    b. Creating a fake website that looks nearly identical to a real website to trick users into entering their login information
    c. Sending someone a text message that contains a malicious link that is disguised to look like a notification that the person has won a contest
    d. All of the above\n`,
    answer: "d",
  },
  {
    question: `A group of computers that is networked together and used by hackers to steal information is called a …
    a. Botnet
    b. Rootkit
    c. DDoS
    d. Operating system\n`,
    answer: "a",
  },
  {
    question: `Criminals access someone’s computer and encrypt the user’s personal files and data. The user is unable to access this data unless they pay the criminals to decrypt the files. This practice is called …
    a. Botnet
    b. Ransomware
    c. Driving
    d. Spam\n`,
    answer: "b",
  },
  {
    question: `If a public Wi-Fi network (such as in an airport or café) requires a password to access, is it generally safe to use that network for sensitive activities such as online banking?
    a. Yes, it is safe
    b. No, it is not safe
    c. Not sure\n`,
    answer: "b",
  },
  {
    question: `What kind of cybersecurity risks can be minimized by using a Virtual Private Network (VPN)?
    a. Use of insecure Wi-Fi networks
    b. Key-logging
    c. De-anonymization by network operators
    d. Phishing attacks\n`,
    answer: "a",
  },
];

initiateGame(questions, stats);

// Event Handlers

// Handle click events
document.addEventListener("click", function (event) {
  // This way of handling is useful for dynamically created elements
  if (event.target.classList.contains("quiz-ans-btn")) {
    // Handle ".quiz-ans-btn" click
    Array.from(document.querySelectorAll(".quiz-ans-btn")).forEach(btn => (btn.disabled = true)); // Disable buttons
    event.target.blur();
    const choice = Number(event.target.id.split("-")[2]);
    const responseTime = round((new Date() - stats.currentTime) / 1000, 2);
    stats.averageResponseTime = round(
      (stats.averageResponseTime * (stats.questionsAsked - 1) + responseTime) / stats.questionsAsked,
      2
    );
    if (questions[0].answers[choice].isCorrect) {
      event.target.classList.add("pulse", "correct");
      stats.correct++;
      stats.correctStreak++;
      setTimeout(() => {
        nextQuestion(questions);
      }, 1250);
    } else {
      event.target.classList.add("shake", "incorrect");
      stats.correctStreak = 0;
      setTimeout(() => {
        const correctAnswerId = "quiz-ans-" + questions[0].answers.findIndex(elem => elem.isCorrect);
        document.querySelector("#" + correctAnswerId).classList.add("correct");
        setTimeout(() => {
          nextQuestion(questions);
        }, 1500);
      }, 750);
    }
    displayStats(stats);
  }
});

// Handle "quiz-play-again-btn" Click (Not a dynamically created element => No need to handle it the same way as ".quiz-ans-btn")
document.querySelector("#quiz-play-again-btn").addEventListener("click", function () {
  document.querySelector("#quiz-play-again-btn").classList.remove("infinite", "pulse");
  document.querySelector("#quiz-play-again-btn").classList.add("flipOutX");
  setTimeout(() => {
    document.querySelector("#quiz-play-again-btn").classList.remove("flipOutX");
    document.querySelector("#quiz-play-again").style.display = "none";
    questions = [];
    stats = { questionsAsked: 0, correct: 0, correctStreak: 0, currentTime: null, averageResponseTime: 0 };
    displayStats(stats);
    initiateGame(questions, stats);
  }, 750);
});

// Auxiliary Functions

// Initiate New Game
function initiateGame(questions, stats) {
  for (let i = 0; i < questionArray.length; i++) {
    questions.push({
      category: "", // You can fill in appropriate values here or leave them empty
      difficulty: "",
      type: "",
      question: questionArray[i].question,
      answers: createAnswersArray(questionArray[i].answer),
    });
  }
  displayQuestion(questions[0]);
}

// ...

// Manipulate API Data structure and return an Answers Array 
function createAnswersArray(correct_answer) {
  const options = ['a', 'b', 'c', 'd'];
  const shuffledOptions = shuffle(options); // Shuffle the options to randomize their order

  const answersArray = shuffledOptions.map(option => ({
    answer: questionArray.find(q => q.answer === option).answer,
    isCorrect: correct_answer === option
  }));

  return answersArray;
}

// Shuffle function to randomize the order of options
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

// ...


// Display Question
function displayQuestion(questionObject) {
  document.querySelector("#quiz-question").innerHTML = questionObject.question;
  document.querySelector("#quiz-question").classList.remove("zoomOut");
  document.querySelector("#quiz-question").classList.add("zoomIn");
  setTimeout(() => {
    document.querySelector("#quiz-question").classList.remove("zoomIn");
    stats.questionsAsked++;
    stats.currentTime = new Date();
  }, 1000);
  for (let i = 0; i < questionObject.answers.length; i++) {
    let button = document.createElement("button");
    button.disabled = true;
    button.id = "quiz-ans-" + i;
    button.classList.add("btn", "quiz-ans-btn", "animated", i % 2 === 0 ? "fadeInLeft" : "fadeInRight");
    button.innerHTML = questionObject.answers[i].answer;
    document.querySelector("#quiz-options").appendChild(button);
    setTimeout(() => {
      button.disabled = false;
      button.classList.remove(i % 2 === 0 ? "fadeInLeft" : "fadeInRight");
    }, 1200);
  }
}

// Remove current question and display next one
function nextQuestion(questions) {
  document.querySelector("#quiz-question").classList.add("zoomOut");
  for (let i = 0; i < questions[0].answers.length; i++) {
    document.querySelector("#quiz-ans-" + i).classList.add(i % 2 === 0 ? "fadeOutLeft" : "fadeOutRight");
  }
  setTimeout(() => {
    const quizOptions = document.querySelector("#quiz-options");
    while (quizOptions.firstChild) {
      quizOptions.removeChild(quizOptions.firstChild);
    }
    if (questions.length > 1) {
      questions.shift();
      displayQuestion(questions[0]);
    } else {
      document.querySelector("#quiz-play-again").style.display = "block";
      document.querySelector("#quiz-play-again-btn").classList.add("flipInX");
      setTimeout(() => {
        document.querySelector("#quiz-play-again-btn").classList.remove("flipInX");
        document.querySelector("#quiz-play-again-btn").classList.add("infinite", "pulse");
      }, 1000);
    }
  }, 1000);
}

// Display Stats
function displayStats(stats) {
  document.querySelectorAll("#quiz-stats>div>span").forEach(el => el.classList.add("fadeOut"));
  setTimeout(() => {
    document.querySelector("#rate-span").innerHTML = stats.correct + "/" + stats.questionsAsked;
    document.querySelector("#streak-span").innerHTML = stats.correctStreak;
    document.querySelector("#response-time-span").innerHTML = stats.averageResponseTime;
    document.querySelectorAll("#quiz-stats>div>span").forEach(el => {
      el.classList.remove("fadeOut");
      el.classList.add("fadeIn");
    });
    setTimeout(() => {
      document.querySelectorAll("#quiz-stats>div>span").forEach(el => el.classList.remove("fadeIn"));
    }, 375);
  }, 375);
}

// Auxiliary Rounding Function
function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
} // Note: decimals>=0, Example: round(1.005, 2); -> 1.01
