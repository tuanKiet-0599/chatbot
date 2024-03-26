import { IsNotEmpty, IsString } from "class-validator";

export class GetThatCompletionAnswerInputDTO {
    @IsString()
    @IsNotEmpty()
    message: string;
}


export class GetThatCompletionAnswerOutputDTO {
    @IsString()
    @IsNotEmpty()
    aiMessage: string;

    static getInstance(aiMessage: string) {
        const result = new GetThatCompletionAnswerOutputDTO();
        result.aiMessage = aiMessage;
        return result;
    }
}


