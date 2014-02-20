// waits for html page to load -- equivalent to (document).ready or window.onload
$(function(){

  //Begin by thinking about the form and what we want from it
  //We want to the "#todo_title" for a newTodo and create a newTodo with a 
  //variable called "completed" set equal to the boolean 'false'

  //Let's write a function that watches for a submit event on the form
  $("#addTodo").on("submit", function(event) {
    event.preventDefault();
    var newTodo = { completed: false };
    newTodo.title = $("#todo_title").val();

    // Display a message on the console to confirm event capture
    console.log(newTodo.title + " has been added.");

    // We need to now post the text through the routes and controller using AJAX
    $.ajax({
      url: "/todos.json",
      type: "post",
      data: {todo: newTodo}
    }).done(function(data) {
      console.log(data);

      // Use Handlebars to display the parameters of the "todo" in variable "data" to the html browser
      var todoHTML = HandlebarsTemplates.todo(data);
      $("#todos").append(todoHTML);
    });
  });

  // Let's handle updates to a todo
  $("#todos").on("click", ".todo", function(event) {
    console.log(event);

    // to update whether the checkbox is checked or not checked
    var _this = this;
    if(event.target.name === "completed") {
      var checkbox = event.target;
      console.log("Clicked Checkbox");
      var updated_todo = { id: this.dataset.id };
      updated_todo.completed = checkbox.checked;
      console.log(updated_todo);

      $.ajax({
        url: "/todos/" + updated_todo.id + ".json",
        type: "patch",
        data: { todo: updated_todo }
      }).done(function(data) {
        $(_this).toggleClass("done-true");
      });
    }
    // to delete the todo
    else if(event.target.id === "removeTodo") {
      console.log("Todo deleted.");
      var deleted_todo = { id: this.dataset.id };

      $.ajax({
        url: "/todos/" + deleted_todo.id + ".json",
        type: "delete",
      }).done(function() {
        _this.remove();
      });
    }

  });

  // LOAD ALL TODOS INTO THE PAGE
  $.ajax({
    url: "/todos.json",
    type: "GET",
  }).done(function(response) {
    for( var i = 0; i < response.length; i++ ) {
      var todo = response[i];
      
      // Use Handlebars to display the parameters of each "todo" on the HTML browser
      var todoHTML = HandlebarsTemplates.todo(todo);
      $("#todos").append(todoHTML);
    }
  });

});
