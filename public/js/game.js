//No idea where this came from
// import { S_IFIFO } from "constants";


var game = {
    player: undefined,
    opponent: undefined,
    playerChoice: undefined,
    computerChoice: undefined,
    opponentsFought: [],
    current: {
        maxPlayerHealth: undefined,
        playerHealth: undefined,
        maxOpponentHealth: undefined,
        opponentHealth: undefined,
        canAttack: false
    },
    initalize: function () {

        $(".combatBtn").on("click", game.getPlayerChoice)


        game.setPlayer()
    },
    setPlayer: function () {

        game.player = JSON.parse(sessionStorage.getItem("user"));
        game.current.MaxPlayerHealth = 25 + (5 * game.player.health)
        game.current.playerHealth = game.current.MaxPlayerHealth
        $("#playerName").text(game.player.username)
        $("#playerTextHP").html(`
        Level: ${game.player.level}
        <br>Experience: ${game.player.experience}/100
        <br>Strength: ${game.player.strength}
        <br>Speed: ${game.player.speed}
        <br>Current Health: ${game.current.playerHealth}/${game.current.MaxPlayerHealth}`)

        game.getOpponent()

    },
    getOpponent: function () {
        var data = {
            player: game.player.username,
            level: game.player.level,
            fought: game.opponentsFought
        }
        $.ajax({
            method: "post",
            url: "/api/opponent",
            data: data
        }).then(function (data) {
            game.opponent = data;
            game.current.MaxOpponentHealth = 25 + (5 * game.opponent.health)
            game.current.opponentHealth = game.current.MaxOpponentHealth

            $("#opponentName").text(game.opponent.username)
            $("#opponentTextHP").html(`
            Level: ${game.opponent.level}
            <br>Experience: ${game.opponent.experience}/100
            <br>Strength: ${game.opponent.strength}
            <br>Speed: ${game.opponent.speed}
            <br>Current Health: ${game.current.opponentHealth}/${game.current.MaxOpponentHealth}`)

            game.setLoss()
        });
    },
    setScore: function (character) {
        $.ajax({
            method: "PUT",
            url: "/api/update",
            data: character
        });
    },
    setLoss: function () {
        game.player.losses++
        game.setScore(game.player)

        game.opponent.wins++
        game.setScore(game.opponent)

        game.combatLoop()
    },
    combatLoop: function () {
        game.current.canAttack = true;

    },
    getPlayerChoice: function () {
        // console.log("getting player choice")
        if (game.current.canAttack) {
            game.current.canAttack = false;
            game.playerChoice = $(this).attr("id");
            game.getComputerChoice();
            game.calcDamage();
            console.log("player: " + game.playerChoice)
            console.log("computer: " + game.computerChoice)
        }
    },
    getComputerChoice: function () {
        var choice = Math.random()
        if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 75) {
            if (choice >= .75) {
                game.computerChoice = "heavy";
            } else if (choice >= .50) {
                game.computerChoice = "fast";
            } else if (choice >= .25) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 50) {
            if (choice >= .85) {
                game.computerChoice = "heavy";
            } else if (choice >= .60) {
                game.computerChoice = "fast";
            } else if (choice >= .35) {
                game.computerChoice = "block";
            } else {
                game.computerChoice = "dodge"
            }
        } else if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 25) {
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
                game.current.playerHealth -= Math.ceil((game.opponent.strength * .75))
                //damage dealt to opponent modified by choice
                game.current.opponentHealth -= Math.ceil((game.player.strength * .75))
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * .50))
                game.current.opponentHealth -= Math.ceil((game.player.strength * .25))
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * .25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * 1.25))
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * .25))
            }
        } else if (game.playerChoice === "dodge") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * .25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * .50))
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * .75))
                game.current.opponentHealth -= Math.ceil((game.player.speed * .75))
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * .25))
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * .25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * 1.25))
            }
        } else if (game.playerChoice === "fast") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * .25))
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * .25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * 1.25))
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.speed * 1.25))
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * 1.5))
                game.current.opponentHealth -= Math.ceil((game.player.speed * 1.5))
            }
        } else if (game.playerChoice === "heavy") {
            if (game.computerChoice === "block") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * .25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * 1.25))
            } else if (game.computerChoice === "dodge") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * .25))
            } else if (game.computerChoice === "fast") {
                game.current.playerHealth -= Math.ceil((game.opponent.speed * 1.5))
                game.current.opponentHealth -= Math.ceil((game.player.strength * 1.5))
            } else if (game.computerChoice === "heavy") {
                game.current.playerHealth -= Math.ceil((game.opponent.strength * 1.25))
                game.current.opponentHealth -= Math.ceil((game.player.strength * 1.25))
            }
        }
        game.updateHealthDisplay()
        if (game.current.playerHealth <= 0) {

        } else {
            game.current.canAttack = true;
        }
    },
    updateHealthDisplay: function () {
        //update the player and opponent health displays
        $("#playerHP").css("width", game.healthbar(game.current.MaxPlayerHealth, game.current.playerHealth) + "%");
        $("#playerHP").css("background-color", game.healthbarColor(game.current.MaxPlayerHealth, game.current.playerHealth));
        $("#playerTextHP").html(`
        Level: ${game.player.level}
        <br>Experience: ${game.player.experience}/100
        <br>Strength: ${game.player.strength}
        <br>Speed: ${game.player.speed}
        <br>Current Health: ${game.current.playerHealth}/${game.current.MaxPlayerHealth}`)


        $("#opponentHP").css("width", game.healthbar(game.current.MaxOpponentHealth, game.current.opponentHealth) + "%");
        $("#opponentHP").css("background-color", game.healthbarColor(game.current.MaxOpponentHealth, game.current.opponentHealth));
        $("#opponentTextHP").html(`
        Level: ${game.opponent.level}
        <br>Experience: ${game.opponent.experience}/100
        <br>Strength: ${game.opponent.strength}
        <br>Speed: ${game.opponent.speed}
        <br>Current Health: ${game.current.opponentHealth}/${game.current.MaxOpponentHealth}`)

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