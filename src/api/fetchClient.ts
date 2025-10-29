export interface ApiResponse<T> {
  success: boolean
  data: T | null
  message: string
  error?: unknown
  statusCode?: number
}

//Patron encapsulamiento cuando tenemos urlbase compartidas
export class FetchClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Error')
      return {
        success: true,
        data,
        message: 'OK',
        statusCode: response.status,
      }
    } catch (error) {
      return { success: false, data: null, message: 'GET Error', error }
    }
  }

  async post<T>(endpoint: string, body: object): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Error')
      return {
        success: true,
        data,
        message: 'OK',
        statusCode: response.status,
      }
    } catch (error) {
      return { success: false, data: null, message: 'POST Error', error }
    }
  }
}
