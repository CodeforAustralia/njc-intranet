module.exports = function(app){

  /*@ngInject*/
  app.service('TopicService', function($log, $http){
    var topics = [
      {topic: "Client feedback", category: "HR"},
      {topic: "Leave", category: "HR"},
      {topic: "Workplace functions", category: "HR"},
      {topic: "Aggresive clients", category: "OH&S"},
      {topic: "Chemicals", category: "OH&S"},
      {topic: "Emergencies", category: "OH&S"},
      {topic: "First aid", category: "OH&S"},
      {topic: "Risk assessment", category: "OH&S"},
    ];

    return {
      all: function(){
        $log.log("Getting all the topics");
        return {
          data: topics
        };
      }
    };
  });

};
