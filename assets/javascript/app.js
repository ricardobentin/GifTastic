//create variables to make the query URL dynamic
var apiKey = "fAVHZ12EhkjdK8J608NSa4RAPhL0ADrt";
//may give the user the ability to set the limit
var gifLimit = 10;
//will need to make q be the text value for whatever button is pressed - for now it's what's typed in a prompt
var q = prompt("What do you want to search for?")
//query url is structured
var queryURL = `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${apiKey}&limit=${gifLimit}`;
//ajax get request
$.get(queryURL).then(function (response) {
    //console.log the response to see what the object looks like
    console.log(response);
    //create an array called results to store the response.data array
    var results = response.data;
    //create a for loop to loop through the entire array of results and do something with the resulting data
    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifDiv.append(p);
        gifDiv.append(gifImage);
        $("#gifs").prepend(gifDiv);
    }
});