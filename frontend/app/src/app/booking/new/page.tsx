// src/app/booking/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookingFormData {
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
} 


const NewBookingPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: '',
  });
  const [errors, setErrors] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    try {
      const res = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors(errorData.message || 'Something went wrong');
      } else {
        router.push('/');
      }
    } catch (error) {
      setErrors('An error occurred while trying to submit the form.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-gray-200 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">New Booking</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Service</label>
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-700 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Doctor Name</label>
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-700 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-700 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">End Time</label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-700 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-700 bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {errors && <p className="text-red-500 text-xs italic">{errors}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => router.push('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBookingPage;
