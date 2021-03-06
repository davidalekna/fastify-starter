import { genericRetryStrategy } from '../../helpers';
import { Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, retryWhen, timeout } from 'rxjs/operators';
import { Todo, User } from './types';

const URI = 'https://jsonplaceholder.typicode.com';

export const jsonplaceholderInstance$ = (endpoint: string, settings?: RequestInit | undefined) => {
  return fromFetch(`${URI}/${endpoint}`, settings).pipe(timeout(15000));
};

export const listUsers$: Observable<User[]> = jsonplaceholderInstance$('users').pipe(
  switchMap((response) => {
    if (response.ok) {
      // OK return data
      return response.json();
    } else {
      // Server is returning a status requiring the client to try something else.
      return of({ error: true, message: `Error ${response.status}` });
    }
  }),
  retryWhen(genericRetryStrategy()),
  catchError((err) => {
    // Network or other error, handle appropriately
    console.error(err);
    return of({ error: true, message: err.message });
  }),
);

export const listTodos$: Observable<Todo[]> = jsonplaceholderInstance$('todos').pipe(
  switchMap((response) => {
    if (response.ok) {
      // OK return data
      return response.json();
    } else {
      // Server is returning a status requiring the client to try something else.
      return of({ error: true, message: `Error ${response.status}` });
    }
  }),
  retryWhen(genericRetryStrategy()),
  catchError((err) => {
    // Network or other error, handle appropriately
    console.error(err);
    return of({ error: true, message: err.message });
  }),
);
