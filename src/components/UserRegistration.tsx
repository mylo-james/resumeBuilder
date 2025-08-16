'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userService } from '@/lib/services/api-service';

interface UserRegistrationProps {
  onUserCreated: (userId: string) => void;
}

export default function UserRegistration({ onUserCreated }: UserRegistrationProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await userService.createUser(formData);
      onUserCreated(user.id);
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome to Resume Builder</CardTitle>
        <CardDescription>
          Please provide your information to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub Profile</Label>
            <Input
              id="github"
              name="github"
              type="url"
              value={formData.github}
              onChange={handleInputChange}
              placeholder="https://github.com/yourusername"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio Website</Label>
            <Input
              id="portfolio"
              name="portfolio"
              type="url"
              value={formData.portfolio}
              onChange={handleInputChange}
              placeholder="https://yourportfolio.com"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Get Started'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}