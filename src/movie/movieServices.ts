import { decodeToken } from "../utils";
import MoviesModel  from "../models/moviesModel";
import CreateMovieDto  from "./dtos/movieCreateDto";

export const createMovie = async (data: CreateMovieDto, token: string) => {
    const user = decodeToken(token);
    return await MoviesModel.create({ ...data, user_id: user.id });
};

export const updateMovie = async (movieId: number, data: Partial<CreateMovieDto>, token: string) => {
    const user = decodeToken(token); 

    // Find the movie to ensure it exists and belongs to the user
    const movie = await MoviesModel.findOne({ where: { id: movieId, user_id: user.id } });

    if (!movie) {
        throw new Error("Movie not found or you do not have permission to update it");
    }
    return await movie.update(data);
};

export const deleteMovie = async (movieId: number, token: string) => {
    const user = decodeToken(token); 

    // Find the movie to ensure it exists and belongs to the user
    const movie = await MoviesModel.findOne({ where: { id: movieId, user_id: user.id } });

    if (!movie) {
        throw new Error("Movie not found or you do not have permission to delete it");
    }
    await movie.destroy();
    return { message: "Movie deleted successfully" };
};
