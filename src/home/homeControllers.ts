import { Router, Request, Response, NextFunction } from "express";
import movieModel from '../models/moviesModel'; 
import { decodeToken } from './../utils/index';
import logger from "../helper/logger";


const router = Router();

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





router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const movieId = req.params.id;

        // Fetch movie details from the API or database
        const response = await fetch(`http://localhost:3000/movie/${movieId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch movie details.");
        }
        const movie = await response.json();

        // Preprocess the movie image path if needed
        if (movie.image && movie.image.startsWith('src\\')) {
            movie.image = movie.image.replace('src\\', '');
        }

        // Render the movie details template
        res.render("movieDetail", { movie });

    } catch (error) {
        console.error("Error fetching movie details:", error);
        res.status(500).send("An error occurred while fetching movie details.");
    }
});



export default router;
