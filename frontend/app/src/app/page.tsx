// pages/index.tsx
import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5001/api/bookings', { cache: 'no-store', mode: 'cors' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Current Bookings</h1>
      <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-gray-700 border-b border-gray-600 text-center">Booking Date</th>
            <th className="py-4 px-6 bg-gray-700 border-b border-gray-600 text-center">Start Time</th>
            <th className="py-4 px-6 bg-gray-700 border-b border-gray-600 text-center">End Time</th>
            <th className="py-4 px-6 bg-gray-700 border-b border-gray-600 text-center">Doctor Name</th>
            <th className="py-4 px-6 bg-gray-700 border-b border-gray-600 text-center">Details</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking: any) => (
            <tr key={booking.id} className="hover:bg-gray-700">
              <td className="py-3 px-5 border-b border-gray-600 text-center">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="py-3 px-5 border-b border-gray-600 text-center">{booking.start_time}</td>
              <td className="py-3 px-5 border-b border-gray-600 text-center">{booking.end_time}</td>
              <td className="py-3 px-5 border-b border-gray-600 text-center">{booking.doctor_name}</td>
              <td className="py-3 px-5 border-b border-gray-600 text-center">
                <Link href={`/booking/${booking.id}`} className="text-blue-600 hover:text-blue-700 underline">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
