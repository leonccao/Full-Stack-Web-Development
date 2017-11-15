import { baseURL } from './baseurl';

export function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl(baseURL);
}