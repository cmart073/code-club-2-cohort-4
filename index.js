//Browser: https://cm-cohort-4.cmart073.com/
//curl w/ POST: curl -X POST -s https://cm-cohort-4.cmart073.com/ | jq

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
      message: 'You made a POST request',
	    name: 'CM-Code-Club-2-Cohort-4',
	    version: '1.0.4'
	  }
	}
 	var html = "Welcome CM-Code-Club-2-Cohort-4"
 	var response = {}

  
/*
#################################################################################
############ Checks the incoming requests method for a POST request  ############
############ Sets the correct response content and type              ############
#################################################################################
*/
	if (request.method === 'POST') {
		response.content = JSON.stringify(config.app)
		response.type = 'application/json'
  	}else{
	    response.content = `<HTML><header>`+config.app.name+`</header><body>`+html+`</body><footer>Version: `+config.app.version+`</footer></HTML>`,
	    response.type = 'text/html'
  }
/*
#################################################################################
############ Returns our new Response based on the above conditions  ############
#################################################################################
*/
  return new Response(response.content, {status:200, headers:{'content-type': response.type}})
}