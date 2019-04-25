import { NgModule } from '@angular/core';
import { UseYourOwnRegExComponent } from './use-your-own-reg-ex.component';
import {RegExpHighlighter} from '../pipes/regexphighlighter.pipe';
import {RegExpSearchPipe} from '../pipes/reg-exp-search.pipe';

@NgModule({
  declarations: [UseYourOwnRegExComponent, RegExpHighlighter, RegExpSearchPipe],
  imports: [],
  exports: [UseYourOwnRegExComponent, RegExpSearchPipe, RegExpHighlighter]
})
export class UseYourOwnRegExModule { }
