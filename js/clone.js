  					import http from './index.js'
  					export function cloneFunction(event){

			  					event.preventDefault();

								const gitUrl = document.getElementById("gitUrl").value;
								const username = document.getElementById("username").value;
								const token = document.getElementById("token").value;
								console.log(gitUrl)
								console.log(username)
								console.log(token)

								

								if (!('indexedDB' in window)) {
									console.log("This browser doesn't support IndexedDB");
									alert("This browser doesn't support IndexedDB")
								}
								// First, we need to initialize BrowserFS.
								BrowserFS.configure({
								  fs: "IndexedDB",
								  options: {}
								}, function(err) {
								  if (err) {
									// Handle error
									console.log(err);
									return;
								  }

								  var fs = BrowserFS.BFSRequire('fs');


								  const auth = () => ({
									username: username,
									password: token
								  });
								  
								  git.clone({
									  fs,
									  http,
									  dir: '/repo2',
									  corsProxy: 'https://cors.isomorphic-git.org',
									  url: gitUrl,
									  singleBranch: true,
									  depth: 1,
									  onAuth: auth
									}).then(function() {

										console.log('repository clone done')

										fs.readdir("/repo2", function(err, files) {
										  if (err) {
											// Handle error
											console.log(err);
											return;
										  }
										  console.log('in readfile')
										  // Log the contents of the file to the console.
										  console.log("Directory contents:", files);
										  console.log(files.length)
										   const list = document.getElementById("results");
										  files.forEach((item) => {
											// Create a new list item element
											const li = document.createElement("li");

											// Set the text content of the list item to the array item
											li.textContent = item;

											// Append the list item to the list
											list.appendChild(li);
										  });
									})
								  })


								 
								});
  					}
					
		
