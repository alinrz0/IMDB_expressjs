import { Router, Request, Response, NextFunction } from "express";
import {createMovie,updateMovie,deleteMovie } from "./movieServices";
import CreateMovieDto from "./dtos/movieCreateDto";
import movieModel from '../models/moviesModel'; 
import { decodeToken } from './../utils/index';
import logger from "../helper/logger";


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


// Create a new movie
router.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: CreateMovieDto = req.body;
        const token = req.cookies.token?.token;

        if (!token) {
            res.status(401).json({ message: "Token not found or invalid" });
            return;
        }

        const result = await createMovie(data, token);
        res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        next(error);
    }
});

// Update a movie by ID
router.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const movieId = parseInt(req.params.id);
        const data: Partial<CreateMovieDto> = req.body;
        const token = req.cookies.token?.token;

        if (!token) {
            res.status(401).json({ message: "Token not found or invalid" });
            return;
        }

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
