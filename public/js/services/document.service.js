(function(){

  /*@ngInject*/
  angular.module('njcIntranetApp')
    .service('DocumentService', DocumentService);

  /*@ngInject*/
  function DocumentService($log, $http, Constants){

    var document_types = ['Policies','Procedures','Forms','Supporting documents'];
    var document_categories = ['HR', 'NJC Policies', 'OHS', 'Finance', 'Administration'];


    // stub the documents out for now while we work out how we want o use it
    // document types: what kind of document is this?
    // document categories: what work area / function does it relate to
    // document related: documents related to this one
    var documents = [
      // HR - Policy
      {"id":"0001", "title":"Ceaceation of employment policy", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0002", "title":"CSV Instrument of Delegation", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0003", "title":"Reimbursement for perscription lenses", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0004", "title":"Electronic media useage", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0005", "title":"Gifts and hospitality policy", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0006", "title":"Higher duties policy", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0007", "title":"Learning and development policy", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0008", "title":"Recruitment", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0009", "title":"RTW", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0010", "title":"Social Media Policy", "description": "","type":"Policies", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      // HR - Procedures
      // HR - Forms
      {"id":"0011", "title":"Crim track form", "description": "","type":"Forms", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0012", "title":"Deed of confidentiality", "description": "","type":"Forms", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0013", "title":"First aid allowance form", "description": "","type":"Forms", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0014", "title":"Higher duties form", "description": "","type":"Forms", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0015", "title":"Probabtion period meeting documentation", "description": "","type":"Forms", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0016", "title":"Leave with out pay form", "description": "","type":"Forms", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0017", "title":"Long service leave", "description": "","type":"Forms", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0018", "title":"Request to change hours of work", "description": "","type":"Forms", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0019", "title":"Working from home form", "description": "","type":"Forms", "category": "HR", "location": {"url": "", "local_path": ""}, "related": []},
      // HR - Supporting documents
      {"id":"0020", "title":"VPS Agreement 2016", "description": "","type":"Supporting documents", "category": "NJC Policies", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0021", "title":"Who's Who February 2016.ppt", "description": "","type":"Supporting documents", "category": "NJC Policies", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0022", "title":"NJC Staff Phone List - March 2016.doc", "description": "","type":"Supporting documents", "category": "NJC Policies", "location": {"url": "", "local_path": ""}, "related": []},
      // NJC Policies - Policies
      {"id":"0023", "title":"Feedback policy", "description": "","type":"Policies", "category": "NJC Policies", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0024", "title":"Agreesive Client Policy", "description": "","type":"Policies", "category": "NJC Policies", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0025", "title":"Secure entry policy", "description": "","type":"Policies", "category": "NJC Policies", "location": {"url": "", "local_path": ""}, "related": []},
      // NJC Policies - Procedures
      {"id":"0026", "title":"Feedback Procedure", "description": "","type":"Procedures", "category": "NJC Policies", "location": {"url": "", "local_path": ""}, "related": []},
      // NJC Policies - Forms
      {"id":"0027", "title":"Feedback Form", "description": "","type":"Forms", "category": "NJC Policies", "location": {"url": "", "local_path": ""}, "related": []},
      // NJC Policies - Supporting Documents
      {"id":"0028", "title":"Feedback Register", "description": "","type":"Supporting documents", "category": "NJC Policies", "location": {"url": "", "local_path": ""}, "related": []},
      // OHS - Policies
      {"id":"0029", "title":"Notifiable Incident Handling for Managers", "description": "","type":"Policies", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0030", "title":"OH&S Policy - updated August 2014", "description": "","type":"Policies", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0031", "title":"Safe driving guidelines", "description": "","type":"Policies", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0032", "title":"Issue resolution flowchart", "description": "","type":"Policies", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0033", "title":"Bushfire checklist", "description": "","type":"Policies", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      // OHS - Supporting documents
      {"id":"0034", "title":"Ergonomic work station check list", "description": "","type":"Supporting documents", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0035", "title":"DCT EAP lifes ups and downs posters .pdf", "description": "","type":"Supporting documents", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0036", "title":"INTERNAL EMERGENCY CONTACTS Feb 2016.xls", "description": "","type":"Supporting documents", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0037", "title":"First Aid Treatment Form", "description": "","type":"Supporting documents", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0038", "title":"Bomb threat check list", "description": "","type":"Supporting documents", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0039", "title":"Evacuation plans", "description": "","type":"Supporting documents", "category": "OHS", "location": {"url": "", "local_path": ""}, "related": []},
    ];

    return {
      all: function(){
        $log.log("Getting all the documents");
        return $http.get(Constants.urls.api+"/documents");
      },
      types: function(){
        return new Promise(function(resolve, reject){
          return resolve(document_types);
        });
      },
      categories: function(){
        return new Promise(function(resolve, reject){
          return resolve(document_categories);
        });
      },
      get: function(id){
        // by default just return the latest version of a document
        return $http.get(Constants.urls.api+"/documents");
      }
    };
  }

})();
