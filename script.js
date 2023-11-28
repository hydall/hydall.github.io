var firstCall = true;
function shuffleTeams() {
    var tooltip = document.querySelector('#tooltip');
    var playersInput = document.getElementById('players');
    var teams = document.querySelector(".teams");
    var team1Div = document.getElementById('team1players');
    var team2Div = document.getElementById('team2players');
    var elements = document.querySelectorAll('.teamname');
    var elements1 = document.querySelectorAll('.teamplayers');


    // Get the list of players from the input
    var players = playersInput.value.split('\n').map(player => player.trim());

    if(players.length < 2){
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
        return;
    } else tooltip.style.visibility = 'hidden'; tooltip.style.opacity = '0';

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
                console.log(Blue);
                Blue = false;
                team1Div.innerHTML = team1Div.innerHTML + '<div class="player">' + players[i] + '</div>' + '<hr class="player-divider">';
            }
            else {
                console.log(Blue);
                team2Div.innerHTML = team2Div.innerHTML + players[i] + '<hr class="player-divider">';
                Blue = true;
            
        }
        elements1.forEach(function(element) {
            element.classList.add('showing');
        });
        elements.forEach(function(element) {
            element.classList.add('showing');
        });
    } 
}
firstCall = false;
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


    // Split the players into two teams
  //  var team1 = players.slice(0, Math.ceil(players.length / 2));
  //  var team2 = players.slice(Math.ceil(players.length / 2));
//  team1 = teamWithSeparators(team1);
  //  team2 = teamWithSeparators(team2);

    // Display the teams
  //  teams.style.display = "flex";
   // team1Div.textContent = team1.join('\n');
   // team2Div.textContent = team2.join('\n');
