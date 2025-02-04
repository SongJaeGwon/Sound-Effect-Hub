import { Test, TestingModule } from '@nestjs/testing';
import { ElevenlabsController } from './elevenlabs.controller';
import { ElevenlabsService } from './elevenlabs.service';

describe('ElevenlabsController', () => {
  let controller: ElevenlabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElevenlabsController],
      providers: [ElevenlabsService],
    }).compile();

    controller = module.get<ElevenlabsController>(ElevenlabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
