import { genericRetryStrategy } from '../helpers';
import { Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, retryWhen } from 'rxjs/operators';

export const jsonplaceholderInstance$ = (endpoint: string, settings?: RequestInit | undefined) => {
  return fromFetch(`https://jsonplaceholder.typicode.com/${endpoint}`, settings);
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

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

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

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
