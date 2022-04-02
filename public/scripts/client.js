/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (data) => {
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
  });

  loadTweets();
});
