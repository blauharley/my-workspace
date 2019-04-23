import { HighlighterPipe } from './highlighter.pipe';
import {DomSanitizer} from '@angular/platform-browser';

describe('HighlighterPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlighterPipe();
    let output = pipe.transform('/\\d{1,3}[-]\\d{1,3}/','\d{1,3}');
    let spanTag = pipe.getWrapperTag();
    expect(output).toBe('/\\d{<span style="background:#F60;display:inline-block;color:#FFF;">1</span>,3}[-]\\d{1,3}/');
  });
});
