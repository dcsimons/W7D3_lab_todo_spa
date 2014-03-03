SpaApp.Views.TodosIndex = Backbone.View.extend({
  id: 'todos',

  template: HandlebarsTemplates['todos/index'],

  events: {
    "submit #addTodo": "create"
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

  render: function() {
    $(this.el).html(this.template());

    _.each(this.collection, function (someTodo) {
      var todoHTML = HandlebarsTemplates['todos/show'](someTodo);
      this.$el.append(todoHTML);
    }, this);

    return this;
  }

});
