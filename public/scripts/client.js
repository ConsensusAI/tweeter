/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function to prevent cross-site scripting
const escape = (str) => {
  // Create a new div node
  let div = document.createElement("div");
  // Add passed in string as text to new div
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creates a new tweet element using passed in data
const createTweetElement = (data) => {
  // HTML nodes that define a tweet
  return `<article class="tweet">
  <header>
    <div class="user-info">
      <img
        src=${escape(data.user.avatars)}"
      />
      <p>${escape(data.user.name)}</p>
    </div>
    <p>${escape(data.user.handle)}</p>
  </header>
  <div class="tweet-body">
    <p>
      ${escape(data.content.text)}
    </p>
  </div>
  <footer>
    <p>${timeago.format(escape(data.created_at))}</p>
    <div class="tweet-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
};

// Function to render the tweets
const renderTweet = function (data) {
  // Empties the container to prevent duplicates
  $("#tweets-container").empty();

  // Iterates over array of tweet objects
  for (let tweet of data) {
    let $tweet = createTweetElement(tweet);
    // Add new tweet to the top of the page
    $("#tweets-container").prepend($tweet);
  }
};

// Function to fetch tweets and run the render function
const loadTweets = () => {
  // Call GET to the tweets route that houses an array of tweet objects
  $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
    renderTweet(tweets);
  });
};

// Waits for DOM to be loaded in
$(document).ready(function () {
  // jQuery shorthand to submit a form
  $("#submit-new-tweet").submit(function (event) {
    // Prevent default activity of form submit
    event.preventDefault();

    // Handle Empty Tweets
    if (!$("#tweet-text").val()) {
      // Show error with effect
      return $(".errors").text("Cannot post an empty tweet.").slideDown();
    }

    // Handle Long Tweets
    if ($("#tweet-text").val().length > 140) {
      // Show error with effect
      return $(".errors")
        .text("Tweet cannot exceed 140 characters")
        .slideDown(0);
    }

    // Hides the error and removes text
    $(".errors").text("").hide();

    // Convert input to serialized form
    let data = $(this).serialize();

    $.post("/tweets", data, function () {
      // Empties the text area after tweet is submitted
      $("#tweet-text").val("");
      loadTweets();
    });
  });

  loadTweets();
});
