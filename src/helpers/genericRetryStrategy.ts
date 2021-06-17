import { FetchError } from 'node-fetch';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

type Props = {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
};

export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 2000,
  excludedStatusCodes = [404, 500],
}: Props = {}) => {
  return (attempts: Observable<FetchError>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find((e) => e === Number(error.code))) {
          return throwError(() => new Error(error.message));
        }
        console.log(`Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);
        // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
      }),
      finalize(() => console.log('We are done!')),
    );
  };
};
