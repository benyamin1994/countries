function draw(countries) {
    DOM.main.innerHTML = "";
    for (let index = 0; index < countries.length; index++) {
        countriesDictionary[countries[index].alpha3Code] = countries[index];
        DOM.main.appendChild(CountryCard(countries[index]));
    }
}


function CountryCard(singleCountry) {
    var card = document.getElementsByName("template")[document.getElementsByName("template").length - 1].cloneNode(true);
    card.id = singleCountry.alpha3Code;
    card.style.display = "inline-block";
    card.querySelector("#img").src = singleCountry.flag;
    card.querySelector("#desc").innerHTML = singleCountry.region;
    card.querySelector("#title").innerHTML = singleCountry.name;
    card.querySelector("#collapser").attributes.getNamedItem("data-target").value = "#collapser" + card.id;
    card.querySelector("#collapseId").id = "collapser" + card.id;
    card.querySelector("#comment").id = `commentOf:${singleCountry.alpha3Code}`;
    return card;
}

function getView(ismail) {
    router[ismail]();
}


function checkUrl() {
    console.log(urls[document.getElementById("searchBy").value]);
    console.log(document.getElementById("searchCri").value);
    // call ajax function
}


function inputSearchAction() {
    if (DOM.searchValue.value) {
        ajaxFlag = false;
        setTimeout(function () {
            searchCountryOnInput();
        }, 1000)
    }
}



function getBorders(e) {
    var isExpanded = e.target.attributes.getNamedItem("aria-expanded").value;
    if (isExpanded === "false" && !(countriesDictionary[e.target.parentElement.parentElement.id].newPropBordersExist)) {
        console.log(countriesDictionary[e.target.parentElement.parentElement.id].borders);
        var currentCard = e.target.parentElement.parentElement;
        var borders = countriesDictionary[e.target.parentElement.parentElement.id].borders;
        countryContainer = currentCard.querySelector("#collapseResult");
        countryContainer.innerHTML = "";
        if (borders.length > 0) {
            borders.forEach(border => {
                getCountryByCode(border, function (countryFromCode) {
                    var img = document.createElement("IMG");
                    img.src = countryFromCode.flag;
                    img.height = 50;
                    img.width = 50;
                    img.title = countryFromCode.name;
                    img.style.margin = "5px";
                    countryContainer.appendChild(img);
                });
            });
            countriesDictionary[e.target.parentElement.parentElement.id].newPropBordersExist = true;
        }
    }
}
function getComments(e) {
    var isExpanded = e.target.attributes.getNamedItem("aria-expanded").value;
    if (isExpanded === "false") {
        var currentCard = e.target.parentElement.parentElement;
        var countryCode = countriesDictionary[currentCard.id].alpha3Code;
        var res = getCommentsService(countryCode, function (comments) {
            var containerResult = currentCard.querySelector("#collapseResult");
            comments.forEach(function (singleComment) {
                var div = document.createElement("div");
                div.innerHTML = singleComment.comment;

                containerResult.appendChild(div);
            });
        });

    }
}


function postComment(e) {
    var countryCode = countriesDictionary[e.target.parentElement.parentElement.parentElement.parentElement.id].alpha3Code;
    var comment = document.getElementById(`commentOf:${countryCode}`).value;
    post(countryCode, comment);
    var containerResult = e.target.parentElement.parentElement.querySelector("#collapseResult");
    var div = document.createElement("div");
    div.innerHTML = comment;
    containerResult.appendChild(div);
    document.getElementById(`commentOf:${countryCode}`).value = "";


}

function login() {
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    //response = user;
    loginAction(userName, password, function (response) {
        document.getElementById("nav").style.display = "inline-block";
    })


}