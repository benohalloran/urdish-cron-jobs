//Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//Parse.Cloud.define("hello", function(request, response) {
  //response.success("Hello world!");
//});

Parse.Cloud.job("dropData", function(request, status) {
    Parse.Cloud.useMasterKey();
    var Reviews = Parse.Object.extend("Reviews");
    var query = new Parse.Query(Parse.Reviews);
    
    query.find({
      success: function(results) {
      
        for (var i = 0; i < results.length; i++) { 
          var object = results[i];
          object.destroy({
            success: function(object) {
              // The object was deleted from the Parse Cloud.
            },
            error: function(object, error) {
              // The delete failed.
              // error is a Parse.Error with an error code and message.
            }
          });
        } 
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

}
