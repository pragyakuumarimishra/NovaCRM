export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }
    return data.data;
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }
    return data.data;
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }
    return data.data;
  }

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

export const apiClient = new ApiClient();