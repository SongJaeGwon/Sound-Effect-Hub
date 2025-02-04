import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ElevenLabsClient } from 'elevenlabs';

@Injectable()
export class ElevenLabsService {
  private client: ElevenLabsClient;
  private readonly logger = new Logger(ElevenLabsService.name);

  constructor() {
    this.client = new ElevenLabsClient({
      apiKey: process.env.ELEVEN_LABS_API_KEY,
    });
  }

  async textToSoundEffect(
    text: string,
    duration: number = 3,
    influence: number = 0.5,
  ) {
    if (!text || text.trim() === '') {
      throw new HttpException('Text field is required', HttpStatus.BAD_REQUEST);
    }

    this.logger.debug(
      `📢 요청 데이터: ${JSON.stringify({ text, duration, influence })}`,
    );

    try {
      const response = await this.client.textToSoundEffects.convert({
        text,
        duration_seconds: duration,
        prompt_influence: influence,
      });

      // ✅ 응답 객체 구조 확인
      this.logger.log(
        `✅ 응답 데이터 전체: ${JSON.stringify(response, null, 2)}`,
      );
      this.logger.log(`✅ 응답 keys: ${Object.keys(response)}`);

      // // ✅ 응답이 `ReadableStream`인지 확인
      // if (response instanceof ReadableStream) {
      //   this.logger.log(`🔄 ReadableStream 형태의 응답을 JSON으로 변환 중...`);

      //   const reader = response.getReader();
      //   let result = '';
      //   let done = false;

      //   while (!done) {
      //     const { value, done: readerDone } = await reader.read();
      //     done = readerDone;
      //     if (value) {
      //       result += new TextDecoder().decode(value);
      //     }
      //   }

      //   this.logger.log(`✅ 변환된 응답 데이터: ${result}`);
      //   return JSON.parse(result);
      // }

      return response;
    } catch (error) {
      this.logger.error(
        `❌ ElevenLabs API 오류: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        `ElevenLabs API Error: ${error.message}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
