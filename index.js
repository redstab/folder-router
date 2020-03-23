var fs = require('fs');
var path = require('path');

const folder_router = (dir = 'routes') => {
    if (!fs.existsSync(dir)) {
        throw Error('Route folder does not exist!');
    } else {
        let files = GetFiles(dir).map(file => '../../' + file.replace(/\\/g, "/"));
        let routes = [];
        files.forEach(file => {
            routes.push(require(file));
        });

        return routes;
    }
}

const GetFiles = dir =>
    fs.readdirSync(dir).reduce((files, file) => {
        const name = path.join(dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
        return isDirectory ? [...files, ...GetFiles(name)] : [...files, name];
    }, []);

module.exports = folder_router;