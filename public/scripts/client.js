/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

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
    <p>${data.created_at}</p>
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
  renderTweet(data);

  $("#submit-new-tweet").submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    console.log(data);
    // $.ajax("/tweets", { method: "POST", data: data });
    $.post("/tweets", data);
  });
});
