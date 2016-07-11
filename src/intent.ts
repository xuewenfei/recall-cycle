import { ISources } from './definitions';
import { Stream, MemoryStream } from 'xstream';

export interface IIntent {
  newGame$: MemoryStream<boolean>
  reset$: Stream<boolean>
  selectCell$: Stream<number>
}


function intent(sources: ISources): IIntent {

  const dom = sources.dom;

  const newGame$ = dom
    .select('.new')
    .events('click')
    .map(ev => {
      ev.preventDefault();
      return true;
    })
    .startWith(true);

  const reset$ = dom
    .select('.reset')
    .events('click')
    .map(ev => {
      ev.preventDefault();
      return true;
    });

  const selectCell$ = dom
    .select('.cell span')
    .events('click')
    .map(ev => {
      ev.preventDefault();
      return parseInt((ev.target as HTMLElement).parentElement.attributes['data-index'].value);
    });

  return {
    newGame$,
    reset$,
    selectCell$
  };
}

export default intent;