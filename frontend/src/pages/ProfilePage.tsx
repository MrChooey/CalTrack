import { useState, useEffect, FormEvent } from 'react';
import { userApi } from '../services/api';
import type { UserProfileResponse, UserProfileUpdateRequest } from '../types';

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    activities: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await userApi.getProfile();
      setProfile(profileData);
      setFormData({
        name: profileData.name || '',
        age: profileData.age?.toString() || '',
        height: profileData.height?.toString() || '',
        weight: profileData.weight?.toString() || '',
        activities: profileData.activities || '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const updateData: UserProfileUpdateRequest = {
        name: formData.name,
        age: formData.age ? parseInt(formData.age) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        activities: formData.activities || undefined,
      };
      const updated = await userApi.updateProfile(updateData);
      setProfile(updated);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      <div className="max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Account Information</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-gray-600">Email:</span>{' '}
              <span className="text-gray-800">{profile?.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">User ID:</span>{' '}
              <span className="text-gray-800">{profile?.id}</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Update Profile</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="activities"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Activities
              </label>
              <textarea
                id="activities"
                value={formData.activities}
                onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSaving ? 'Saving...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




