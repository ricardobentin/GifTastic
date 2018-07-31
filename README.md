# GifTastic

Welcome to Giffy Band!

You can use the textbox to enter in your favorite musical instrument, artist, sound effect, or any music related topic to form your ultimate Gif band!

When you hit submit, your topic will appear as a button and once you click the button, you will see 10 gifs of the topic that you have selected from the giphy api.

Link to project: http://ricardobentin.github.io/GiffyBand

Challenges: Event delegation

How I overcame the challenges:
The issue was that I had a click function that would create a new button based on user input. After the buttons were created, the click function would not work. It was only through using event delegation that I was able to get the click function to work properly by assigning a class to the buttons when they are created and then delegating the click function to that particular class.

Example of the function that creates the buttons:
```javascript
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
```
Once the buttons have been created, the click function will work on any button with the class topics
```javascript
$("#buttons").on("click", ".topics", function () {
]);
```
The click function in this application is key because that is how the ajax request gets generated.

Happy Giffying!
