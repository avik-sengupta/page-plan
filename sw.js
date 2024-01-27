importScripts(
    'https://cdn.jsdelivr.net/npm/@jcubic/wayne/index.umd.min.js',
    'js/browserfs.min.js',
    'https://cdn.jsdelivr.net/gh/jcubic/static@master/js/path.js',
    'https://cdn.jsdelivr.net/gh/jcubic/static@master/js/mime.min.js'
);
//const { promises: fs } = new LightningFS("testfs");

 let fs = new Promise(function(resolve, reject) {
        BrowserFS.configure({ fs: 'IndexedDB', options: {} }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(BrowserFS.BFSRequire('fs'));
            }
        });
    });

fs.then(function(fs) {
	const path = BrowserFS.BFSRequire('path');
	const app = new wayne.Wayne();

const test = url => {
    if (url.host !== self.location.hostname) {
        return false;
    }
    const path = url.pathname;
    return !path.match(/admin|sw.js|clone-plan.html|js/) && !path.startsWith('/content');
};

app.use(wayne.FileSystem({ path, fs, mime, test }));

});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
