export class ApiClient<T> {
  constructor(private readonly api: string) {}

  public find(): Promise<T[]> {
    return fetch(this.api).then(res => res.json()) as Promise<T[]>;
  }

  public findById(id: string): Promise<T> {
    return fetch(`${this.api}/${id}`).then(res => res.json()) as Promise<T>;
  }

  public insertOne(tweet: Omit<T, 'id'>): Promise<T> {
    return fetch(this.api, {
      method: "POST",
      body: JSON.stringify(tweet),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()) as Promise<T>;
  }
}