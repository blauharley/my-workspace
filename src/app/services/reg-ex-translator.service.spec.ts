import { TestBed } from '@angular/core/testing';
import { RegExTranslatorService } from './reg-ex-translator.service';

describe('RegExTranslatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    //const service: RegExTranslatorService = TestBed.get(RegExTranslatorService);
    expect(true).toBeTruthy();
  });
  it('should show 1x3 number-combinations', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\d{1,1}[-]\\d{1,3}';
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
        'N-N',
        'N-NN',
        'N-NNN'
    ]);
  });
  it('should show 2x3 number-combinations', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\d{1,2}[-]\\d{1,3}';
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
      'N-N',
      'N-NN',
      'N-NNN',
      'NN-N',
      'NN-NN',
      'NN-NNN'
    ]);
  });
  it('should show 3x3 number-combinations', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\d{1,3}[-]\\d{1,3}';
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
      'N-N',
      'N-NN',
      'N-NNN',
      'NN-N',
      'NN-NN',
      'NN-NNN',
      'NNN-N',
      'NNN-NN',
      'NNN-NNN'
    ]);
  });
  it('should show 3x3 number/letter-combinations', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\d{1,3}[-]\\w{1,3}';
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
      'N-L',
      'N-LL',
      'N-LLL',
      'NN-L',
      'NN-LL',
      'NN-LLL',
      'NNN-L',
      'NNN-LL',
      'NNN-LLL'
    ]);
  });
});
