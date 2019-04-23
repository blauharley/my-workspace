import { HighlighterPipe } from './highlighter.pipe';
import {MyRegExValue} from '../dataobjects/MyRegEx';
import {RegExTranslatorService} from '../services/reg-ex-translator.service';

describe('HighlighterPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlighterPipe(new RegExTranslatorService());
    let output = pipe.transform(new MyRegExValue('/\\d{1,3}[-]\\d{1,3}/','NNN-NNN'),'NNN-');
    expect(output).toBe(pipe.getWrapperTagStart()+'/\\d{1,3}[-'+pipe.getWrapperTagEnd()+']\\d{1,3}/');
    // <span style="background:#F60;display:inline-block;color:#FFF;">\d{1,3}[-</span>]\d{1,3}/
    output = pipe.transform(new MyRegExValue('/\\d{1,3}[-]\\d{1,3}/','NNN-NNN'),'NNN-NNN');
    expect(output).toBe(pipe.getWrapperTagStart()+'/\\d{1,3}[-]\\d{1,3'+pipe.getWrapperTagEnd()+'}/');
  });
});
