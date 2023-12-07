var firstCall = true;
let tooltipTimer;
let mouseX;
let mouseY;
var currentMode;
var quick;
var ranked;
var ultimate;
var tournament;
var teamscontainer;
var isExecuting;
var playersInput;
document.addEventListener('DOMContentLoaded', function () {
    quick = document.querySelector('#quickcontainer');
    ranked = document.getElementById('rankedcontainer');
    ultimate = document.getElementById('ultimatecontainer');
    tournament = document.getElementById('tournamentcontainer');
    teamscontainer = document.getElementById('teamscontainer');
    playersInput = document.getElementById('players');
    playersInput.focus();
    currentMode = quick;
    document.addEventListener('keydown', HandleKeyDown.bind(null));
});

function shuffleTeams(event){
    if(isExecuting) return;
    isExecuting = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
    var team1Div = document.getElementById('team1players');
    var team2Div = document.getElementById('team2players');
    var inputt = document.getElementById('inputt');
    var elements1 = document.querySelectorAll('.teamplayers');
    

    // Get the list of players from the input
    var players = playersInput.value.split('\n').map(player => player.trim());
    // Remove any blank entries
    for (var i = players.length - 1; i > -1; i--) {
        if(players[i]=="") players.splice(i, 1);
        }
 

    // Show tooltip depending on amount of inputed players
    if(players.length < 3) {
        showTooltip("•    Too few players - at least three players required"); return;
    }
    else if(players.length > 10) {
        showTooltip("•    Too many players - can't shuffle more than 10 players"); return;
    }
    inputt.style.display = "none";
   

    // Shuffle the players
    players = shuffleArray(players);
    if(firstCall == false) {
        elements1.forEach(function(element) {
            element.classList.remove('showing');
        });
        setTimeout(showTeams,150);
    } else showTeams();


    function showTeams() {
        team1Div.textContent = "";
        team2Div.textContent = "";

        var Blue = true;
        for (var i = players.length - 1; i > -1; i--) {
            if(Blue == true){
                players[i] = colorizeHash(players[i], Blue);
                Blue = false;
                team1Div.innerHTML += '<div class="player">' + players[i] + '</div>' + '<hr class="divider">';
            }
            else {
                players[i] = colorizeHash(players[i], Blue);
                team2Div.innerHTML += '<div class="player">' + players[i] + '</div>' + '<hr class="divider">';
                Blue = true;
        }

        teamscontainer.classList.add('showingdisplayflex');

        elements1.forEach(function(element) {
            element.classList.add('showing');
        });
    } 
}
firstCall = false;
isExecuting = false;
}

function changeMode(mode){
    console.log(currentMode);
    if(currentMode==mode) return;
    currentMode.classList.add('hiding');
    setTimeout(function(){
        switch (mode) {
            case quick:
                currentMode=quick;
                console.log(currentMode);
                currentMode.classList.remove('hiding');
                break;
            case ranked:
                currentMode=ranked;
                console.log(currentMode);
                currentMode.classList.remove('hiding');
                break;
            case ultimate:
                currentMode=ultimate;
                console.log(currentMode);
                currentMode.classList.remove('hiding');
                break;
            case tournament:
                currentMode=tournament;
                console.log(currentMode);
                currentMode.classList.remove('hiding');
                break;
            default:
                break;
        }
    },150);
    
}

function HandleKeyDown(event){
    switch (currentMode) {
        case quick:
            action = shuffleTeams;
            break;
    
        default:
            break;
    }
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent the default behavior
        action(event);
} else if (event.key === "Enter" && event.shiftKey && inputt.style.display=="none"){
        showInput();
}
}

function showTooltip(message){
    clearTimeout(tooltipTimer);
        tooltip.style.left = mouseX + 'px';
        tooltip.style.top = mouseY + 'px';
        tooltip.textContent = message;
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
        tooltipTimer = setTimeout(function () {
        tooltip.style.visibility = 'hidden'; tooltip.style.opacity = '0';
          }, 2000);
    return;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function showInput() {
    teamscontainer.classList.remove('showingdisplayflex');
    setTimeout(function(){inputt.style.display = "flex";playersInput.focus();},150);
}

function colorizeHash(str, team) {
    const parts = str.split('#');
    let result = parts[0];
    
    for (let i = 1; i < parts.length; i++) {
        const hashtag = parts[i].split(' ')[0]; // Get the hashtag and the text after it
        const restOfText = parts[i].substring(hashtag.length); // Get the remaining text

        // Apply styling to the hashtag and the text after it
        if(team) result += ` <span class="blueplayer">#${hashtag}</span>${restOfText}`;
        else result += ` <span class="redplayer">#${hashtag}</span>${restOfText}`;
    }

    return result;
}