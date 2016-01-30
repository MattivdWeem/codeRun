var fs = require('fs');

module.exports = function(app, options, methods, Models, Controllers){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js" || file == ".DS_Store") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app, options, methods, Models, Controllers);
    });
};
