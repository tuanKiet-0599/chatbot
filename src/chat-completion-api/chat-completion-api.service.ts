import { Injectable } from '@nestjs/common';
import { ChatHistoryManager } from './model/chat-history-manager';
import {ChatOpenAI} from 'langchain/chat_models/openai'
import { GetThatCompletionAnswerInputDTO, GetThatCompletionAnswerOutputDTO } from './model/chat-completion-answer.dto';
import { ConfigService } from '@nestjs/config';

const DEFAULT_TEMPERATURE = 1;

@Injectable()
export class ChatCompletionApiService {
    private readonly chatHistory: ChatHistoryManager
    private readonly chat: ChatOpenAI

    constructor(private readonly config: ConfigService) {
        this.chatHistory = new ChatHistoryManager();
        this.chat = new ChatOpenAI({
            temperature: DEFAULT_TEMPERATURE,
            openAIApiKey: config.get<string>('CHAT_BOT')
        })
    }

    async getAiModelAnswer (data: GetThatCompletionAnswerInputDTO) {
        this.chatHistory.addHumanMessage(data.message)
        const result = await this.chat.predictMessages(this.chatHistory.chatHistory)
        const aiMessage = result.content;
        if(aiMessage.includes('\n')) {
            aiMessage.replace('\n', ' ');
            console.log(aiMessage)
        } 
        this.chatHistory.addAiMessage(aiMessage);

        return GetThatCompletionAnswerOutputDTO.getInstance(aiMessage)
    }
}
