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
exports.deleteMovie = exports.updateMovie = exports.createMovie = void 0;
const utils_1 = require("../utils");
const moviesModel_1 = __importDefault(require("../models/moviesModel"));
const createMovie = (data, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, utils_1.decodeToken)(token); // Decode token to get user details
    return yield moviesModel_1.default.create(Object.assign(Object.assign({}, data), { user_id: user.id }));
});
exports.createMovie = createMovie;
const updateMovie = (movieId, data, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, utils_1.decodeToken)(token); // Decode token to get user details
    // Find the movie to ensure it exists and belongs to the user
    const movie = yield moviesModel_1.default.findOne({ where: { id: movieId, user_id: user.id } });
    if (!movie) {
        throw new Error("Movie not found or you do not have permission to update it");
    }
    // Update the movie
    return yield movie.update(data);
});
exports.updateMovie = updateMovie;
const deleteMovie = (movieId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, utils_1.decodeToken)(token); // Decode token to get user details
    // Find the movie to ensure it exists and belongs to the user
    const movie = yield moviesModel_1.default.findOne({ where: { id: movieId, user_id: user.id } });
    if (!movie) {
        throw new Error("Movie not found or you do not have permission to delete it");
    }
    // Delete the movie
    yield movie.destroy();
    return { message: "Movie deleted successfully" };
});
exports.deleteMovie = deleteMovie;
