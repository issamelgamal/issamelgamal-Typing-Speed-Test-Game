// array of words 
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

// levels settings
const lvls = {
    "Easy":7,
    "Normal":5,
    "Hard":3
}
let levelSelect = document.querySelector(".level-select");

// default level
let defaultLevelName = document.querySelector(".level-select").value; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// level settings Name + Seconds + Score

scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
    return false;
}
// Catch Selectors for Level Selector
// let levelSelect = document.querySelector(".level-select");
let levelSelector = document.querySelector(".level-selector");
// Start Game
startButton.onclick = function () {
    // Get Selected Level
    defaultLevelName = levelSelect.value;
    console.log(defaultLevelName)
    defaultLevelSeconds = lvls[defaultLevelName];
    console.log(defaultLevelSeconds)
    lvlNameSpan.innerHTML = defaultLevelName;
    console.log( lvlNameSpan.innerHTML)
    secondsSpan.innerHTML = defaultLevelSeconds;
    console.log(secondsSpan.innerHTML)
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    console.log(timeLeftSpan.innerHTML)
    // Update UI with Selected Level and Seconds
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML = words.length;
    levelSelector.remove()
    this.remove(); 
    input.focus(); 
    document.querySelector(".instruction").remove()
    // Generate Word Functioncvbm
    genWords();
}



function genWords(){
    // get random words from array
    let randomWord = words[Math.floor(Math.random()* words.length)]
    // get word index 
    let WordIndex = words.indexOf(randomWord);
    //remove word from array
    words.splice(WordIndex, 1);
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // empty Upcoming words
    upcomingWords.innerHTML = '';
    // generate upComing words 
    for (let i = 0; i < words.length; i++) {
        // Create Div Element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
}
function startPlay() {
    // to reset time 
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(()=>{
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML == "0"){
            clearInterval(start);
            //compare words 
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
                input.value = '';
                scoreGot.innerHTML++;
                if (words.length >0){
                    genWords()
                } else {
                    let span = document.createElement("span");
                    span.className = 'good';
                    let spanText = document.createTextNode(`Congratulations You Got  in ${defaultLevelName} Level ${scoreGot.innerHTML} of ${scoreTotal.innerHTML}`);
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    // Remove Upcoming Words Box
                    upcomingWords.remove();
                    // Remove current Word
                    theWord.remove()
                }
            }else {
                let span = document.createElement("span")
                span.className = 'bad';
                let spanText = document.createTextNode(`Game Over You Got in ${defaultLevelName} Level ${scoreGot.innerHTML} of ${scoreTotal.innerHTML}`);
                span.appendChild(spanText);
                finishMessage.appendChild(span);
                upcomingWords.remove();
                // Remove current Word
                theWord.remove()
                document.querySelector(".message").remove()
                input.remove()
            }
        }
    },1000)
}



