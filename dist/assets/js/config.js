if (location.host == "192.168.100.5") {
  var api_base = "http://192.168.100.5/multi_tournament_app/api/web_app/"; 
  var old_appw1_base="http://192.168.100.5/motap_test/appw1/"
} else {
  var api_base = "https://alt.primexop.com/api.primexop.com/mta/web_app/";
  var old_appw1_base="https://alt.primexop.com/motap/appw1/"

}

//   console.log(api_base)

function  go_to_old_appw1(path){
  location.href = old_appw1_base+path
}




