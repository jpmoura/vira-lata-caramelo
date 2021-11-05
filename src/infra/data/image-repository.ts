import HttpClient from '../client/http-client';

export default class ImageRepository {
  private readonly httpClient = new HttpClient();

  getBase64(url: string): Promise<string> {
    return this.httpClient.getBase64(url);
  }
}
