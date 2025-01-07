"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieServices_1 = require("./movieServices");
const moviesModel_1 = __importDefault(require("../models/moviesModel"));
const index_1 = require("./../utils/index");
const logger_1 = __importDefault(require("../helper/logger"));
const multer_1 = require("../multer");
const router = (0, express_1.Router)();
router.get("/my", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies.token) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res.status(401).json({ message: "Token not found or invalid" });
            return;
        }
        // Decode token to get user details
        const user = (0, index_1.decodeToken)(token);
        // Fetch all movies created by the logged-in user
        const userMovies = yield moviesModel_1.default.findAll({ where: { user_id: user.id } });
        res.status(200).json(userMovies);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
}));
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield moviesModel_1.default.findAll();
        res.status(200).json(movies);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
}));
// Get a single movie by ID
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = parseInt(req.params.id);
        const movie = yield moviesModel_1.default.findOne({ where: { id: movieId } });
        if (!movie) {
            res.status(404).json({ message: "Movie not found" });
            return;
        }
        res.status(200).json(movie);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
}));
// Define the route with multer
router.post("/", multer_1.upload.single("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = req.body;
        const token = (_a = req.cookies.token) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res.status(401).json({ message: "Token not found or invalid" });
            return;
        }
        // If an image file was uploaded, append the image path to the movie data
        if (req.file) {
            data.image = req.file.path; // Save the path of the uploaded image
        }
        // Create the movie
        const result = yield (0, movieServices_1.createMovie)(data, token);
        res.status(200).json(result);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
}));
// Update a movie by ID
// Update a movie by ID with optional image upload
router.put("/:id", multer_1.upload.single("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const movieId = parseInt(req.params.id);
        const data = req.body;
        const token = (_a = req.cookies.token) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res.status(401).json({ message: "Token not found or invalid" });
            return;
        }
        // If a new image is uploaded, append the image path to the movie data
        if (req.file) {
            // Optionally, delete the old image from disk if it exists
            if (data.image) {
                // Delete old image from disk (you might need to use 'fs' to delete the old file)
                const fs = require('fs');
                fs.unlink(data.image, (err) => {
                    if (err) {
                        console.error("Failed to delete old image", err);
                    }
                    else {
                        console.log("Old image deleted successfully");
                    }
                });
            }
            data.image = req.file.path; // Save the new image path
        }
        // Update the movie with the provided data
        const result = yield (0, movieServices_1.updateMovie)(movieId, data, token);
        res.status(200).json(result);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
}));
// Delete a movie by ID
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const movieId = parseInt(req.params.id);
        const token = (_a = req.cookies.token) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res.status(401).json({ message: "Token not found or invalid" });
            return;
        }
        const result = yield (0, movieServices_1.deleteMovie)(movieId, token);
        res.status(200).json(result);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
}));
exports.default = router;
