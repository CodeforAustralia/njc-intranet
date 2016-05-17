module.exports = function(app){

  /*@ngInject*/
  app.service('NewsEventsService', function($log, $http, $q){
    var news = [
      {"posted": Date.now(), "subject":"We’re going to be 10", "summary":"2016 is the Year of the NJC! We’re turning the big double digits. 10!\nBut how are we going to celebrate? Will we have streamers? Will there be a giant cake? What flavour? Who’ll jump out of it. Or on it? Tough questions. And only you can answer them.\nA ‘wish list’ of ideas is currently being drafted by Ann and she’s writing to you in the third person to ask you to put on your conical thinking cap and send her your ideas.", "permalink":"/news/1"},
      {"posted": Date.now(), "subject":"ADSL is now up and running again", "permalink":"/news/2"},
      {"posted": Date.now(), "subject":"Bomb threat checklist", "summary":"If you ever wondered what to do if you receive a bomb threat over the phone check this out ! Please find the nice one pager, place it near your phone.\nIn the event you take a bomb threat, leave your phone off the hook for the police to attempt a trace even if the caller has hung up, tell your colleagues not to hang up phone.  Do not alert other staff at this point as there may be specific instructions the Chief Warden want staff to do before an evacuation is called.\nImmediately notify Chief Fire Warden or Deputy (Diane or myself) using a different phone.\nFill out the bomb threat checklist and hand over to Chief/Deputy Warden and await further instructions.\nDo not evacuate to the primary or secondary evacuation points- you will be notified of a different location.\nDo not use mobile phones radios, walkie talkies as they can set off the device.", "permalink":"/news/3"},
    ];

    return {
      all: function(){
        $log.log("Getting all the news");
        return $q.when({
          data: news
        });
      }
    };
  });

};
