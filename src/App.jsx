import "./App.css";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-4xl font-bold">StudyNotion</h1>

      <p className="text-lg text-gray-300 text-center max-w-xl">
        One platform to organize notes, track progress, and study smarter.
      </p>

      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
          Get Started
        </button>
        <button className="px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-800">
          Learn More
        </button>
      </div>
    </main>
  );
}

