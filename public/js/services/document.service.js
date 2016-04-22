(function(){

  /*@ngInject*/
  angular.module('njcIntranetApp')
    .service('DocumentService', DocumentService);

  /*@ngInject*/
  function DocumentService($log, $http, Constants){

    var document_types = [{'type':'Policies'},{'type':'Procedures'},{'type':'Forms'},{'type':'Supporting documents'}];
    var document_categories = [{'category':'HR'}, {'category':'NJC Policies'}, {'category':'OHS'}, {'category':'Finance'}, {'category':'Administration'}];


    // stub the documents out for now while we work out how we want o use it
    // document types: what kind of document is this?
    // document categories: what work area / function does it relate to
    // document related: documents related to this one
    var documents = [
      // HR - Policy
      {"id":"0001", "title":"Ceaceation of employment policy", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0002", "title":"CSV Instrument of Delegation", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0003", "title":"Reimbursement for perscription lenses", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0004", "title":"Electronic media useage", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0005", "title":"Gifts and hospitality policy", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0006", "title":"Higher duties policy", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0007", "title":"Learning and development policy", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0008", "title":"Recruitment", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0009", "title":"RTW", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0010", "title":"Social Media Policy", "description": "","metadata": {"type":"Policies", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      // HR - Procedures
      // HR - Forms
      {"id":"0011", "title":"Crim track form", "description": "","metadata": {"type":"Forms", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0012", "title":"Deed of confidentiality", "description": "","metadata": {"type":"Forms", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0013", "title":"First aid allowance form", "description": "","metadata": {"type":"Forms", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0014", "title":"Higher duties form", "description": "","metadata": {"type":"Forms", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0015", "title":"Probabtion period meeting documentation", "description": "","metadata": {"type":"Forms", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0016", "title":"Leave with out pay form", "description": "","metadata": {"type":"Forms", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0017", "title":"Long service leave", "description": "","metadata": {"type":"Forms", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0018", "title":"Request to change hours of work", "description": "","metadata": {"type":"Forms", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0019", "title":"Working from home form", "description": "","metadata": {"type":"Forms", "category": "HR"}, "location": {"url": "", "local_path": ""}, "related": []},
      // HR - Supporting documents
      {"id":"0020", "title":"VPS Agreement 2016", "description": "","metadata": {"type":"Supporting documents", "category": "NJC Policies"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0021", "title":"Who's Who February 2016.ppt", "description": "","metadata": {"type":"Supporting documents", "category": "NJC Policies"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0022", "title":"NJC Staff Phone List - March 2016.doc", "description": "","metadata": {"type":"Supporting documents", "category": "NJC Policies"}, "location": {"url": "", "local_path": ""}, "related": []},
      // NJC Policies - Policies
      {"id":"0023", "title":"Feedback policy", "description": "","metadata": {"type":"Policies", "category": "NJC Policies"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0024", "title":"Agressive Client Policy", "description": "","metadata": {"type":"Policies", "category": "NJC Policies"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0025", "title":"Secure entry policy", "description": "","metadata": {"type":"Policies", "category": "NJC Policies"}, "location": {"url": "", "local_path": ""}, "related": []},
      // NJC Policies - Procedures
      {"id":"0026", "title":"Feedback Procedure", "description": "","metadata": {"type":"Procedures", "category": "NJC Policies"}, "location": {"url": "", "local_path": ""}, "related": []},
      // NJC Policies - Forms
      {"id":"0027", "title":"Feedback Form", "description": "","metadata": {"type":"Forms", "category": "NJC Policies"}, "location": {"url": "", "local_path": ""}, "related": []},
      // NJC Policies - Supporting Documents
      {"id":"0028", "title":"Feedback Register", "description": "","metadata": {"type":"Supporting documents", "category": "NJC Policies"}, "location": {"url": "", "local_path": ""}, "related": []},
      // OHS - Policies
      {"id":"0029", "title":"Notifiable Incident Handling for Managers", "description": "","metadata": {"type":"Policies", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0030", "title":"OH&S Policy - updated August 2014", "description": "","metadata": {"type":"Policies", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0031", "title":"Safe driving guidelines", "description": "","metadata": {"type":"Policies", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0032", "title":"Issue resolution flowchart", "description": "","metadata": {"type":"Policies", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0033", "title":"Bushfire checklist", "description": "","metadata": {"type":"Policies", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      // OHS - Supporting documents
      {"id":"0034", "title":"Ergonomic work station check list", "description": "","metadata": {"type":"Supporting documents", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0035", "title":"DCT EAP lifes ups and downs posters .pdf", "description": "","metadata": {"type":"Supporting documents", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0036", "title":"INTERNAL EMERGENCY CONTACTS Feb 2016.xls", "description": "","metadata": {"type":"Supporting documents", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0037", "title":"First Aid Treatment Form", "description": "","metadata": {"type":"Supporting documents", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0038", "title":"Bomb threat check list", "description": "","metadata": {"type":"Supporting documents", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0039", "title":"Evacuation plans", "description": "","metadata": {"type":"Supporting documents", "category": "OHS"}, "location": {"url": "", "local_path": ""}, "related": []},
      // Finance - Policies
      {"id":"0040", "title":"General Claim Form", "description": "","metadata": {"type":"Policies", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0041", "title":"Travel Policy", "description": "","metadata": {"type":"Policies", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0042", "title":"Expenditure Policy", "description": "","metadata": {"type":"Policies", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0043", "title":"Reimbursement policy", "description": "","metadata": {"type":"Policies", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0044", "title":"Financial compliance policy", "description": "","metadata": {"type":"Policies", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0045", "title":"Cabcharge use policy", "description": "","metadata": {"type":"Policies", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      // Finance - Procedures
      {"id":"0046", "title":"OIE Claim instructions (to be created)", "description": "","metadata": {"type":"Procedures", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0047", "title":"How to handle and E form ( to be made)", "description": "","metadata": {"type":"Procedures", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      // Finance - Form
      {"id":"0048", "title":"Statement by supplier for not quoting an ABN", "description": "","metadata": {"type":"Forms", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0049", "title":"OIE registration form", "description": "","metadata": {"type":"Forms", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0050", "title":"FBT declaration form", "description": "","metadata": {"type":"Forms", "category": "Finance"}, "location": {"url": "", "local_path": ""}, "related": []},
      // Administration - Procedures
      {"id":"0051", "title":"Magistrates Court Etiquette Guide", "description": "","metadata": {"type":"Procedures", "category": "Administration"}, "location": {"url": "", "local_path": ""}, "related": []},
      {"id":"0052", "title":"Getting to and Parking at the NJC March 2016", "description": "","metadata": {"type":"Supporting documents", "category": "Administration"}, "location": {"url": "", "local_path": ""}, "related": []},
    ];

    return {
      all: function(){
        $log.log("Getting all the documents");
        //return $http.get(Constants.urls.api+"/documents");
        return new Promise(function(resolve, reject){
          return resolve({data: documents});
        });
      },
      types: function(){
        return new Promise(function(resolve, reject){
          return resolve({data: document_types});
        });
      },
      categories: function(){
        return new Promise(function(resolve, reject){
          return resolve({data: document_categories});
        });
      },
      get: function(id){
        // by default just return the latest version of a document
        return $http.get(Constants.urls.api+"/documents");
      }
    };
  }

})();
