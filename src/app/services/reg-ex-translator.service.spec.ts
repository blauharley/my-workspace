import { TestBed } from '@angular/core/testing';
import { RegExTranslatorService } from './reg-ex-translator.service';

describe('RegExTranslatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    expect(service).toBeTruthy();
  });
  it('should show 1X-NUMBER-1X-NUMBER COMBO', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\d{1,1}[-]\\d{1,1}';
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
      'N-N'
    ]);
  });
  it('should show 1X-NUMBER-3X-NUMBER COMBO', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\d{1,1}[-]\\d{1,3}';
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
        'N-N',
        'N-NN',
        'N-NNN'
    ]);
  });
  it('should show 3X-LETTER-1X-NUMBER COMBO', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\w{1,3}[-]\\d{1,1}';
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
      'L-N',
      'LL-N',
      'LLL-N'
    ]);
  });
  it('should show 2X-NUMBER-3X-NUMBER COMBO', () => {
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
  it('should show 3X-NUMBER-3X-NUMBER COMBO', () => {
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
  it('should show 3X-LETTER-3X-LETTER COMBO', () => {
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
  it('should show 3X-LETTER-3X-LETTER COMBO', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\w{1,3}[-]\\w{1,3}';
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
  it('should show 3X-NUMBER-3X-NUMBER-3X-NUMBER COMBO', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\d{1,3}[-]\\d{1,3}[-]\\d{1,3}';
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
      'N-N-N',
      'N-N-NN',
      'N-N-NNN',
      'N-NN-N',
      'N-NN-NN',
      'N-NN-NNN',
      'N-NNN-N',
      'N-NNN-NN',
      'N-NNN-NNN',
      'NN-N-N',
      'NN-N-NN',
      'NN-N-NNN',
      'NN-NN-N',
      'NN-NN-NN',
      'NN-NN-NNN',
      'NN-NNN-N',
      'NN-NNN-NN',
      'NN-NNN-NNN',
      'NNN-N-N',
      'NNN-N-NN',
      'NNN-N-NNN',
      'NNN-NN-N',
      'NNN-NN-NN',
      'NNN-NN-NNN',
      'NNN-NNN-N',
      'NNN-NNN-NN',
      'NNN-NNN-NNN'
    ]);
  });
  it('should show 3X-LETTER-3X-LETTER/3X-LETTER COMBO', () => {
    const service: RegExTranslatorService = new RegExTranslatorService();
    let testRegexp: string = '\\w{1,3}[-]\\w{1,3}[/]\\w{1,3}';
    expect(service.getHumanExpCombinations(testRegexp)).toEqual([
      'L-L/L',
      'L-L/LL',
      'L-L/LLL',
      'L-LL/L',
      'L-LL/LL',
      'L-LL/LLL',
      'L-LLL/L',
      'L-LLL/LL',
      'L-LLL/LLL',
      'LL-L/L',
      'LL-L/LL',
      'LL-L/LLL',
      'LL-LL/L',
      'LL-LL/LL',
      'LL-LL/LLL',
      'LL-LLL/L',
      'LL-LLL/LL',
      'LL-LLL/LLL',
      'LLL-L/L',
      'LLL-L/LL',
      'LLL-L/LLL',
      'LLL-LL/L',
      'LLL-LL/LL',
      'LLL-LL/LLL',
      'LLL-LLL/L',
      'LLL-LLL/LL',
      'LLL-LLL/LLL'
    ]);
  });
});
