const express = require("express");
const router = express.Router();
const { User, Admin, Request } = require("../models");

router.post("/admins", async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/requests/not-pending", async (req, res) => {
  try {
    await Request.deleteMany({ status: { $ne: "pending" } });
    res.status(200).json({ message: "All non-pending requests deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/requests", async (req, res) => {
  try {
    const { firstName, lastName, id, reason } = req.body;
    const newRequest = await Request.create({ firstName, lastName, id, reason });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/requests/pending", async (req, res) => {
  try {
    const requests = await Request.find({
      status: "pending",
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/requests/not-pending", async (req, res) => {
  try {
    const requests = await Request.find({
      status: { $ne: "pending" },
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/requests", async (req, res) => {
  try {
    const { status,id } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
