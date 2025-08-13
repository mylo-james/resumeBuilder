import { checkHealth, HealthStatus } from '@/utils/health';

// Mock fetch globally
global.fetch = jest.fn();

describe('Health Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return health status when API call succeeds', async () => {
    const mockHealthData: HealthStatus = {
      status: 'ok',
      timestamp: '2024-01-01T00:00:00.000Z',
      service: 'resume-builder'
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockHealthData,
    });

    const result = await checkHealth();

    expect(fetch).toHaveBeenCalledWith('/api/health');
    expect(result).toEqual(mockHealthData);
  });

  it('should throw error when API call fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(checkHealth()).rejects.toThrow('Health check failed with status: 500');
    expect(fetch).toHaveBeenCalledWith('/api/health');
  });

  it('should throw error when network request fails', async () => {
    const networkError = new Error('Network error');
    (fetch as jest.Mock).mockRejectedValueOnce(networkError);

    await expect(checkHealth()).rejects.toThrow('Network error');
    expect(fetch).toHaveBeenCalledWith('/api/health');
  });
});
