import fetch from 'node-fetch';
import AbortController from 'abort-controller';

global.fetch = fetch as any;
global.AbortController = AbortController;
