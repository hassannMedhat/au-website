export default function Unauthorized() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
          <p>You do not have permission to access the dashboard.</p>
        </div>
      </div>
    );
  }
  