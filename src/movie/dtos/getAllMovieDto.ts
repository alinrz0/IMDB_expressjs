import { IsDefined, IsOptional, MaxLength, MinLength } from "class-validator";

class GetAllMovieDto{
    @MaxLength(20)
    @IsDefined()
    title : string;
    @IsDefined()
    description : string;
    @IsDefined()
    image : string;
}

export default GetAllMovieDto;