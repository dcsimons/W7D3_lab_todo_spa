SpaApp.Views.TodosIndex = Backbone.View.extend({
  id: 'todos',

  template: HandlebarsTemplates['todos/index'],

  events: {
    "submit #addTodo": "create",
    "click #removeTodo": "removeTodo",
    "click #todo_completed": "updateCheckbox"
  },

  create: function(event) {
    event.preventDefault();
    console.log("New Todo submitted");
    var newTodo = {
      title: $("#todo_title").val(),
      completed: false
    };
    console.log(newTodo);
    var _this = this;
    $.post('/todos.json', {
      todo: newTodo
    }).done(function (responseData) {
      console.log(responseData);
      var todoHTML = HandlebarsTemplates['todos/show'](responseData);
      _this.$el.append(todoHTML);
    });   
  },

  updateCheckbox: function(event) {
    console.log(event.target);
    var _this = $(event.target).closest(".todo");

    var updated_todo = {
      completed: event.target.checked,
      id: $(event.target).closest(".todo").data("id")
    };

    $.ajax({
      type: "PATCH",
      url: "/todos/" + updated_todo.id + ".json",
      data: { todo: updated_todo }
    }).done(function (responseData) {
      $(_this).toggleClass("done-true");
    });
  },

  removeTodo: function(event) {
    event.preventDefault();
    var id = $(event.target).closest(".todo").data("id");
    var _this = $(event.target).closest(".todo");

    console.log(_this);
    $.ajax({
      type: "DELETE",
      url: "/todos/"+id
    }).done(function (responseData) {
      _this.remove();
    });

  },

  render: function() {
    $(this.el).html(this.template());

    _.each(this.collection, function (someTodo) {
      var todoHTML = HandlebarsTemplates['todos/show'](someTodo);
      this.$el.append(todoHTML);
    }, this);

    return this;
  }

});
