$(document).ready(function () {
    if ($("#lpJumbotron").length < 1) return;
    $("#loginAlert").hide();
    // This may need to be initialized after js files are separated by page
    // sessionStorage.clear();

    $("#loginSubmit").click(function () {
        $("#loginAlert").hide();
        username = $("#loginUN").val().trim();
        password = $("#loginPW").val().trim();

        var user = {
            username: username,
            password: password
        }
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: user
        }).then(function (data) {
            console.log(data);
            if (data === null) {
                $("#loginAlert").show();
            } else {
                sessionStorage.setItem("user", JSON.stringify(data));
                window.location.replace("/gamePlay");
            }
        });
    });
})

<<<<<<< HEAD


=======
>>>>>>> a9eeb0bc94aac7c28746cfc2b51b0920d34c01a0
