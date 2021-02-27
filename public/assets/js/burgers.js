// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    var devour = $(this).data("devour");

    var devouredState = {
      devoured: devour
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        console.log("changed devour to", devour);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function (){
    const id= $(this).data("id");

    $.ajax("api/burgers/" + id, {
      type: "DELETE"
    }).then(()=> {
      console.log(`Deleted burger with id: ${id}`);
      // Reload the page to get the updated list
      location.reload();
    })
  })

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurgers = {
      name: $("#newBurger").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurgers
    }).then(
      function() {
        console.log("made a new burger");
        $("#burgers").val("");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});