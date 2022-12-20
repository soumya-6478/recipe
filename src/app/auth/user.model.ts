export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiredate: Date
  ) {}

  get token() {
    if (!this._tokenExpiredate || new Date() > this._tokenExpiredate) {
      return null;
    }
    return this._token;
  }
}
