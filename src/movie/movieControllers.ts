import { Router, Request, Response, NextFunction } from "express";
import {AuthMiddlware } from "../middlewares";
// import { getAllMovies, createNewMovie, updateMovie, deleteMovie, getOneMovie } from "./movieServices";
import {createMovie,updateMovie,deleteMovie } from "./movieServices";
import CreateMovieDto from "./dtos/movieCreateDto";
import GetAllMoviesDto from "./dtos/getAllMovieDto";
import movieModel from '../models/moviesModel'; 
import { decodeToken } from './../utils/index';


const router = Router();

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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
        next(error);
    }
});




export default router;
