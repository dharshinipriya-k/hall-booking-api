// import { findIndex } from "../common/findIndex.js"

const rooms = [
  {
    room_id: 1,
    room_name: "room-1",
    room_status: "available",
    amenities: "AC, Free WiFi, Breakfast, TV",
    seats: 5,
    price_per_hrs: 7000,
  },
  {
    room_id: 2,
    room_name: "room-2",
    room_status: "available",
    amenities: "Free WiFi, Breakfast, TV",
    seats: 4,
    price_per_hrs: 5000,
  },
  {
    room_id: 3,
    room_name: "room-3",
    room_status: "available",
    amenities: "AC, Free WiFi, Breakfast, TV",
    seats: 3,
    price_per_hrs: 6000,
  },
  {
    room_id: 4,
    room_name: "room-4",
    room_status: "available",
    amenities: "AC, Free WiFi, Breakfast, TV",
    seats: 3,
    price_per_hrs: 3000,
  },
];

let bookingRoom = [];

const allRooms = async (req, res) => {
  try {
    await res.status(200).json({
      message: "Room fetch successfull!",
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const allCustomer = (req, res) => {
  try {
    const customerList = bookingRoom.map((booking) => {
      const room = rooms.find((r) => r.room_id === booking.roomID);
      return {
        Customer_Name: booking.customer_name,
        Room_Name: room ? rooms.room_name : null,
        Date: booking.Date,
        start_time: booking.start_time,
        end_time: booking.end_time,
      };
    });
    res.status(200).json({
      message: "Customer data fetched successfully!",
      customerList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const CreateRoom = async (req, res) => {
  try {
    let id = rooms.length ? rooms[rooms.length - 1].room_id + 1 : 1;
    req.body.room_id = id;

    rooms.push(req.body);
    // console.log(req.body)
    await res.status(200).json({
      message: "Room added Successfully!",
      Room: rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

const deleteRoom = (req, res) => {
  try {
    const { id } = req.params;
    const index = findIndex(rooms, id);
    if (index !== -1) {
      rooms.splice(index, 1);
      res.status(200).send({
        message: "Room deleted succesfully",
      });
    } else {
      res.status(200).send({
        message: "Invalid room id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

const roomBooking = async (req, res) => {
  try {
    let { customer_name, start_time, end_time, roomID } = req.body;
    let date = new Date().toDateString();
    let room = rooms.filter((e) => {
      e.room_status === "available" && e.room_id == roomID;
    });
    if (!room) {
      res.status(400).json({
        message: "Room is not available",
      });
      return;
    } else {
      let booking = {
        customer_name,
        start_time,
        end_time,
        roomID,
        Date: date,
        booking_id: bookingRoom.length + 1,
        booking_date: new Date(),
        status: "booked",
      };

      bookingRoom.push(booking);
      res.status(200).json({
        message: "Room booking successfull!",
        BookingRoom: booking,
        bookingRoom,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const roomsBooked = async (req, res) => {
  try {
    let roomList = rooms.map((room) => {
      let booking = bookingRoom.find(
        (booking) => booking.roomID === room.room_id
      );
      console.log(booking);
      return {
        roomName: room.room_name,
        bookedStatus: booking ? "booked" : "available",
        customerName: booking ? booking.customer_name : null,
        // date: booking? booking.Date: null,
        // startTime: booking? booking.start_time: null,
        // endTime: booking? booking.end_time : null
      };
    });
    res.status(200).json({
      message: "Booking details of rooms fetched successfully!",
      roomList,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

const bookingCount = async (req, res) => {
  try {
    const { customer_name } = req.body;
    console.log("Requested customer Name:", customer_name);
    const customerBooking = bookingRoom.filter((e) => {
      console.log("Booking customer name:", e.customer_name);
      return e.customer_name === customer_name;
    });
    console.log("Customer Booking:", customerBooking);

    res.status(200).json({
      message: "Successfully fetched",
      customer_name,
      booking_count: bookingRoom.length,
      bookings: bookingRoom,
    });
  } catch (error) {
    console.error("Error in bookCount:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  allRooms,
  allCustomer,
  CreateRoom,
  deleteRoom,
  roomBooking,
  roomsBooked,
  bookingCount,
};
