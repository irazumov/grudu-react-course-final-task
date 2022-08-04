interface ApiResponse<T> {
  status: number;
  data: T;
}

export class ApiClient<T> {
  constructor(private readonly api: string) {}

  public async find(filters?: Partial<T>): Promise<ApiResponse<T[]>> {
    const search = new URLSearchParams();
    Object.entries(filters || {}).forEach(([key, value]) => {
      search.append(key, `${value}`);
    });
    const query = search.toString();
    const url = `${this.api}${query && '?' + query}`;
    const response = await fetch(url);
    const data = await response.json() as T[];
    return { status: response.status, data };
  }

  public async findById(id: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.api}/${id}`);
    const data = await response.json() as T;
    return { status: response.status, data };
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