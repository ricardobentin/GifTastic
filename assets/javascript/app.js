//create an array of topics
var topics = [
    "guitar",
    "bass guitar",
    "drums",
    "trumpet",
]
var q = "";
//create variables to make the query URL dynamic
var apiKey = "fAVHZ12EhkjdK8J608NSa4RAPhL0ADrt";
//may give the user the ability to set the limit
var gifLimit = 10;
//logic to create buttons on the page
for (var i = 0; i < topics.length; i++) {
    var button = $(`<button>${topics[i]}</button>`)
    button.attr("value", topics[i]);
    button.attr("class", "topics");
    $("#buttons").append(button);
}
console.log(topics);
$(".topics").on("click", function () {
    $("#gifs").empty();
    q = $(this).val();
    //query url is structured
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${apiKey}&limit=${gifLimit}`;
    console.log(queryURL);
    //ajax get request
    $.get(queryURL).then(function (response) {
        //console.log the response to see what the object looks like
        console.log(response);
        //create an array called results to store the response.data array
        var results = response.data;
        //create a for loop to loop through the entire array of results and do something with the resulting data
        for (var i = 0; i < results.length; i++) {
            //create a div tag for each image with the title as an id
            var gifDiv = $(`<div id="${results[i].title}">`);
            //put the rating in paragraph tag under each gif
            var p = $("<p>").text("Rating: " + results[i].rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("class", "gif");
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $("#gifs").prepend(gifDiv);
        }
        //click function to animate gifs
        $(".gif").on("click", function () {

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }

        });
    });


});