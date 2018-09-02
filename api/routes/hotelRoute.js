module.exports = (app) => {
    let hotelList = require('../controllers/hotelController');
    // our Routes
    app.route('/api/hotels')
        .get(hotelList.getHotels)
        .put(hotelList.createHotel)
        .delete(hotelList.deleteHotel)
        .post(hotelList.searchHotels);

    app.route('/api/hotels/edit')
        .post(hotelList.editHotel);
}