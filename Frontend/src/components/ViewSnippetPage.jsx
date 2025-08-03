import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewSnippetPage = () => {
  const { id: snippetId } = useParams(); // Get snippet ID from URL
  const navigate = useNavigate();

  // State for the snippet data
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState('');

  // State for the summary feature
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Fetch the specific snippet on component mount
  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await fetch(`/api/v1/snippets/${snippetId}`, {
          method: 'POST', // Changed from GET to POST to match your API structure
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Snippet not found or you do not have permission.');
        }
        const result = await response.json();
        setSnippet(result.data);
        setEditedCode(result.data.code); // Initialize editedCode with fetched code
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSnippet();
  }, [snippetId]);

  // Handle snippet deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      try {
        const response = await fetch(`/api/v1/snippets/delete/${snippetId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to delete snippet.');
        }
        navigate('/snippets'); // Go back to the list on success
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Handle snippet update
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/v1/snippets/update/${snippetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code: editedCode }),
      });
      if (!response.ok) {
        throw new Error('Failed to update snippet.');
      }
      const result = await response.json();
      setSnippet(result.data); // Update local state with the updated snippet
      setIsEditing(false); // Exit editing mode
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle code summarization
  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary('');
    try {
      const response = await fetch("/api/v1/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ "prompt": snippet.code }),
      });
      if (!response.ok) {
        throw new Error('Failed to get summary.');
      }
      const result = await response.json();
      setSummary(result.data.summary); // Assuming the API returns { data: { summary: '...' } }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setSummary('Error: Could not generate summary.');
    } finally {
      setIsSummarizing(false);
    }
  };

  if (loading) return <p className="text-center p-10">Loading snippet...</p>;
  if (error) return <p className="text-center text-red-500 p-10">{error}</p>;
  if (!snippet) return <p className="text-center p-10">Snippet not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{snippet.title}</h1>
            <p className="text-md text-gray-500">Language: <span className="font-semibold text-violet-600">{snippet.language}</span></p>
          </div>
          <div className="flex gap-4">
            {!isEditing ? (
              <>
                <button onClick={() => setIsEditing(true)} className="bg-white text-violet-600 font-semibold px-4 py-2 rounded-md hover:bg-violet-50 border border-violet-600">Update</button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
              </>
            ) : (
              <>
                <button onClick={() => { setIsEditing(false); setEditedCode(snippet.code); }} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Save Changes</button>
              </>
            )}
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Code Editor/Viewer */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {isEditing ? (
              <textarea
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                className="w-full h-full min-h-[400px] p-4 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            ) : (
              <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto min-h-[400px]">
                <code>{snippet.code}</code>
              </pre>
            )}
          </div>

          {/* Right Column: Summarize Block */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Code Summary</h3>
            <button
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="mb-4 w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 disabled:bg-violet-300"
            >
              {isSummarizing ? 'Summarizing...' : 'Summarize using AI'}
            </button>
            <div className="bg-gray-100 rounded-md p-4 flex-grow min-h-[200px]">
              {isSummarizing ? (
                <p className="text-gray-500">Generating summary...</p>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{summary || 'Click the button to generate a summary of the code.'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSnippetPage;
