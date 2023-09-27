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
									  //corsProxy: 'https://cors.isomorphic-git.org',
									  corsProxy: 'https://www.microcitest.info',
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
										  //const coupon = fs.readFileSync('/repo2/coupon.txt', 'utf8');
										  // console.log(coupon)
										  const list = document.getElementById("results");
										  files.forEach((item) => {
											// Create a new list item element
											const li = document.createElement("li");

											// Set the text content of the list item to the array item
											li.textContent = item;

											// Append the list item to the list
											if(item == 'coupon.txt'){
												console.log("file here")
												//const coupon = fs.readFile(item, 'utf8');
												//console.log(coupon)
												fs.readFile(`/repo2/${item}`, 'utf8', (err, contents) => {
													  if (err) {
													    console.error(err);
													    return;
													  }
													  
													  // Log contents 
													  //console.log(contents);
													  const coupon = contents
													  console.log(coupon)
													  //list.appendChild(coupon)
													  list.innerHTML = coupon
													 
												});
											}
											//list.appendChild(li);
											//console.log(contents)



										  });
									})
								  })




								 
								});
  					}

 function deleteDirectoryRecursive(fs, path) {
 
		 	console.log('in function delete')

		  	fs.readdir(path, function(err, files) {
		  		console.log(files)

		  		files.forEach(item => {
				    const itemPath = `${path}/${item}`;
				    console.log(itemPath)
				    
				    fs.stat(itemPath, function(err,stats) {
				    	//console.log(stats)
				    	//console.log(stats.isFile())
				    	if(stats.isFile()){
							fs.unlink(itemPath, function(err){
								if (err) {
									console.error("Error unlinking the file:", err);
								} else {
									console.log("File unlinked successfully.");
								}
							});
				    	}else{
				    		deleteDirectoryRecursive(fs, itemPath); 
				    	}
				    });

			  });

		  	});
		  	

  // 	fs.rmdir(path, function(err){
  // 		if (err) {
		// 	console.error("Error deleting the directory:", err);
		// } else {
		// 	console.log("Directory deleted");
		// }

  // 	});
}

				
		
