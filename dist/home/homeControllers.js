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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/movie");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = yield response.json();
        // Preprocess movie data to correct the image path
        const processedData = data.map((movie) => {
            // Assuming movie.image contains 'src/uploads/...'
            if (movie.image && movie.image.startsWith('src\\')) {
                movie.image = movie.image.replace('src\\', ''); // Remove 'src/' prefix
            }
            return movie;
        });
        // Pass the processed data to EJS template
        res.render("movieList", { data: processedData });
    }
    catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("An error occurred while fetching movies.");
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.params.id;
        // Fetch movie details from the API or database
        const response = yield fetch(`http://localhost:3000/movie/${movieId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch movie details.");
        }
        const movie = yield response.json();
        // Preprocess the movie image path if needed
        if (movie.image && movie.image.startsWith('src\\')) {
            movie.image = movie.image.replace('src\\', '');
        }
        // Render the movie details template
        res.render("movieDetail", { movie });
    }
    catch (error) {
        console.error("Error fetching movie details:", error);
        res.status(500).send("An error occurred while fetching movie details.");
    }
}));
exports.default = router;
