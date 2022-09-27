//Browser: https://assignment-3.cm-cohort-4.cmart073.com/
//curl w/ POST: curl -X POST -s https://assignment-3.cm-cohort-4.cmart073.com/ | jq

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
/*
#########################################################
####################### Variables #######################
#########################################################
*/
	var config = {
      app: {
        message: "Welcome to Code Club.",
        name: "CM-Code-Club-2-Cohort-4",
        version: "3.0.1"
      },
      ok: {
        status: 200
      },
      block: {
        status: 403
      },
      headers:{
        headers:{
        "accept": "application/json"
       }
      }
    };
    var data = {
      caddyShack: [
        "No one likes a tattletale, Danny\u2026 except, of course, me.",
        "We have a pool and a pond.  A pond would be good for you.",
        "You take drugs, Danny?",
        "Remember Danny, Two wrongs don/\u2019t make a right, but three rights make a left.",
        "The shortest distance between two points is a straight line in the complete and opposite direction.",
        "Don/\u2019t sell yourself, short Judge, you/\u2019re a tremendous slouch."
      ]
    };
    var response = {};
    var j = {};
    

/*
###################################################################################################
############  Picks a Random quote from the caddyShack array within the data variable  ############
###################################################################################################
*/
 	response.text = data.caddyShack[Math.floor(Math.random() * data.caddyShack.length)];
    
/*
#################################################################################
############ Getting additional information on the incoming request  ############
#################################################################################
*/

	var additionalData = await fetch("https://httpbin.org/get", config.app.headers)
    .then((additionalData2) => additionalData2.json()
    .then((d) => {j = d;}))
    .then((additionalData2) => console.log(j))
    .catch((err) => console.log(err));
/*
#################################################################################
############ Checks the incoming requests method for a POST request  ############
############ Sets the correct response content, type and status      ############
#################################################################################
*/
	if (request.method === "GET") {
      response.content = `<!doctype html>
							<html lang="en">
							  <head>
							    <meta charset="utf-8">
							    <meta name="viewport" content="width=device-width, initial-scale=1">
							    <title>${config.app.name}</title>
							    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
							  </head>
							  <body>
							  	<div class="card">
								  <div class="card-body">
								    <h5 class="card-title">Caddy Shack quotes:</h5>
								    <h6 class="card-subtitle mb-2 text-muted">version: ${config.app.version}</h6>
								    <p class="card-text">${response.text}</p>
								  </div>
								</div>
							    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"><\/script>
							  </body>
							  <footer>
							  	<h10>${config.app.version}</h10>
							  </footer>
							</html>`;
      response.type = "text/html";
      response.status = config.ok.status;
    } else if (request.method === "POST" || j.headers["Accept"] == "application/json" || j.headers["User-Agent"].includes("bot") || j.headers["User-Agent"].includes("curl")) {
      response.content = JSON.stringify(response.text);
      response.type = "application/json";
      response.status = config.ok.status;
    } else if (request.cf.botManagement.score <= 29){
      response.content = "No Bots Allowed"
      response.status = config.ok.status;
    }
/*
#################################################################################
############ Returns our new Response based on the above conditions  ############
#################################################################################
*/
  return new Response(response.content, { status: response.status, headers: { "content-type": response.type } });
}