  // window.addEventListener("load", init);
//globals
const CORRECTSOUND = new Audio("../sound/sound_correct.mp3")
const INCORRECTSOUND = new Audio("../sound/sound_incorrect.mp3")
const levels = {
    easy: 15,
    medium: 10,
    hard: 5,
  };
  const uLevel = localStorage.getItem('selectedLevel');
  var currentLevel = 0;
  switch(uLevel){
    case "easy":
      currentLevel = levels.easy;
      break;
    case "medium":
       currentLevel = levels.medium;
      break;
    default:
       currentLevel = levels.hard;
      break;
  }
  let time = currentLevel;
  let score = 0;
  let isPlaying;
  
  //DOM elements
  const wordInput = document.querySelector("#word-input");
  const currentWord = document.querySelector("#current-word");
  const scoreDispaly = document.querySelector("#score");
  const timeDisplay = document.querySelector("#time");
  const message = document.querySelector("#messages");
  const seconds = document.querySelector("#seconds");
  const level = document.querySelector("#level");
  const bar = document.querySelector("#progress-bar");
  // const restart_btn = document.querySelector("#restart");

  // const restart = document.querySelector("#restart");
  
  // word array
  function play(e) {
    // restart_btn.classList.add("hidden");
    wordInput.focus()
    init(e);
  }


  
  //Initialize Game
  function init(e) {
    seconds.innerHTML = currentLevel;
    level.innerHTML = uLevel.toUpperCase();
    //load word from array
    
    showWords(e);
    
    //call countdowm every second
    setInterval(countdown, 1000);
    
    // start matching word input
    wordInput.addEventListener("input", startMatch);
    //checking status of the game
    setInterval(checkStatus, 50);
    
  }
  
  function startMatch() {
    if (matchWords()) {
      isplaying = true;
      time = currentLevel + 1;
      showWords(words);
      wordInput.value = "";
      score++;
    }
    if (score === -1) {
      scoreDispaly.innerHTML = 0;
    } else {
      scoreDispaly.innerHTML = score;
    }
  }
  
  // match current word with word input
  function matchWords() {
    let text = wordInput.value;
    if (text.toLowerCase() === currentWord.innerHTML.toLowerCase()) {
      message.innerHTML = "CORRECT !";
      message.style.color = "#0f0"
      CORRECTSOUND.play()
      return true;
    } else {
      message.innerHTML = "";
      return false;
    }
  }
  function showWords(words) {
    //generate random index for word
    const randomIndex = Math.floor(Math.random() * words.length);
    //get random word by index
    currentWord.innerHTML = words[randomIndex];
  }
  //creating the countdown function
  function countdown() {
    if (time > 0) {
      time--; //descrease time by one
    } else if (time === 0) {
      isplaying = false;
    }
    progressbar(time)
  }
  
  function checkStatus() {
    if (!isPlaying && time === 0) {
      
      message.innerHTML = "Game Over!";
      message.style.color = "#f00";
      INCORRECTSOUND.play()
      // restart.style.display = "block"
      score = -1;
    }
  }
  
  progressbar = (e) =>{
    let widthValue = (e /currentLevel)*100
    document.getElementById("time").innerHTML = e;
    bar.style.width = widthValue+"%";
    if(widthValue == 0)
    {
      document.getElementById("mother-bar").style.border = "0.25rem #f00 solid"
      // bar.innerText = "Game Over!"
    }else{
      document.getElementById("mother-bar").style.border = "0.25rem #00f solid"
    }
  }

  // quit game
quit = () =>{
    if(confirm("Click 'OK' to quit game."))
      goto('index')
}
goto = (e) =>{
  window.location.assign(e+'.html')
}


if(document.readyState === 'ready' || document.readyState === 'complete') {
  play(words)
} else {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      play(words)
    }
  }
}