const nasaApi = require('../controller/nasaController');
const express = require('express');
const router = express.Router();
//const testes = require('../services/testes')
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Middleware to parse JSON bodies
router.use(express.json());

// ---------- ROTAS TEMPERATURA ---------- //
router.post("/temp", nasaApi.getTempData);
router.post("/temp/wk", nasaApi.getWkTempData);
//router.post("/temp/avg", nasaApi.getAvgTempData);

// ---------- ROTAS HUMIDADE ---------- //
router.post("/humi", nasaApi.getHumData);
router.post("/humi/wk", nasaApi.getWkHumData);
//router.post("/humi/avg", nasaApi.getAvgHumData);

// ---------- ROTAS PRECIPITAÇÃO ----------//
router.post("/prec", nasaApi.getPrecData);
router.post("/prec/wk", nasaApi.getWkPrecData);
router.post('/prec/avg', nasaApi.getAvgPrecData);

module.exports = router;