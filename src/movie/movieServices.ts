import ServerError from '../errors/serverError';
import MoviesModel from '../models/moviesModel';
import movieModel from '../models/moviesModel';  // Assuming you renamed the model file to moviesModel
import GetAllMoviesDto from './dtos/getAllMovieDto';  // Adjusted to the correct DTO for movies
import CreateMovieDto from './dtos/movieCreateDto';    // Adjusted to the correct DTO for creating movies

// export const getAllMovies = async (filters: GetAllMoviesDto) => {
//     const { tags, start_price, end_price, page, page_size } = filters;
//     let query: any = {};
//     if (tags) {
//         query["tags"] = { $in: [tags] };
//     }
//     if (start_price && end_price) {
//         query["price"] = { $gte: start_price, $lte: end_price };
//     }
//     const result = await movieModel.find(query, {}, { skip: page_size * (page - 1), limit: page_size });
//     return result;
// };

// export const getOneMovie = async (id: string) => {
//     const result = await movieModel.findById(id);
//     if (!result) {
//         throw new ServerError(404, "Movie not found");
//     }
//     return result;
// };

export const createNewMovie = async (data: CreateMovieDto) => {
    const result = await movieModel.create(data);
    return result;
};



// export const updateMovie = async (id: string, data: CreateMovieDto) => {
//     const movie = await movieModel.findOne({ "_id": id, user: data.user });
//     if (!movie) {
//         throw new ServerError(404, "Movie not found");
//     }
//     // update movie by dto 
//     const result = await movieModel.findByIdAndUpdate(id, { $set: data });
//     return result;
// };

// export const deleteMovie = async (id: string, user: string) => {
//     const movie = await movieModel.findOne({ "_id": id, user });
//     if (!movie) {
//         throw new ServerError(404, "Movie not found");
//     }
//     const result = await movieModel.deleteOne({ "_id": id });
//     return result;
// };
