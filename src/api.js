import serverUrl from './config';

export function fetchData(endpoint) {
  return fetch(`${serverUrl}/api/${endpoint}`)
    .then(response => response.json());
}