import { Router, Request, Response, NextFunction } from "express";
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
        const response = await fetch("http://localhost:3000/movie");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Preprocess movie data to correct the image path
        const processedData = data.map((movie: any) => {
            // Assuming movie.image contains 'src/uploads/...'
            if (movie.image && movie.image.startsWith('src\\')) {
                movie.image = movie.image.replace('src\\', ''); // Remove 'src/' prefix
            }
            return movie;
        });

        // Pass the processed data to EJS template
        res.render("movieList", { data: processedData });

    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("An error occurred while fetching movies.");
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


export default router;
