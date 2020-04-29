import { Test, TestingModule } from '@nestjs/testing';
import { PasteResolver } from './paste.resolver';

describe('PasteResolver', () => {
  let resolver: PasteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasteResolver],
    }).compile();

    resolver = module.get<PasteResolver>(PasteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
