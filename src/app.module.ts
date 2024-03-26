import { Module } from '@nestjs/common';

import { ChatCompletionApiModule } from './chat-completion-api/chat-completion-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ChatCompletionApiModule, ConfigModule.forRoot({
    isGlobal: true
  })],
})
export class AppModule {}
