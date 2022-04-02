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
  for (let tweet of data) {
    let $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
  }
};

$(document).ready(function () {
  $("#submit-new-tweet").submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    console.log(data);
    $.post("/tweets", data);
  });

  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweet(tweets);
    });
  };

  loadTweets();
});
