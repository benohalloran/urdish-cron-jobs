
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//Parse.Cloud.define("hello", function(request, response) {
  //response.success("Hello world!");
//});

Parse.Cloud.job("dropData", function(request, status) {
    Parse.Cloud.useMasterKey();
    ParseQuery<ParseObject> query = new ParseQuery<ParseObject>("Reviews");
        query.findInBackground(new FindCallback<ParseObject>() {
        public void done(List<ParseObject> reviews, ParseException e) {
            if (e == null) {
                try {
                   ParseObject.delete(reviews);
                }catch(ParseException pe) { pe.printStackTrace(); }
    
                for(ParseObject review : reviews)
                {
                     review.deleteEventually();
                }
            } else {
                Log.d("Semothing went wrong. ", e.getMessage());
            }
    }
});

}
