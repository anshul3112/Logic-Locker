import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SnippetsPage = () => {

  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [titleFilter, setTitleFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  const navigate = useNavigate();

  // Fetch snippets when the component mounts
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch('https://logic-locker.onrender.com/api/v1/users/get-all-snippets', {
          method: "POST",
          credentials: 'include', 
        });
        if (!response.ok) {
          throw new Error('Failed to fetch snippets. Please log in again.');
        }
        const result = await response.json();
        setSnippets(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('https://logic-locker.onrender.com/api/v1/users/logout', { method: 'POST', credentials: 'include' });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      navigate('/login');
    }
  };

  const filteredSnippets = snippets.filter(snippet => {
    const titleMatch = snippet.title.toLowerCase().includes(titleFilter.toLowerCase());
    const languageMatch = snippet.language.toLowerCase().includes(languageFilter.toLowerCase());
    return titleMatch && languageMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Snippets</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/snippets/new')}
              className="bg-white text-violet-600 font-semibold px-4 py-2 rounded-md hover:bg-violet-50 border border-violet-600 transition-colors"
            >
              Add New Snippet
            </button>
            <button
              onClick={handleLogout}
              className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Filter by title..."
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              type="text"
              placeholder="Filter by language..."
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <main>
          {loading && <p className="text-center text-gray-600">Loading snippets...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSnippets.length > 0 ? (
                filteredSnippets.map((snippet) => (
                  <div key={snippet._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{snippet.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Language: <span className="font-semibold text-violet-600">{snippet.language}</span>
                      </p>
                    </div>
                    <Link
                      to={`/snippets/${snippet._id}`} 
                      className="mt-4 text-center w-full bg-gray-100 text-violet-700 font-semibold py-2 rounded-md hover:bg-violet-100 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 md:col-span-2 lg:col-span-3">No snippets found.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SnippetsPage;
