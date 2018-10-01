let localStorage = window.localStorage;

const generateId = () => {
  let newId;
  do {
    newId = Math.random()
      .toString(36)
      .substr(2);
  } while (storageGet(newId));
  return newId;
};

function storageInsert(key, obj) {
  localStorage.setItem(key, obj);
}

function storageGet(key) {
  return localStorage.getItem(key);
}

function storageRemove(key) {
  localStorage.removeItem(key);
}

$(document).ready(() => {
  localStorage = window.localStorage;

  //Load all.
  var keys = Object.keys(localStorage);
  keys.forEach(key => {
    //appendItem(localStorage.getItem(key), key);
    $("ul").append(
      "<li id='note-" + key + "'> <span>X</span> " + storageGet(key) + "</li>"
    );
  });
});

//Click on X to delete Todo
$("ul").on("click", "span", function(event) {
  $(this)
    .parent()
    .fadeOut(500, function() {
      console.log(
        "The note with key: " +
          $(this)
            .attr("id")
            .substr(5)
            .toString() +
          " has written: " +
          storageGet(
            $(this)
              .attr("id")
              .substr(5)
              .toString()
          ) +
          " has been deleleted from memory."
      );
      localStorage.removeItem(
        $(this)
          .attr("id")
          .slice(5)
      );

      $(this).remove();
    });
  event.stopPropagation();
});

//Add new list item on enter key press
$("input[type='text']").keypress(function(event) {
  if (event.which === 13) {
    //Hold input.
    let todoText = $(this).val();

    //Generate an unique ID.
    let newId = generateId();

    //Reset Input.
    $(this).val("");

    var ulId = $(".note-uls").attr("id");

    //Create new element.
    $("#" + ulId).append(
      "<li id='note-" + newId + "'>" + "<span>X</span> " + todoText + "</li>"
    );

    //Add to storage.
    storageInsert(newId, todoText);
  }
});

$("#toggle-form").click(function() {
  $("input[type='text']").fadeToggle();
});
