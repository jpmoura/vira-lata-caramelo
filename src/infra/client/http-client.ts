import { AxiosRequestConfig } from 'axios';

export default class HttpClient {
  async make<T>(request: AxiosRequestConfig): Promise<T> {
    const rawResponse = await window.electron.httpApi.makeRequest(request);
    return JSON.parse(rawResponse) as T;
  }

  async getBase64(url: string): Promise<string> {
    const request: AxiosRequestConfig = {
      url,
      responseType: 'arraybuffer',
      method: 'GET',
    };

    return window.electron.httpApi.getBase64(request);
  }
}
