import { GET } from '@/app/api/health/route';

describe('Health API Route', () => {
  it('should return 200 OK with health status', async () => {
    const response = await GET();
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('service', 'resume-builder');
    expect(typeof data.timestamp).toBe('string');
    
    // Verify timestamp is a valid ISO string
    expect(() => new Date(data.timestamp)).not.toThrow();
  });
});
