import express from "express";
import roomController from "../controller/room.js";

const router = express.Router();

router.get("/get-rooms", roomController.allRooms);
router.get("/customers", roomController.allCustomer);
router.post("/create-room", roomController.CreateRoom);
router.get("/booked-rooms", roomController.roomsBooked);
router.get("/booking-count/", roomController.bookingCount);
router.delete("/:id", roomController.deleteRoom);
router.post("/room-booking", roomController.roomBooking);

export default router;
