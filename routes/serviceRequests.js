const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/serviceRequest");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeAdmin = require("../middleware/authorizeAdmin.js");

// Create a new service request
router.post("/", authenticateToken, async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.create(req.body);
    res.status(201).json(serviceRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update service request status
router.put("/:id", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id);
    if (!serviceRequest)
      return res.status(404).json({ message: "Service request not found" });

    await serviceRequest.update(req.body);
    res.json(serviceRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
