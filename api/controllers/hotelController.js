var hotelModel = require('../models/hotelModel');


// get all hotels
exports.getHotels = (req, res) => {
    hotelModel.all(res)
};

// create a hotel
exports.createHotel = (req, res) => {
    hotelModel.create(req.body,res)
};

// delete a hotel
exports.deleteHotel = (req, res) => {
    hotelModel.destroy(req,res)
};

// edit Hotel
exports.editHotel = (req, res) => {
    hotelModel.edit(req,res)
};
// search Hotel
exports.searchHotels = (req, res) => {
    hotelModel.search(req,res)
};

// search Hotel
exports.sayHello = (req, res) => {
   res.send('Heloo From Controller')
};