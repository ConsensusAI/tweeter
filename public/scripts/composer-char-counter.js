$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    // Define charCount as the length of text in the text area
    let charCount = $(this).val().length;
    // Count remaining characters as this is what we want to display
    let charsLeft = 140 - charCount;

    // Defines the counter by its location in the DOM
    let counter = $(this).parent().next("div").children(".counter");

    // Inputs the charsLeft as the text in the counter
    counter.text(charsLeft);

    // Handles class changing for character limit
    if (charsLeft < 0) {
      counter.addClass("limitExceeded");
    } else {
      counter.removeClass("limitExceeded");
    }
  });
});
