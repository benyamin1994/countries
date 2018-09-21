var config = function () {

    return {
        baseUrl: "https://restcountries.eu/rest/v2/",
        allCountries: "all",
        byName: "name/",
        byCurr: "currency/",
        byCode: "alpha/",
        serverUrl: "http://localhost/countriesvgal/",
        server: "api/",
        templates: "templates/",
        loginUrl: "login/login.php",
        postUrl: "post/post.php"


    }
}();
countriesDictionary = {};

var DOM = function () {

    return {
        main: document.getElementById("main"),
        mainSearch: document.getElementById("mainSearch"),
        searchValue: {}
    }
}();

var ajaxFlag = true;
var urls = {};
urls["byName"] = config.baseUrl + config.byName;
urls["byCurr"] = config.baseUrl + config.byCurr;

var router = {};
router.home = function () {
    DOM.mainSearch.innerHTML = "";

    getCountires();
}
router.search = function () {
    getTemplate("search");

}

router.searchOnInput = function () {

    getTemplate("searchOnInput");

}

router.login = function () {
    getTemplate("login");

}

router.about = function () {

    DOM.main.innerHTML = "About";
}




