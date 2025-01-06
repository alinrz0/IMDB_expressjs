import { Router, Request, Response, NextFunction } from "express";
import {AuthMiddlware } from "../middlewares";
// import { getAllMovies, createNewMovie, updateMovie, deleteMovie, getOneMovie } from "./movieServices";
import {createNewMovie } from "./movieServices";
import CreateMovieDto from "./dtos/movieCreateDto";
import GetAllMoviesDto from "./dtos/getAllMovieDto";

import { decodeToken } from './../utils/index';


const router = Router();

// Route to get all movies
// router.get("/", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const filters: any = req.query;
//         const result = await getAllMovies(filters);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });

// // Route to get one movie by id
// router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id: string = req.params.id;
//         const result = await getOneMovie(id);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });

// Route to create a new movie
router.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: CreateMovieDto = req.body;

        // Extract token from authorization header or cookies
        const token = req.cookies.token.token;

        if (!token) {
            res.status(401).json({ message: 'Token not found or invalid' });
            return;
        }

        // Decode the token to get user details
        const user = decodeToken(token);

        // Create a new movie with user_id
        const result = await createNewMovie({ ...data, user_id: user.id });

        // Send the created movie as response
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        next(error); // Pass error to the next middleware (error handler)
    }
});

// Route to update a movie by id
// router.put("/:id", AuthMiddleware, async (req: RequestWithUser, res: Response, next: NextFunction) => {
//     try {
//         const data: CreateMovieDto = req.body;
//         const id: string = req.params.id;
//         const result = await updateMovie(id, { ...data, user: req.user });
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });

// // Route to delete a movie by id
// router.delete("/:id", AuthMiddleware, async (req: RequestWithUser, res: Response, next: NextFunction) => {
//     try {
//         const id: string = req.params.id;
//         const result = await deleteMovie(id, req.user);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });

export default router;
