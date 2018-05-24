$(document).ready(function () {

    //check if correct html page
    if ($("#gpJumbotron").length < 1) return;

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
            canAttack: false,
            playerLeveled: false,
        },
        initalize: function () {

            $("#spendSkills").hide();
            $("#newSkillsUnder").hide();
            $("#newSkillsOver").hide();

            $(".combatBtn").on("click", game.getPlayerChoice)
            // modal js
            $(".endBtn").click("click", game.skillSubmit)

            //need to zero out checks
            // game.current.playerLeveled = false;
            // game.current.canAttack = false;
            game.setPlayer()
        },
        setPlayer: function () {


            game.player = JSON.parse(sessionStorage.getItem("user"));
            game.current.MaxPlayerHealth = 25 + (5 * game.player.health)
            game.current.playerHealth = game.current.MaxPlayerHealth
            $("#playerAvatar").attr("src", `/assets/${game.player.avatarID}.png`)
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
                level: game.player.level - 5,
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

                $("#opponentAvatar").attr("src", `/assets/${game.opponent.avatarID}.png`)
                $("#opponentName").text(game.opponent.username)
                $("#opponentTextHP").html(`
                    Level: ${game.opponent.level}
                    <br>Experience: ${game.opponent.experience}/100
                    <br>Strength: ${game.opponent.strength}
                    <br>Speed: ${game.opponent.speed}
                    <br>Current Health: ${game.current.opponentHealth}/${game.current.MaxOpponentHealth}`)

                game.setLoss()
                game.updateHealthDisplay()
            });
        },
        update: function (character) {
            $.ajax({
                method: "PUT",
                url: "/api/update",
                data: character
            });
        },
        setLoss: function () {
            game.player.losses++
            game.update(game.player)

            game.opponent.wins++
            game.update(game.opponent)

            game.combatLoop()
        },
        setWin: function () {
            game.player.losses--
            game.player.wins++
            game.update(game.player)

            game.opponent.wins--
            game.opponent.losses++
            game.update(game.opponent)
        },
        setTie: function () {
            game.player.losses--
            game.update(game.player)

            game.opponent.wins--
            game.update(game.opponent)

        },
        combatLoop: function () {
            game.current.canAttack = true;

        },
        getPlayerChoice: function () {
            if (game.current.canAttack) {
                game.current.canAttack = false;
                game.playerChoice = $(this).attr("id");
                game.getComputerChoice();
            }
        },
        getComputerChoice: function () {
            var choice = Math.random()
            if(game.opponent.avatarID === 1){
                //strength
                if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 75) {
                    if (choice >= .60) {
                        game.computerChoice = "heavy";
                    } else if (choice >= .50) {
                        game.computerChoice = "fast";
                    } else if (choice >= .20) {
                        game.computerChoice = "block";
                    } else {
                        game.computerChoice = "dodge"
                    }
                } else if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 50) {
                    if (choice >= .80) {
                        game.computerChoice = "heavy";
                    } else if (choice >= .60) {
                        game.computerChoice = "fast";
                    } else if (choice >= .30) {
                        game.computerChoice = "block";
                    } else {
                        game.computerChoice = "dodge"
                    }
                } else if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 25) {
                    if (choice >= .85) {
                        game.computerChoice = "heavy";
                    } else if (choice >= .65) {
                        game.computerChoice = "fast";
                    } else if (choice >= .35) {
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
            } else if(game.opponent.avatarID === 2){
                //speed
                if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 75) {
                    if (choice >= .75) {
                        game.computerChoice = "heavy";
                    } else if (choice >= .40) {
                        game.computerChoice = "fast";
                    } else if (choice >= .30) {
                        game.computerChoice = "block";
                    } else {
                        game.computerChoice = "dodge"
                    }
                } else if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 50) {
                    if (choice >= .85) {
                        game.computerChoice = "heavy";
                    } else if (choice >= .55) {
                        game.computerChoice = "fast";
                    } else if (choice >= .40) {
                        game.computerChoice = "block";
                    } else {
                        game.computerChoice = "dodge"
                    }
                } else if ((100 / game.current.MaxOpponentHealth) * game.current.opponentHealth >= 25) {
                    if (choice >= .90) {
                        game.computerChoice = "heavy";
                    } else if (choice >= .55) {
                        game.computerChoice = "fast";
                    } else if (choice >= .30) {
                        game.computerChoice = "block";
                    } else {
                        game.computerChoice = "dodge"
                    }
                } else {
                    if (choice >= .90) {
                        game.computerChoice = "heavy";
                    } else if (choice >= .70) {
                        game.computerChoice = "fast";
                    } else if (choice >= .40) {
                        game.computerChoice = "block";
                    } else {
                        game.computerChoice = "dodge"
                    }
                }
            } else {
                //health
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

            }

            game.calcDamage();
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


            if (game.current.playerHealth <= 0 || game.current.opponentHealth <= 0) {
                if (game.current.playerHealth <= 0 && game.current.opponentHealth <= 0) {
                    //PLAYER TIES
                    game.setTie()
                    $("#result").text("You Tied!")
                    game.player.experience += 25;
                    game.opponent.experience += 25;
                    game.checkIfLeveled(game.player)

                } else if (game.current.playerHealth <= 0) {
                    //PLAYER LOSES
                    game.player.experience += 25;
                    game.opponent.experience += 50;
                    game.checkIfLeveled(game.player)
                    $("#result").text("You Lose!")

                } else {
                    //PLAYER WINS
                    game.player.experience += 50;
                    game.opponent.experience += 25;
                    game.checkIfLeveled(game.player)

                    game.setWin()
                    $("#result").text("You Won!")
                }

                //updates opponent data to db and pushes opponent to already fought
                game.update(game.opponent)
                game.opponentsFought.push(game.opponent.username)

                //if Player has leveled up the skill up section will show. 
                if (game.current.playerLeveled) {
                    $("#spendSkills").show()
                    $("#labels").text(`You Leveled Up!! You have ${game.player.skill_points} Skill Points To Spend:`)
                    $("#newSkillsOver").text(`You Have ${game.player.skill_points} Skills Points - Dial It Back`)
                    $("#newSkillsUnder").text(`You Have ${game.player.skill_points} Skills Points - Use Them All`)
                }
                //show modal
                $("#resultModal").modal({ backdrop: 'static', keyboard: false })

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
        },
        checkIfLeveled: function (character) {
            if (character.experience >= 100) {
                game.current.playerLeveled = true;
                character.level++;
                character.skill_points += 3;
                character.experience -= 100;
                game.checkIfLeveled(character)
            } else {
                return;
            }
        },
        skillSubmit: function () {
            event.preventDefault();
            $("#newSkillsOver").hide();
            $("#newSkillsUnder").hide();

            var speedSkill = parseInt($("#speedSkill").val());
            var healthSkill = parseInt($("#healthSkill").val())
            var strengthSkill = parseInt($("#strengthSkill").val())

            if ((speedSkill + healthSkill + strengthSkill) > game.player.skill_points) {
                $("#newSkillsOver").show();
            } else if ((speedSkill + healthSkill + strengthSkill) < game.player.skill_points) {
                $("#newSkillsUnder").show();
            } else {
                if (game.current.playerLeveled) {
                    if(speedSkill === "null") {
                        speedSkill = 0
                    }
                    if(healthSkill === "null") {
                        healthSkill = 0
                    }
                    if(strengthSkill === "null") {
                        strengthSkill = 0
                    }

                    game.player.speed += speedSkill;
                    game.player.health += healthSkill;
                    game.player.strength += strengthSkill;
                    game.player.skill_points = 0;
                }

                sessionStorage.setItem("user", JSON.stringify(game.player))
                game.update(game.player)
                if ($(this).attr("id") === "leaveRing") {
                    sessionStorage.clear()
                    window.location.replace("/");
                } else {
                    // $("#resultModal").modal("toggle")
                    game.initalize()
                    window.location.reload()
                }
            }
        }
    }

    game.initalize()
});

