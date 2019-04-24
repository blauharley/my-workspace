import { TestBed } from '@angular/core/testing';
import { RegExTranslatorService } from './reg-ex-translator.service';

describe('RegExTranslatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    expect(service).toBeTruthy();
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
    console.log(service.getHumanExpCombinations(testRegexp));
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
  it('should show 3x3 letter/letter-combinations', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\w{1,3}[-]\\w{1,3}';
    console.log(service.getHumanExpCombinations(testRegexp));
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
      'L-L',
      'L-LL',
      'L-LLL',
      'LL-L',
      'LL-LL',
      'LL-LLL',
      'LLL-L',
      'LLL-LL',
      'LLL-LLL'
    ]);
  });
  it('should show 3x3 letter/letter-combinations', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\w{1,3}[-]\\w{1,3}[/]\\w{1,3}';
    console.log(service.getHumanExpCombinations(testRegexp));
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
      'L-L-L',
      'LL-L-L',
      'LLL-L-L',
      'L-LL-L',
      'L-LLL-L',
      'L-L-LL',
      'L-L-LLL',
      'LLL-LLL-LLL',
      'LL-LLL-LLL',
      'L-LLL-LLL',
      'L-LL-LLL',
      'L-L-LLL',
      'L-L-LL',
      'LL-L-L',
    ]);
  });
});
