import { Controller, Post, Body } from '@nestjs/common';
import { ElevenLabsService } from './elevenlabs.service';

@Controller('elevenlabs')
export class ElevenLabsController {
  constructor(private readonly elevenLabsService: ElevenLabsService) {}

  @Post('generate')
  async generateSound(
    @Body() body: { text: string; duration?: number; influence?: number },
  ) {
    const audioStream = await this.elevenLabsService.textToSoundEffect(
      body.text,
      body.duration,
      body.influence,
    );

    return audioStream;

    // res.setHeader('Content-Type', 'audio/mp3'); // 오디오 파일 형식 지정
    // res.setHeader('Transfer-Encoding', 'chunked'); // 청크 인코딩 설정
    // audioStream.pipe(res); // 스트림을 응답으로 전달
  }
}
