import { Router, Request, Response, NextFunction } from "express";
import {createMovie,updateMovie,deleteMovie } from "./movieServices";
import CreateMovieDto from "./dtos/movieCreateDto";
import movieModel from '../models/moviesModel'; 
import { decodeToken } from './../utils/index';
import logger from "../helper/logger";
import { upload } from "../multer";

const router = Router();

router.get("/my", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token?.token;
        if (!token) {
            res.status(401).json({ message: "Token not found or invalid" });
            return;
        }
        // Decode token to get user details
        const user = decodeToken(token);
        // Fetch all movies created by the logged-in user
        const userMovies = await movieModel.findAll({ where: { user_id: user.id } });
        res.status(200).json(userMovies);
    } catch (error) {
        logger.error(error);
        next(error);
    }
});

router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const movies = await movieModel.findAll();
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});



// Get a single movie by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const movieId = parseInt(req.params.id);
        const movie = await movieModel.findOne({ where: { id: movieId } });

        if (!movie) {
            res.status(404).json({ message: "Movie not found" });
            return;
        }

        res.status(200).json(movie);
    } catch (error) {
        logger.error(error);
        next(error);
    }
});


// Define the route with multer
router.post("/", upload.single("image"), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    try {
        const data: CreateMovieDto = req.body;

        const token = req.cookies.token?.token;
        if (!token) {
            res.status(401).json({ message: "Token not found or invalid" });
            return;
        }

        // If an image file was uploaded, append the image path to the movie data
        if (req.file) {
            data.image = req.file.path; // Save the path of the uploaded image
        }

        // Create the movie
        const result = await createMovie(data, token);

        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        next(error);
    }
});


// Update a movie by ID
// Update a movie by ID with optional image upload
router.put("/:id", upload.single("image"), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const movieId = parseInt(req.params.id);
        const data: Partial<CreateMovieDto> = req.body;
        const token = req.cookies.token?.token;

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
                fs.unlink(data.image, (err: Error) => {
                    if (err) {
                        console.error("Failed to delete old image", err);
                    } else {
                        console.log("Old image deleted successfully");
                    }
                });
            }
            data.image = req.file.path; // Save the new image path

            
        }

        // Update the movie with the provided data
        const result = await updateMovie(movieId, data, token);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        next(error);
    }
});


// Delete a movie by ID
router.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const movieId = parseInt(req.params.id);
        const token = req.cookies.token?.token;

        if (!token) {
            res.status(401).json({ message: "Token not found or invalid" });
            return;
        }

        const result = await deleteMovie(movieId, token);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        next(error);
    }
});




export default router;
