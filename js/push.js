					import http from './index.js'
					
					async function getStatus(fs, directory, filename) {
							  const status = await git.status({ fs, dir: directory, filepath: filename });
							  //console.log(status);
							  return status;
					}

					async function gitAdd(fs, directory, filename) {
							  try{
								  const status = await git.add({ fs, dir: directory, filepath: filename });
								  console.log("git add successful");
								  return true;
							  }catch (error) {
							      console.error('Failed to add files:', error);
							      return false;
							  }
					}

					async function gitCommit(fs, directory, message, name, email) {
							  
								  const sha = await git.commit({ fs, 
								  								 dir: directory,
								  							     author: {
																	    name: name,
																	    email: email,
																 },
																 message: message });
								  console.log(sha);
								  return sha;
							 
					}

					async function gitPush(fs, directory, username, token) {

								  const auth = () => ({
									username: username,
									password: token
								  });
							  
								  const pushResult = await git.push({ fs, 
								  								 http,
								  								 dir: directory,
								  								 remote: 'origin',
								  							     ref: 'master',
								  							     onAuth: auth
								  							 });
								  console.log(pushResult);
								  return pushResult;
							 
					}
					
					export function pushFunction(event){

								event.preventDefault();

								const fileContent = document.getElementById("fileContent").value;
								const fileName = document.getElementById("fileName").value;
								const commitMessgae = document.getElementById("commitMessgae").value;
								const username = document.getElementById("username").value;
								const email = document.getElementById("email").value;
								const token = document.getElementById("token").value;
								console.log(fileContent)
								console.log(fileName)
								console.log(username)
								console.log(email)
								console.log(token)
								console.log("here")

								

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
								  const directory = '/repo2'
								  const filePath = directory + '/' + fileName;

								  fs.writeFile(filePath, fileContent, 'utf8')
								  
								  var status = getStatus(fs, '/repo2', fileName);

								  status.then(result => {
									  console.log(result); // Print the result outside the function

									  var addStatus = gitAdd(fs, '/repo2', fileName);
									  addStatus.then(result => {
									  	console.log(result);
									  	var status = getStatus(fs, '/repo2', fileName);

									  	status.then(result => {

									  			console.log(result);
										  		
										  		var sha = gitCommit(fs,'/repo2', commitMessgae, username, email);
										  		 	sha.then(result => {
										  		 		console.log(result)
										  		 		var push = gitPush(fs, '/repo2', username, token);
										  		 });

										 });
									  });

								  });

								  
								  // status = await git.status({fs,dir: '/repo2', filepath: 'README.md'})



								// fs.readdir("/repo2", function(err, files) {
								// 		  if (err) {
								// 			// Handle error
								// 			console.log(err);
								// 			return;
								// 		  }
								// 		  console.log('in readfile')
								// 		  // Log the contents of the file to the console.
								// 		  console.log("Directory contents:", files);
								// 		  console.log(files.length)
								// 		   const list = document.getElementById("results");
								// 		  files.forEach((item) => {
								// 			// Create a new list item element
								// 			const li = document.createElement("li");

								// 			// Set the text content of the list item to the array item
								// 			li.textContent = item;

								// 			// Append the list item to the list
								// 			list.appendChild(li);
								// 		 });

								//   });
								  
								  

								 
								});
					}
					
		
