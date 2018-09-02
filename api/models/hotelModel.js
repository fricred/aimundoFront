var jsonfile = require('jsonfile')
var file = 'recursos/data/data.json'
// Load the full build.
var lodash = require('lodash');
module.exports = {
    all: function (res) {
        jsonfile.readFile(file, function (err, obj) {
            if (err != null) {
                res.status(500).send({ error: "Error al consultar los datos" });
            } else {
                res.status(200).json(obj)
            }
        })

    },
    search: function (req, res) {
        jsonfile.readFile(file, function (err, obj) {
            if (err != null) {
                res.status(500).send({ error: "Error al consultar los datos" });
            } else {
                res.json(searchHotels(obj, req.body));
            }
        })
    },
    create: function (createObj, res) {
        jsonfile.readFile(file, function (err, obj) {
            obj.push(createObj);

            jsonfile.writeFile(file, obj, function (err) {
                if (err != null) {
                    res.status(500).send({ error: "Error al escribir los datos" });
                } else {
                    res.send('hotel creado');
                }
            })
        })


    },
    destroy: function (req, res) {
        jsonfile.readFile(file, function (err, obj) {
            var events = lodash.remove(obj, x => x.id === req.body.id);
            console.log(events);
            jsonfile.writeFile(file, obj, function (err) {
                if (err != null) {
                    res.status(500).send({ error: "Error al escribir los datos" });
                } else {
                    res.send('hotel eliminado');
                }
            })
        })
    },
    edit: function (req, res) {
        jsonfile.readFile(file, function (err, obj) {
            var index = lodash.findIndex(obj, x => x.id === req.body.id);
            obj[index] = req.body
            jsonfile.writeFile(file, obj, function (err) {
                if (err != null) {
                    res.status(500).send({ error: "Error al escribir los datos" });
                } else {
                    res.send('hotel editado');
                }
            })
        })
    }
};

var searchHotels = function (x, searchQuery) {
    var result = [];
    console.log(searchQuery);
    for (var i = 0; i < x.length; i++) {
        if ((x[i]['name'].toLowerCase().indexOf(searchQuery.name ? searchQuery.name.toLowerCase() : -1) > -1)
            || (searchQuery.stars && searchQuery.stars.includes(x[i]['stars']))) {
            result.push(x[i]);
        }
    }
    return result; //Array containing matched hotels. Returns empty array if no matches found.
}
