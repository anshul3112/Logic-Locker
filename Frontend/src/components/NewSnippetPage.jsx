import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewSnippetPage = () => {
 
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');


  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();


  const handleCreateSnippet = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/v1/snippets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: sends authentication cookies
        body: JSON.stringify({ title, language, code }),
      });

      if (response.ok) {
        navigate('/snippets');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create snippet.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-200 p-4">
      {/* Form card */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create a New Snippet
        </h2>

        <form onSubmit={handleCreateSnippet}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Language
            </label>
            <input
              id="language"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Code
            </label>
            <textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows="12"
              className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/snippets')} // Go back without saving
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors disabled:bg-violet-300"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSnippetPage;