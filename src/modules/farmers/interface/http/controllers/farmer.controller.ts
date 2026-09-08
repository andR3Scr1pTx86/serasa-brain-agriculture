import { Body, Controller, Post } from "@nestjs/common";
import { CreateFarmerRequestDto } from "../dtos/create-farmer-request.dto.js";
import { CreateFarmerUseCase } from "../../../application/use-cases/create-farmer.use-case.js";

@Controller('farmers')
export class FarmerController {
    constructor(private readonly createFarmerUseCase: CreateFarmerUseCase) { }

    @Post()
    async create(@Body() body: CreateFarmerRequestDto) {
        return this.createFarmerUseCase.execute({
            name: body.name,
            document: body.document
        });
    }
}