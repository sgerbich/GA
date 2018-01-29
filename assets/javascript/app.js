// worked with Alex Cryderman and Micheal Neuman
console.log("working");
var memes = ["pepe", "tide pods", "dickbutt", "ugandan knuckles"];

function displayMemeInfo() {

    var memeCheck = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + memeCheck + "&api_key=DcXLWzeMTLbYMScTFqA0AdFoxgS4EuqV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response)
        $("#memes").empty();
        var x = response.data
        for (i = 0; i < 10; i++) {
            var memeDiv = $("<div>"); //creates a new div in memeory
            memeDiv.addClass("memeDiv"); // adds a memeDiv class for memeDiv
            var memeRating =  $("<p>").text("Rating: " + x[i].rating); // grabs the rating for the current meme
            memeDiv.append(memeRating); // appends the rating to the meme div in memory.
            var memeImage = $("<img>"); // grabbing the gif
            memeImage.attr("src", x[i].images.fixed_height_small_still.url); //grabs the original still image were going to show.
            memeImage.attr("data-still",x[i].images.fixed_height_small_still.url); // grabs the still image we will switch back to after the user clicks.
            memeImage.attr("data-animate",x[i].images.fixed_height_small.url); // grabs the animated form of the gif
            memeImage.attr("data-state", "still"); //sets the data state equal to still.
            memeImage.addClass("image"); // adds a class to memeImage called image.
            memeDiv.append(memeImage); // appends the meme image to the meme div in memory.
            $("#memes").prepend(memeDiv); // prepends the memediv in memory to the hmtl memes div.
        }

    });

}


$(document).ready(function () {
    function renderButtons() { // function to create buttons 


        $("#memeButtons").empty(); // empties the buttons so we can recreate them all

        for (var i = 0; i < memes.length; i++) { //loops through the memes array


            var a = $("<button>"); // creates a button

            a.addClass("memes"); // adds the class memes to the button

            a.attr("data-name", memes[i]); // gives data name the attribute of memes[i]

            a.text(memes[i]); // puts text in the button

            $("#memeButtons").append(a); // puts the button on the page
        }

    }
    $("#add-meme").on("click", function (event) {
        event.preventDefault();


        var meme = $("#meme-input").val().trim(); // gets the user input


        memes.push(meme); // puts the new input into the memes array


        renderButtons(); // runs the button function again to add the new button
    });
    $(document).on("click", ".memes", displayMemeInfo);

    $(document).on("click", ".image", function(){ //when you click on something with a class of image
        var state = $(this).attr('data-state'); // stores the current data state of the gif
        if ( state == 'still'){ //if its still
            $(this).attr('src', $(this).data('animate')); // change the image to animate
            $(this).attr('data-state', 'animate'); // changes the images data state to animate
        }else{
            $(this).attr('src', $(this).data('still')); //changes image to still
            $(this).attr('data-state', 'still'); //changes images data state to still
        }
    });

    renderButtons();

});