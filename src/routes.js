// ===============================
// src/routes.js
// ===============================
const express = require("express");
const routes = express.Router();

const patient = require("./controllers/patient_controller");
const attendance = require("./controllers/attendance_controller");

// pacientes
routes.post("/patients", patient.create);
routes.get("/patients", patient.list);
routes.put("/patients/:id", patient.update);
routes.delete("/patients/:id", patient.delete);

// fila
routes.post("/queue", attendance.create);
routes.get("/queue", attendance.list);
routes.put("/queue/next", attendance.next);

module.exports = routes;