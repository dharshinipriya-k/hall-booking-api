const homePage = async (req, res) => {
  try {
    res.status(200).send(`
    <h1> Express Hall Booking API</h1>
    <h3>In this task an API with appropriate endpoints have been created via postman for an Hall Booking Functionality which 
    includes: </br></br><i>creating rooms (endpoint: /create-room)</i>,</br>
    <i>booking rooms (endpoint: /room-booking)</i>,</br>
    <i>Get all room details(endpoint: /get-rooms)</i>,</br>
    <i>Get customer details (endpoint: /customers)</i>,</br>
    <i>Get booking count (endpoint: /booking-count)</i>,</br>
    <i>Get booked room details (endpoint: /booked-rooms)</i>,
    </h3>
    `);
  } catch (error) {
    res.status(500).send({
      comment: "Internal server error!",
    });
  }
};

export default {
  homePage,
};
