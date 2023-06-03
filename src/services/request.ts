export class Request {
    host: string;
    private baseUrl = 'http://';
    constructor(host?: string) {
      this.host = host ? new URL(host, this.baseUrl).toString() : new URL(process.env.HOST).toString();
    }
}