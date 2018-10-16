var profile = require("./profile");
var renderer = require("./renderer");
var queryString = require("querystring");

var commonHeader = {'Content-Type':'text/html'};

function user(request, response) {
    var username = request.url.replace("/","");
    if(username.length > 0){
        response.writeHead(200, commonHeader);
        renderer.view("header", {}, response);

        var studentProfile = new profile(username);
        studentProfile.on("end", (profileJSON)=> {

            var values = {
              avatarUrl:profileJSON.gravatar_url,
              username:profileJSON.profile_name,
              badges:profileJSON.badges.length,
              javascriptPoints:profileJSON.points.JavaScript
            };

            // response.write(`${values.username} has ${values.badges} badges\n`);
            renderer.view("profile", values, response);
            renderer.view("footer", {}, response);
            response.end();
        });

        studentProfile.on("error", (error)=> {
            renderer.view("error",{errorMessage:error.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });

    }
}

function home(request, response){
    if(request.url === "/"){
        if(request.method.toLowerCase() === "get"){
            response.writeHead(200, commonHeader);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        } else {
            request.on("data", (postBody)=>{
                var query = queryString.parse(postBody.toString())
                response.writeHead(303, {"Location":`/${query.username}`});
                response.end();
            });

        }
    }
}

module.exports.home = home;
module.exports.user = user;
