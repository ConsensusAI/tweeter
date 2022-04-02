/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (data) => {
  return `<article class="tweet">
  <header>
    <div class="user-info">
      <img
        src=${data.user.avatars}"
      />
      <p>${data.user.name}</p>
    </div>
    <p>${data.user.handle}</p>
  </header>
  <div class="tweet-body">
    <p>
      ${data.content.text}
    </p>
  </div>
  <footer>
    <p>${timeago.format(data.created_at)}</p>
    <div class="tweet-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
};

const renderTweet = function (data) {
  $("#tweets-container").empty();

  for (let tweet of data) {
    let $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
    renderTweet(tweets);
  });
};

$(document).ready(function () {
  $("#submit-new-tweet").submit(function (event) {
    event.preventDefault();
    console.log($("#tweet-text"));

    // Handle Empty Tweets
    if (!$("#tweet-text").val()) {
      return alert("Cannot post an empty tweet.");
    }

    // Handle Long Tweets
    if ($("#tweet-text").val().length > 140) {
      return alert("Tweet cannot exceed 140 characters");
    }

    let data = $(this).serialize();

    $.post("/tweets", data, function () {
      $("#tweet-text").val("");
      console.log("reloading");
      loadTweets();
    });

    // $.ajax("/tweets", { method: "POST", data: data })
    //   .then(function (tweet) {
    //     $("#tweet-text").val("");
    //   })
    //   .then(() => {
    //     loadTweets();
    //   });
  });

  loadTweets();
});
