import axios from 'axios';
import {getAccessToken} from '@/utils/api/auth';

export const weatherAxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

const hasAuthToken = (header: HeadersInit | undefined): boolean => {
  if (!header) {
    return false;
  }

  if (header instanceof Headers) {
    return header.has("auth-token") && !!header.get("auth-token");
  }

  if (header instanceof Array) {
    const authTokenArray = header.find((array) => array[0] === "auth-token");
    return !authTokenArray || !authTokenArray[1];
  }

  return "auth-token" in header && !!header["auth-token"];
};

const interceptors = {
  onRequest: async (option?: RequestInit): RequestInit => {
    const headers = new Headers(option?.headers);
    if (hasAuthToken(headers)) {
      // TODO 여기에서만 token 셋팅하도록 변경하면 좋을 듯
      const token = await getAccessToken();
      headers.set('auth-token', token);
    }

    return { ...option, headers };
  },
  onResponse: async (response) => {
    const data = response.headers.get('content-type') === 'application/json'
      ? await response.json()
      : response;

    return {
      status: 200,
      statusText: 'ok',
      data
    };
  },
  onError: (message, e) => {
    console.error(message, e);
    throw e;
  }
};

type Response<T> = {
  status: number;
  statusText: string;
  data: T;
};

async function doFetch<T>(url: string, option?: RequestInit): Promise<Response<T>> {
  try {
    const config = await interceptors.onRequest(option);

    return await fetch(
      'https://api.wildflower-gardening.com' + url,
      config
    )
    .then(interceptors.onResponse)
    .catch(e => {
      throw e;
    });
  } catch(error) {
    interceptors.onError(`${option.method} ${url} |`, error);
  }
}

export const GET = <T>(url: string, option: RequestInit) =>
  doFetch<T>(url, { ...option, method: 'GET' });
export const POST = <T>(url: string, option: RequestInit) =>
  doFetch<T>(url, { ...option, method: 'POST' });
export const DELETE = <T>(url: string, option: RequestInit) =>
  doFetch<T>(url, { ...option, method: 'DELETE' });
