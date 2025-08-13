export interface HealthStatus {
  status: string;
  timestamp: string;
  service: string;
}

export async function checkHealth(): Promise<HealthStatus> {
  try {
    const response = await fetch('/api/health');
    
    if (!response.ok) {
      throw new Error(`Health check failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as HealthStatus;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Health check error:', error);
    throw error;
  }
}
