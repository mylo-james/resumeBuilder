import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User management
export const userService = {
  createUser: async (userData: {
    email: string;
    name?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  }) => {
    const response = await apiClient.post('/api/users', userData);
    return response.data;
  },

  getUser: async (userId: string) => {
    const response = await apiClient.get(`/api/users/${userId}`);
    return response.data;
  },
};

// Job request management
export const jobRequestService = {
  createJobRequest: async (jobRequestData: {
    userId: string;
    jobDescription: string;
    jobUrl?: string;
  }) => {
    const response = await apiClient.post('/api/job-requests', jobRequestData);
    return response.data;
  },

  getJobRequest: async (jobRequestId: string) => {
    const response = await apiClient.get(`/api/job-requests/${jobRequestId}`);
    return response.data;
  },

  pollJobRequest: async (jobRequestId: string, onUpdate?: (data: any) => void) => {
    const poll = async () => {
      try {
        const response = await apiClient.get(`/api/job-requests/${jobRequestId}`);
        const data = response.data;
        
        if (onUpdate) {
          onUpdate(data);
        }
        
        // Continue polling if still processing
        if (data.status === 'PENDING' || data.status === 'PROCESSING') {
          setTimeout(poll, 2000); // Poll every 2 seconds
        }
        
        return data;
      } catch (error) {
        console.error('Error polling job request:', error);
        throw error;
      }
    };
    
    return poll();
  },
};

// Health check
export const healthService = {
  checkHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default apiClient;