addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	// Return a new Response based on a URL's hostname
 	const url = new URL(request.url);
 	var data = "Thanks for making a POST"
 	var html = "Welcome CM-Code-Club-2-Cohort-4"
  
// On HTTP method
	if (request.method === 'POST') {
		
		request.content = JSON.stringify(data)
		request.type = 'application/json'
  	}else{
	    request.content = html
	    request.type = 'text/html'
    
  }
  return new Response(request.content, {status:200, headers:{'content-type': request.type}})
}