var firstCall = true;
let tooltipTimer;
let mouseX;
let mouseY;

function shuffleTeams(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
    var teamscontainer = document.getElementById('teamscontainer');
    var playersInput = document.getElementById('players');
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
    if(players.length < 2){ showTooltip("•    Too few players - at least three players required"); return; }
    else if(players.length > 10) { showTooltip("•    Too many players - can't shuffle more than 10 players"); return;}
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
                Blue = false;
                team1Div.innerHTML = team1Div.innerHTML + '<div class="player">' + players[i] + '</div>' + '<hr class="divider">';
            }
            else {
                team2Div.innerHTML = team2Div.innerHTML + players[i] + '<hr class="divider">';
                Blue = true;
            
        }
        teamscontainer.classList.add('showingdisplay');
        elements1.forEach(function(element) {
            element.classList.add('showing');
        });
    } 
}
firstCall = false;
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
    teamscontainer.classList.remove('showingdisplay');
    setTimeout(function(){inputt.style.display = "inline";},150);
}
