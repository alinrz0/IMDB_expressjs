import { IsDefined, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

class CreateMovieDto{
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    image!: string;

    @IsString()
    @IsNotEmpty()
    user_id!: any;
}


export default CreateMovieDto;