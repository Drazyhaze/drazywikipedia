import $ from 'jquery'

var randomUrl = "https://en.wikipedia.org/wiki/Special:Random";
var wikiApi = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&profile=fuzzy&callback=?&search=;"
var urls = [];

$("document").ready(function() {
    $("#searchbox").keypress(function(e) {
        if (e.keyCode === 13) search(this.value)
    })

    $("#searchbtn").click(function() {
        search($("#searchbox").value);
    })

    $('#randombtn').click(function() {
        openPage(randomUrl);
    });
});


function search(keyword) {
    $("#results").html('');
    urls = [];


    $.getJSON(wikiApi + keyword, function(jsonp) {
        for (var i = 0; i < jsonp[1].length; i++) {
            var resTitle = '<h5 id="resTitle">' + jsonp[1][i] + '</h5>'
            var summary = '<p class="wikisnip">' + jsonp[2][i] + '</p>'
            urls.push(jsonp[3][i])

            $('#results').append('<div class="grid-flex-container panels" id="' + i + '">' + resTitle + '<br />' + summary + '</div>' )
            $(`#${i}`).on('click', function() {
                openPage(urls[$(this).attr('id')])
            })
        }
    })
}


var getArticle = function() {
    $.getJSON(wikiApi, function(data) {
        console.log(data);
    })
};



function openPage(link) {
    window.open(link, '_blank') ? window.focus : alert("Please allow popups");
}

window.onload = function() {
  document.getElementById("searchbox").focus();
};




// $(".tempbutton").click(function() {
//     $(".tempdiv").html("<h6>Processing...</h6>"); 
//     units = units === "metric" ? "imperial" : "metric";
//     getGeo();
//     celc = celc === "&deg;C" ? "&deg;F" : "&deg;C";
// });

// var getGeo = function() {
//         $.getJSON('http://ip-api.com/json', function(json) {
//         var  lat = json.lat;
//         var  long = json.lon;
//         console.log(long);
//         console.log(lat);
//         getWeather(lat, long)
//     })
// };
// getGeo();
