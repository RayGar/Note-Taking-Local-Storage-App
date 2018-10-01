const localStorage = {
  value: window.localStorage,

  storageInsert: function(key, obj) {
    this.value.setItem(key, obj);
  },

  storageGet: function(key) {
    return this.value.getItem(key);
  },

  storageRemove: function(key) {
    this.value.removeItem(key);
  },

  generateId: function() {
    let newId;
    do {
      newId = Math.random()
        .toString(36)
        .substr(2);
    } while (this.storageGet(newId));
    return newId;
  }
};

//Event based function definitions need to exist outside of the object
$(document).ready(() => {
  //Load all.
  var keys = Object.keys(localStorage.value);
  keys.forEach(key => {
    $("ul").append(
      "<li id='note-" +
        key +
        "'> <span>X</span> " +
        localStorage.storageGet(key) +
        "</li>"
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
          localStorage.storageGet(
            $(this)
              .attr("id")
              .substr(5)
              .toString()
          ) +
          " has been deleleted from memory."
      );
      localStorage.value.removeItem(
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
    let newId = localStorage.generateId();

    //Reset Input.
    $(this).val("");

    var ulId = $(".note-uls").attr("id");

    //Create new element.
    $("#" + ulId).append(
      "<li id='note-" + newId + "'>" + "<span>X</span> " + todoText + "</li>"
    );

    //Add to storage.
    localStorage.storageInsert(newId, todoText);
  }
});

$("#toggle-form").click(function() {
  $("input[type='text']").fadeToggle();
});
