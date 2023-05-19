// Script: Dynamic Search and Display Filtering for Bubble
// More info here: https://forum.bubble.io/t/jquery-script-that-lets-you-do-partial-text-search/263603
// Description: This script enables dynamic search functionality on an input box.
//              It searches through child divs of a target div and filters them based on the search input.
//              The search is case-insensitive, and the script keeps track of original display settings.
// Author: [Your Name]
// Date: [Current Date]

$(document).ready(function() {
  // Delay in milliseconds before executing the search
  var searchDelay = 1000;

  // Get the search input and target div elements
  var searchInput = $('#searchinput');
  var repeatingGroup = $('#RepeatingGroup');

  // Object to store original display settings of child divs
  var originalDisplay = {};

  // Function to perform the search and filter child divs
  function performSearch() {
    // Get the search input value and convert it to lowercase
    var searchText = searchInput.val().trim().toLowerCase();

    // Iterate through child divs in the target div
    repeatingGroup.children('div').each(function() {
      var childDiv = $(this);
      var className = childDiv.attr('class');

      // Store the original display setting of the child div if not already stored
      if (!originalDisplay[className]) {
        originalDisplay[className] = childDiv.css('display');
      }

      // Convert the child div's content to lowercase for comparison
      var childText = childDiv.text().toLowerCase();

      // Check if the child div contains the search text
      if (searchText && !childText.includes(searchText)) {
        childDiv.css('display', 'none'); // Hide the child div if it doesn't match the search text
      } else {
        childDiv.css('display', originalDisplay[className]); // Restore the original display setting
      }
    });
  }

  // Delayed search execution on keyup event
  var searchTimeout;
  searchInput.on('keyup', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, searchDelay);
  });

  // Reset search and display all child divs when search input is empty
  searchInput.on('input', function() {
    if (!searchInput.val().trim()) {
      repeatingGroup.children('div').each(function() {
        var childDiv = $(this);
        var className = childDiv.attr('class');
        childDiv.css('display', originalDisplay[className]); // Restore the original display setting
      });
    }
  });
});
