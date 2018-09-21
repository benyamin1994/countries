
function getCountires() {
    $.ajax({
        method: "GET",
        url: config.baseUrl + config.allCountries,
        success: function (response) {
            draw(response);
        },
        error: function (error) {
            console.log(error)
        }
    })
}


function getTemplate(param) {
    $.ajax({
        method: "GET",
        url: config.serverUrl + config.templates + param + ".html",
        success: function (response) {
            DOM.mainSearch.innerHTML = response;
            DOM.searchValue = document.getElementById("searchCri");
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function searchCountryOnInput() {
    $.ajax({
        method: "GET",
        url: config.baseUrl + config.byName + DOM.searchValue.value,
        success: function (response) {
            draw(response);
            ajaxFlag = true;
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function getCountryByCode(code, callback) {
    $.ajax({
        method: "GET",
        url: config.baseUrl + config.byCode + code,
        success: function (response) {
            callback(response);
        },
        error: function (error) {
            console.log(error)
        }
    })
}



function loginAction(userName, password, callback) {
    $.ajax({
        method: "POST",
        url: config.serverUrl + config.server + config.loginUrl,
        data: { userName, password },
        success: function (response) {
            callback(response);
            router.home();
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function isLoggedIn() {
    $.ajax({
        method: "GET",
        url: config.serverUrl + config.server + config.loginUrl,
        success: function (response) {
            console.log(response);
            document.getElementById("nav").style.display = "inline-block";
        },
        error: function (error) {
            console.log(error)
            router.login();
        }
    })
}

function post(countryCode, comment) {
    $.ajax({
        method: "POST",
        url: config.serverUrl + config.server + config.postUrl,
        data: { countryCode, comment },
        success: function (response) {
            console.log((response));

        },
        error: function (error) {
            console.log(error)

        }
    })
}


function getCommentsService(countryCode, callback) {
    $.ajax({
        method: "GET",
        url: config.serverUrl + config.server + config.postUrl,
        data: { countryCode },
        success: function (response) {
            console.log(response);
            callback(JSON.parse(response));




        },
        error: function (error) {
            console.log(error)

        }
    })

}