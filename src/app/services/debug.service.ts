import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RxJsLoggingLevel } from '../enums/rxJsLoggingLevel.enum';

let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
  rxjsLoggingLevel = level;
}


export const debug = (level: number, message: string) =>
  (source: Observable<any>) => source
    .pipe(
      tap(val => {
        if (level >= rxjsLoggingLevel) {
          console.log(message + ': ', val);
        }
      })
    );