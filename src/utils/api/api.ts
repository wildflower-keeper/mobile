import axios from 'axios';
import authStore from '@/utils/tokenStorage/tokenStorage';

export const weatherAxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

const interceptors = {
  onRequest: async (option?: RequestInit): Promise<RequestInit> => {
    const headers = new Headers(option?.headers);
    headers.set('content-type', 'application/json');
    headers.set('auth-token', await authStore.getAccessToken());
    headers.set('accept', '*/*');

    return {...option, headers};
  },
  onResponse: async <T>(response: Response) => {
    const data: T | null =
      response.ok && response.headers.get('content-type') === 'application/json'
        ? await response.json()
        : null;

    return {
      status: response.status,
      statusText: response.statusText,
      data,
    };
  },
  onError: (message: string, e: Error) => {
    console.error(message, e);
  },
};

async function doFetch<T>(url: string, option?: RequestInit): Promise<{ status: number; statusText: string; data: T | null}> {
  try {
    const config = await interceptors.onRequest(option);

    return await fetch(
      'https://api.wildflower-gardening.com' + url,
      config,
    ).then(interceptors.onResponse<T>);
  } catch (error) {
    const e = error as Error;
    interceptors.onError(`${option?.method} ${url} |`, e);

    return {
      status: 500,
      statusText: e.message ?? '고객센터로 문의해주세요',
      data: null,
    };
  }
}

export const GET = <T>(url: string, option?: RequestInit) =>
  doFetch<T>(url, {...option, method: 'GET'});
export const POST = <T>(url: string, option?: RequestInit) =>
  doFetch<T>(url, {...option, method: 'POST'});
export const DELETE = <T>(url: string, option?: RequestInit) =>
  doFetch<T>(url, {...option, method: 'DELETE'});
export const PUT = <T>(url: string, option?: RequestInit) =>
  doFetch<T>(url, {...option, method: 'PUT'});
