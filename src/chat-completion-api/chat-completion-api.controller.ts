import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ChatCompletionApiService } from './chat-completion-api.service';
import { GetThatCompletionAnswerInputDTO } from './model/chat-completion-answer.dto';

@Controller('chat-completion-api')
export class ChatCompletionApiController {
    constructor(private readonly service: ChatCompletionApiService) {}
    @Post()
    getChatCompletionMessage(
      @Body(new ValidationPipe({transform: true})) 
      data: GetThatCompletionAnswerInputDTO
    ) {
      return this.service.getAiModelAnswer(data);
    }
}
