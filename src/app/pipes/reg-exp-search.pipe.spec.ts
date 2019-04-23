import { RegExpSearchPipe } from './reg-exp-search.pipe';
import {MyRegEx} from '../dataobjects/MyRegEx';

describe('RegExpSearchPipe', () => {
  it('create an instance', () => {
    const pipe = new RegExpSearchPipe();
    let regexes: MyRegEx[] = [
      new MyRegEx('Headproduct-Search', '\\d{1,3}[-]\\d{1,3}'), // 123-456 or 678-000
      new MyRegEx('Subproduct-Search', '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}') // 123-456/a or 123-456/abc
    ]
    let result = pipe.transform(regexes, '\\d{1,3}[-]');
    //expect(result.length).toBeGreaterThan();
  });
});
