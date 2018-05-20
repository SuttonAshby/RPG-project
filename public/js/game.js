//No idea where this came from
// import { S_IFIFO } from "constants";


var game = {
    player: undefined,
    opponent: undefined,
    playerChoice: undefined,
    computerChoice: undefined,
    opponentsFought: [],
    current: {
        playerHealth: undefined,
        opponentHealth: undefined,
        canAttack: false
    },
    initalize: function () {
        game.setPlayer()
    },
    setPlayer: function () {
        game.player = JSON.parse(sessionStorage.getItem("user"));
        game.current.playerHealth = game.player.health
        $("#playerTextHP").text(`
        Strength: ${game.player.strength} 
        ${/n} Current Health: ${game.current.playerHealth}/${game.player.health}`)

    },
    getOpponent: function () {
        var data = {
            level: game.player.level,
            fought: game.opponentsFought
        }
        $.ajax({
            method: "get",
            url: "/api/opponent",
            data: data
        });

    },
    setLoss: function () {
        var score = {
            playerscore: --player.losses,
            opponenentscore: ++opponent.wins
        }
        $.ajax({
            method: "PUT",
            url: "/api/setScore",
            data: score
        });
    },
    combatLoop: function () {

    },
    getPlayerChoice: function () {

    },
    getComputerChoice: function () {
        var choice = Math.random()
        if ((game.current.opponentHealth / game.opponent.health) * 100 >= 75) {
            if (choice >= .75) {
                game.computerChoice = "heavy";
            } else if (choice >= .50) {
                game.computerChoice = "fast";
            } else if (choice >= .25) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else if ((game.current.opponentHealth / game.opponent.health) * 100 >= 50) {
            if (choice >= .85) {
                game.computerChoice = "heavy";
            } else if (choice >= .60) {
                game.computerChoice = "fast";
            } else if (choice >= .35) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else if ((game.current.opponentHealth / game.opponent.health) * 100 >= 25) {
            if (choice >= .90) {
                game.computerChoice = "heavy";
            } else if (choice >= .65) {
                game.computerChoice = "fast";
            } else if (choice >= .40) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else {
            if (choice >= .90) {
                game.computerChoice = "heavy";
            } else if (choice >= .80) {
                game.computerChoice = "fast";
            } else if (choice >= .40) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        }
    },
    calcDamage: function () {
        if (game.playerChoice === "block") {
            if (game.computerChoice === "block") {
                //damage dealt to player modified by choice
                game.current.playerHealth -= (game.opponent.strength * .75)
                //damage dealt to opponent modified by choice
                game.current.opponentHealth -= (game.player.strength * .75)
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= (game.opponent.speed * .50)
                game.current.opponentHealth -= (game.player.strength * .25)
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= (game.opponent.speed * .25)
                game.current.opponentHealth -= (game.player.strength * 1.25)
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= (game.opponent.strength * 1.25)
                game.current.opponentHealth -= (game.player.strength * .25)
            }
        } else if (game.playerChoice === "dodge") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= (game.opponent.strength * 25)
                game.current.opponentHealth -= (game.player.speed * .50)
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= (game.opponent.speed * .75)
                game.current.opponentHealth -= (game.player.speed * .75)
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= (game.opponent.speed * 1.25)
                game.current.opponentHealth -= (game.player.speed * .25)
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= (game.opponent.strength * .25)
                game.current.opponentHealth -= (game.player.speed * 1.25)
            }
        } else if (game.playerChoice === "fast") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= (game.opponent.strength * 1.25)
                game.current.opponentHealth -= (game.player.speed * .25)
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= (game.opponent.speed * .25)
                game.current.opponentHealth -= (game.player.speed * 1.25)
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= (game.opponent.speed * 1.25)
                game.current.opponentHealth -= (game.player.speed * 1.25)
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= (game.opponent.strength * 1.5)
                game.current.opponentHealth -= (game.player.speed * 1.5)
            }
        } else if (game.playerChoice === "heavy") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= (game.opponent.strength * .25)
                game.current.opponentHealth -= (game.player.strength * 1.25)
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= (game.opponent.speed * 1.25)
                game.current.opponentHealth -= (game.player.strength * .25)
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= (game.opponent.speed * 1.5)
                game.current.opponentHealth -= (game.player.strength * 1.5)
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= (game.opponent.strength * 1.25)
                game.current.opponentHealth -= (game.player.strength * 1.25)
            }
        }
        updateHealthDisplay()
        if (game.current.playerHealth <= 0) {

        } else {

        }
    },
    updateHealthDisplay: function () {
        //update the player and opponent health displays
        $("#playerHP").css("width", game.healthbar(game.player.health, game.current.playerHealth) + "%");
        $("#playerHP").css("background-color", game.healthbarColor(game.player.health, game.current.playerHealth));

        $("#opponentHP").css("width", game.healthbar(game.opponent.health, game.current.opponentHealth) + "%");
        $("#opponentHP").css("background-color", game.healthbarColor(game.opponent.health, game.current.opponentHealth));

    },
    healthbar: function (max, health) {
        return ((100 / max) * health)
    },
    healthbarColor: function (max, health) {
        if (health <= max / 2 && health > max / 4) {
            return "yellow"
        } else if (health <= max / 4) {
            return "red"
        }
    }

}

game.initalize()