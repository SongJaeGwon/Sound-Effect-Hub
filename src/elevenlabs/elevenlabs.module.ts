import { Module } from '@nestjs/common';
import { ElevenLabsService } from './elevenlabs.service';
import { ElevenLabsController } from './elevenlabs.controller';

@Module({
  controllers: [ElevenLabsController],
  providers: [ElevenLabsService],
})
export class ElevenLabsModule {}
