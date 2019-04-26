import { RegExpSearchPipe } from './reg-exp-search.pipe';

describe('RegExpSearchPipe', () => {
    it('should find 2 regexes by using pattern N-N', () => {
        const pipe = new RegExpSearchPipe();
        let regexes: string[] = [
            '\\d{1,3}[-]\\d{1,3}', // 123-456 or 678-000
            '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}' // 123-456/a or 123-456/abc
        ];
        let result = pipe.transform(regexes, {searchTerm: '1-3'});
        expect(result.length).toBe(2);
    });
    it('should find 2 regexes by using pattern NNN-NN', () => {
        const pipe = new RegExpSearchPipe();
        let regexes: string[] = [
            '\\d{1,3}[-]\\d{1,3}', // 123-456 or 678-000
            '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}' // 123-456/a or 123-456/abc
        ];
        let result = pipe.transform(regexes, {searchTerm: '122-32'});
        expect(result.length).toBe(2);
    });
    it('should find 2 regexes by using pattern NN-NNN', () => {
        const pipe = new RegExpSearchPipe();
        let regexes: string[] = [
            '\\d{1,3}[-]\\d{1,3}', // 123-456 or 678-000
            '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}' // 123-456/a or 123-456/abc
        ];
        let result = pipe.transform(regexes, {searchTerm: '12-333'});
        expect(result.length).toBe(2);
    });
    it('should find 1 regexes by using pattern N-N/L', () => {
        const pipe = new RegExpSearchPipe();
        let regexes: string[] = [
            '\\d{1,3}[-]\\d{1,3}', // 123-456 or 678-000
            '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}' // 123-456/a or 123-456/abc
        ];
        let result = pipe.transform(regexes, {searchTerm: '1-3/a'});
        expect(result.length).toBe(1);
    });
    it('should find 1 regexes by using pattern N-N/LLL', () => {
        const pipe = new RegExpSearchPipe();
        let regexes: string[] = [
            '\\d{1,3}[-]\\d{1,3}', // 123-456 or 678-000
            '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}' // 123-456/a or 123-456/abc
        ];
        let result = pipe.transform(regexes, {searchTerm: '1-3/abc'});
        expect(result.length).toBe(1);
    });
    it('should find 0 regexes by using pattern N-L', () => {
        const pipe = new RegExpSearchPipe();
        let regexes: string[] = [
            '\\d{1,3}[-]\\d{1,3}', // 123-456 or 678-000
            '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}' // 123-456/a or 123-456/abc
        ];
        let result = pipe.transform(regexes, {searchTerm: '1-c'});
        expect(result.length).toBe(0);
    });
    it('should find 0 regexes by using pattern N-N/LNL', () => {
        const pipe = new RegExpSearchPipe();
        let regexes: string[] = [
            '\\d{1,3}[-]\\d{1,3}', // 123-456 or 678-000
            '\\d{1,3}[-]\\d{1,3}[/]\\w{1,3}' // 123-456/a or 123-456/abc
        ];
        let result = pipe.transform(regexes, {searchTerm: '1-3/a2c'});
        expect(result.length).toBe(0);
    });
});
