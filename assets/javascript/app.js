//hiding the gifs div to start 
$("#gifs").hide();
//create an array of topics to later be converted to buttons
var topics = [
    "guitar",
    "bass guitar",
    "drums",
    "trumpet",
    "keytar",
    "dj",
    "speakers"
]
//create variables to make the query URL dynamic
var q;
var apiKey = "fAVHZ12EhkjdK8J608NSa4RAPhL0ADrt";
var gifLimit = 10;
//function call to create the buttons on the page
createButton();
//click function on any button that is of the topics class
$("#buttons").on("click", ".topics", function () {
    //need to show the gifs dive since I hid it at the beginning
    $("#gifs").show();
    //need to empty it since I don't want to keep on adding to the div every time a user clicks a button with the topics class
    $("#gifs").empty();
    //set q to be value of whatever button is clicked which comes from the topics array
    q = $(this).val().trim();
    //query url is structured dynamically
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${apiKey}&limit=${gifLimit}`;
    //log query URL to see if the query string parameters were getting passed correctly.
    console.log(queryURL);
    //ajax get request
    $.get(queryURL).then(function (response) {
        //console.log the response to see what the JSON looks like
        console.log(response);
        //create an array called results to store the response.data array to make it easier to reference
        var results = response.data;
        //create a for loop to loop through the entire array of results and do something with the resulting data
        for (var i = 0; i < results.length; i++) {
            //create a div tag for each image with the title as an id and a class of gifContainer
            var gifDiv = $(`<div id="item-${i}" class="gifContainer" title="${results[i].title}">`);
            //put the title, published date, and rating in paragraph tag under each gif
            var p = $("<p>").html(`Title: ${results[i].title} <br> Published Date: ${results[i].import_datetime} <br> Rating: ${results[i].rating}`);
            //create a variable called gifImage to be the img tag and then below it add whatever attributes that I will need as hooks to make the images dynamic
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("class", "gif");
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifDiv.append(gifImage);
            gifDiv.append(p);
            $("#gifs").prepend(gifDiv);
            // var saveGif = $(`<a download>Save Gif</a>`);
            // $(`"#item-${i}"`).append(saveGif);
            // var imgToDownload = fetch(`${results[i].images.fixed_height.url}`).then(function (response) {
            //     return response.blob()
            // }).then(blob => {
            //     console.log(blob);
            //     var file = new File([blob], 'img.gif', { type: 'image/gif' });
            //     console.log("this is the URL: " + URL.createObjectURL(file));
            //     return URL.createObjectURL(file);
            // }).then(results => { saveGif.attr("href", `${results}`) })
        }
        //click function to animate gifs
        $(".gif").on("click", function () {
            //create a variable called data to understand what state the image is in
            var state = $(this).attr("data-state");
            //conditional to either animate or not animate based on state
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
//logic to create buttons on the page
function createButton() {
    //empty the buttons div so that you only get the new topic that the user submitted written to the page
    $("#buttons").empty();
    //for loop to take the topics array, loop through it, create buttons from the values, give it a class of topics and then write to the buttons div
    for (var j = 0; j < topics.length; j++) {
        var button = $(`<button>${topics[j]}</button>`)
        button.attr("value", topics[j]);
        button.attr("class", "topics");
        $("#buttons").append(button);
    }
};
//logic to push a new value into the topics array when the user pushes the submit button
$("#newMusicSubmit").on("click", function () {
    //create a variable to hold the value of whatever the user put into the newMusicInput text box
    var newTopic = $("#newMusicInput").val();
    //conditional that will look to see 
    if (newTopic === "") {
        //validation to make sure that the user does not submit a blank
        alert("Please Type In a Value That Is Not Blank.")
    }
    //if the value of the newMusicInput textbox is not blank, then do the following
    else {
        // add the value of newTopic into the topics array
        topics.push(newTopic);
        //clear out the newMusicInput textbox
        $("#newMusicInput").val("");
        //call the create button function
        createButton();
        //log the topics array to make sure the value of newTopic is added to the array
        console.log(topics);
        //prevents the page from refreshing during each submit
        event.preventDefault();
    }
});
console.log(topics);
