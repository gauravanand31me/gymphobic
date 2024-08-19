var express = require('express');
var router = express.Router();
const { GymSlot, Slot } = require('../models'); // Adjust the path as needed

router.post('/create-24-hour-slots', async (req, res) => {
    try {
      const slots = [];
      const times = [
        "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
        "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
        "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
        "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
      ];
  
      for (let i = 0; i < times.length; i++) {
        let slot_start_time = times[i];
        let slot_end_time = times[(i + 1) % times.length];
        
        // Insert into the array of slots
        slots.push({
          slot_start_time: slot_start_time,
          slot_end_time: slot_end_time,
        });
      }
  
      // Bulk insert the slots into the database
      await Slot.bulkCreate(slots);
  
      res.status(201).json({ message: '24-hour slots created successfully', slots });
    } catch (error) {
      console.error('Error creating slots:', error);
      res.status(500).json({ error: 'An error occurred while creating slots' });
    }
  });


  router.get('/slots', async (req, res) => {
    try {
      // Fetch all slots from the database
      const slots = await Slot.findAll({
        order: [['slot_start_time', 'ASC']], // Order by slot start time
      });
  
      // Return the slots as a JSON response
      res.status(200).json({ slots });
    } catch (error) {
      console.error('Error fetching slots:', error);
      res.status(500).json({ error: 'An error occurred while fetching slots' });
    }
  });



  router.post('/gyms/:gym_id', async (req, res) => {
    try {
      const { gym_id } = req.params;
      const { slot_id, capacity, cost, active } = req.body;
  
      // Validate required fields
      if (!slot_id || capacity === undefined || cost === undefined) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }
  
      // Create a new gym slot entry
      const newGymSlot = await GymSlot.create({
        gym_id,
        slot_id,
        capacity,
        cost,
        active: active !== undefined ? active : true, // Default to true if not provided
      });
  
      res.status(201).json({ message: 'Slot added successfully', newGymSlot });
    } catch (error) {
      console.error('Error adding slot:', error);
      res.status(500).json({ error: 'An error occurred while adding the slot' });
    }
  });



  router.get('/gyms/:gym_id', async (req, res) => {
    try {
      const { gym_id } = req.params;
      const { slot_id } = req.query; // Optional query parameter
  
      // Build the query options
      const queryOptions = {
        where: { gym_id },
        include: [
          {
            model: Slot,
            as: 'slot',
            attributes: ['slot_start_time', 'slot_end_time']
          }
        ],
        attributes: ['gym_id', 'slot_id', 'capacity', 'cost', 'active']
      };
  
      // Add slot_id filter if provided
      if (slot_id) {
        queryOptions.where.slot_id = slot_id;
      }
  
      // Fetch the slots based on the query options
      const gymSlots = await GymSlot.findAll(queryOptions);
  
      // Check if any slots were found
      if (gymSlots.length === 0) {
        return res.status(404).json({ message: 'No slots found for this gym' });
      }
  
      // Return the slots with details
      res.status(200).json({ gymSlots });
    } catch (error) {
      console.error('Error fetching slots:', error);
      res.status(500).json({ error: 'An error occurred while fetching slots' });
    }
  });


  module.exports = router;