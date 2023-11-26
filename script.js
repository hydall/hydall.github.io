function shuffleTeams() {
    var playersInput = document.getElementById('players');
    var teams = document.getElementById('teams');
    var team1Div = document.getElementById('team1players');
    var team2Div = document.getElementById('team2players');

    // Get the list of players from the input
    var players = playersInput.value.split('\n').map(player => player.trim());

    // Shuffle the players
    players = shuffleArray(players);

    // Split the players into two teams
    var team1 = players.slice(0, Math.ceil(players.length / 2));
    var team2 = players.slice(Math.ceil(players.length / 2));

    // Display the teams
    teams.style.display = "flex";
    team1Div.textContent = team1.join('\n');
    team2Div.textContent = team2.join('\n');
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