import {RegExpHighlighter} from './regexphighlighter.pipe';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {inject,TestBed} from '@angular/core/testing';

describe('HighlighterPipe', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BrowserModule
    ],
  }));

  it('should highlight this pattern N-N', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new RegExpHighlighter();
    let output = pipe.transform('/\d{1,3}[-]\d{1,3}/','N-N');
    expect(output).toBe(pipe.getWrapperTagStart()+'/\d{1,3}[-]\d{1,3}/'+pipe.getWrapperTagEnd());
  }));
  it('should highlight this pattern NNN-', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new RegExpHighlighter();
    // <span style="background:#F60;display:inline-block;color:#FFF;">\d{1,3}[-</span>]\d{1,3}/
    let output = pipe.transform('/\d{1,3}[-]\d{1,3}/','NNN-');
    expect(output).toBe(pipe.getWrapperTagStart()+'/\d{1,3}[-]'+pipe.getWrapperTagEnd()+'\d{1,3}/');
  }));
  it('should highlight this pattern NN-NN', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new RegExpHighlighter();
    // <span style="background:#F60;display:inline-block;color:#FFF;">\d{1,3}[-</span>]\d{1,3}/
    let output = pipe.transform('/\d{1,3}[-]\d{1,3}/','NN-NN');
    expect(output).toBe(pipe.getWrapperTagStart()+'/\d{1,3}[-]\d{1,3}/'+pipe.getWrapperTagEnd());
  }));

});
