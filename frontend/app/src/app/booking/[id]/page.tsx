// src/app/booking/[id]/page.tsx
import Link from 'next/link';

async function getBookingById(id: string) {
  const res = await fetch(`http://host.docker.internal:5001/api/bookings/${id}`, {
    cache: 'no-store',
    mode: 'cors',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

interface BookingDetailsProps {
  params: {
    id: string;
  };
}

const BookingDetails = async ({ params }: BookingDetailsProps) => {
  const booking = await getBookingById(params.id);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-gray-200 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Booking Details</h1>
        <p className="text-lg mb-4">
          <span className="font-semibold text-white">Doctor:</span> {booking.doctor_name}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold text-white">Service:</span> {booking.service}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold text-white">Date:</span> {new Date(booking.date).toLocaleDateString()}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold text-white">Start Time:</span> {booking.start_time}
        </p>
        <p className="text-lg mb-6">
          <span className="font-semibold text-white">End Time:</span> {booking.end_time}
        </p>
        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
