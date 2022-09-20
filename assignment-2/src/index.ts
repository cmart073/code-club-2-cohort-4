//Browser: https://assignment-2.cm-cohort-4.cmart073.com/
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
      	message: 'Welcome to Code Club.',
	    name: 'CM-Code-Club-2-Cohort-4',
	    version: '2.0.1'
	  },
	  ok: {
	  	status:200
	  },
	  block: {
	  	status:403
	  }
	}
 	var data = {
 		caddyShack:[
 		"No one likes a tattletale, Danny… except, of course, me.",
 		"We have a pool and a pond.  A pond would be good for you.",
 		"You take drugs, Danny?",
 		"Remember Danny, Two wrongs don/’t make a right, but three rights make a left.",
 		"The shortest distance between two points is a straight line in the complete and opposite direction.",
 		"Don/’t sell yourself, short Judge, you’re a tremendous slouch."
	 	]
	 }
 	var response = {}

/*
###################################################################################################
############  Picks a Random quote from the caddyShack array within the data variable  ############
###################################################################################################
*/
 	response.text = data.caddyShack[Math.floor(Math.random() * data.caddyShack.length)]
  
/*
#################################################################################
############ Checks the incoming requests method for a POST request  ############
############ Sets the correct response content, type and status      ############
#################################################################################
*/
	if (request.method === 'POST') {
		response.content = 'No POSTS allowed'
		response.type = 'application/json'
		response.status = config.block.status
  	}else{
	    response.content = `<HTML><header>`+config.app.name+`</header><body>`+response.text+`</body><footer>Version: `+config.app.version+`</footer></HTML>`,
	    response.type = 'text/html'
	    response.status = config.ok.status    
  }
/*
#################################################################################
############ Returns our new Response based on the above conditions  ############
#################################################################################
*/
  return new Response(response.content, {status:response.status, headers:{'content-type': response.type}})
}