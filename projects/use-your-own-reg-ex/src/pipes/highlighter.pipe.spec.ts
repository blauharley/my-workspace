import {RegExTranslatorService} from '../services/reg-ex-translator.service';
import {RegExpHighlighter} from './regexphighlighter.pipe';

describe('HighlighterPipe', () => {
  it('create an instance', () => {
    const pipe = new RegExpHighlighter(new RegExTranslatorService());
    let output = pipe.transform('/\\d{1,3}[-]\\d{1,3}/','NNN-');
    expect(output).toBe(pipe.getWrapperTagStart()+'/\\d{1,3}[-'+pipe.getWrapperTagEnd()+']\\d{1,3}/');
    // <span style="background:#F60;display:inline-block;color:#FFF;">\d{1,3}[-</span>]\d{1,3}/
    output = pipe.transform('/\\d{1,3}[-]\\d{1,3}/','NNN-NNN');
    expect(output).toBe(pipe.getWrapperTagStart()+'/\\d{1,3}[-]\\d{1,3'+pipe.getWrapperTagEnd()+'}/');
  });
});
