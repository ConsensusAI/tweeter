$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let charCount = $(this).val().length;
    let charsLeft = 140 - charCount;

    let counter = $(this).parent().next("div").children(".counter");
    counter.text(charsLeft);

    if (charsLeft < 0) {
      counter.addClass("limitExceeded");
    } else {
      counter.removeClass("limitExceeded");
    }
  });
});
