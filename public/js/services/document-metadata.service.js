(function(){

  angular.module('njcIntranetApp')
    .service('DataSource', DataSource);

  function DataSource(){
    var data = [
      {id: "0000", title: "Leave policy", url: "/docs/", description: "This is the leave policy for the NJC", category: "hr", type: "policy", last_updated: "18 May, 2014", hidden: false},
      {id: "0001", title: "Leave form", url: "/docs/", description: "This is the leave form for the NJC", category: "hr", type: "form", last_updated: "29 January, 2013", hidden: false},
      {id: "0002", title: "Leave procedures", url: "/docs/", description: "This is the leave procedure for the NJC", category: "hr", type: "procedure", last_updated: "25 December, 2014", hidden: false},
      {id: "0003", title: "General Office info 2010", url: "/docs/", description: "General emergency information", category: "oh&s", type: "supporting-document", last_updated: "10 April, 2010", hidden: false},
      {id: "0004", title: "NJC Emergency procedures", url: "/docs/", description: "This is the NJC emergency procedures to be carried out by all staff", type: "procedure", category: "oh&s", last_updated: "01 May, 2009", hidden: false},
      {id: "0005", title: "Phone threats checklist", url: "/docs/", description: "This is a checklist of steps to be taken in the case of a phone threat", type: "supporting-document", category: "oh&s", last_updated: "16 September, 2014", hidden: false},
      {id: "0006", title: "Feedback policy", url: "/docs/", description: "This is the njc policy for feedback that is received from our client", type: "policy", category: "HR", last_updated: "16 November, 2013", hidden: false},
      {id: "0007", title: "Feedback procedures", url: "/docs/", description: "This is the feedback procedures for the NJC", type: "procedure", category: "hr", last_updated: "16 September, 2014", hidden: false},
      {id: "0008", title: "Feedback form", url: "/docs/", description: "This is the formal feedback form to gather feedback from our clients", type: "form", category: "hr", last_updated: "16 September, 2014", hidden: false},
      {id: "0008", title: "Feedback acknowledgement letter", url: "/docs/", description: "This is the official response to be sent for acknowledgement of any feedback received from clients", type: "supporting-document", category: "hr", last_updated: "16 September, 2014", hidden: false},
    ];

    return {
      get: function(){
        return data;
      },

      find: function(id){
        return _.findWhere(data, {id: id});
      }
    };
  }

})();
