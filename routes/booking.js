// routes/booking.js
const express = require('express');
const router = express.Router();
const { Booking, GymSlot } = require('../models'); // Adjust the path as per your project structure

// POST /api/bookings
router.post('/', async (req, res) => {
    const { user_id, gym_id, gym_slot_id, booking_date, booking_time, payment_status } = req.body;

    try {
        // Start a transaction
        const result = await Booking.sequelize.transaction(async (t) => {
            // Check the capacity of the selected slot
            const slot = await GymSlot.findOne({ where: { gym_slot_id: gym_slot_id }, transaction: t });

            if (!slot) {
                return res.status(404).json({ message: 'Gym slot not found' });
            }

            if (slot.capacity <= 0 || !slot.active) {
                return res.status(400).json({ message: 'Slot is not available for booking' });
            }

            // Create a booking
            const booking = await Booking.create({
                user_id,
                gym_id,
                gym_slot_id,
                booking_date,
                booking_time,
                payment_status,
            }, { transaction: t });

            // Reduce the capacity of the slot
            slot.capacity -= 1;

            // If capacity is zero, deactivate the slot
            if (slot.capacity === 0) {
                slot.active = false;
            }

            await slot.save({ transaction: t });

            // Commit the transaction and return the booking data
            return res.status(201).json({
                message: 'Booking successful',
                booking,
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while processing your booking' });
    }
});

module.exports = router;
