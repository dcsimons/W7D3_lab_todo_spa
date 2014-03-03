window.SpaApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // attach X-CSRF-Token to all request headers
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      var token;
      options.xhrFields = {
        withCredentials: true
      };
      token = $('meta[name="csrf-token"]').attr('content');
      if (token) {
        return jqXHR.setRequestHeader('X-CSRF-Token', token);
      }
    });

    // this code obviously belongs in a model or collection
    // but, we're not talking about models or collections just yet :)
    $.get("/todos.json").done(function (data) {
      // initialize the index view with the fetched data
      var view = new SpaApp.Views.TodosIndex({ collection: data });
      $('#container').html(view.render().el);
    });

  }
};

$(document).ready(function(){
  SpaApp.initialize();
});
