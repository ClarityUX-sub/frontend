import { useState } from 'react';
import React from 'react';
import '../styles/ui.css';

function App() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await fetch('http://localhost:8000/analyze');
      if (!response.ok) throw new Error('Failed to fetch image');

      // Ensure response is JSON
      const data = await response.json();
      if (!data.cloudinary_url) throw new Error('Missing image URL in response');

      console.log('Cloudinary URL:', data.cloudinary_url);

      // Set the image URL for preview
      setImageUrl(data.cloudinary_url);
    } catch (error) {
      console.error('Error fetching image:', error);
      alert('Error fetching image: ' + error.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>Visual Heat Map</h2>

      <button
        onClick={handleAnalyze}
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.2s ease-in-out',
        }}
        // onMouseOver={(e) => (e.target.style.backgroundColor = '#1e40af')}
        // onMouseOut={(e) => (e.target.style.backgroundColor = '#2563eb')}
      >
        Analyze
      </button>

      {imageUrl && (
        <div
          style={{
            marginTop: '16px',
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={imageUrl}
            alt="Result"
            style={{
              width: '140px',
              height: '70px',
              objectFit: 'cover',
              borderRadius: '6px',
              border: '1px solid #ddd',
              boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          />

          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '6px',
              textDecoration: 'none',
            }}
          >
            <button
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s ease-in-out',
              }}
              // onMouseOver={(e) => (e.target.style.backgroundColor = '#059669')}
              // onMouseOut={(e) => (e.target.style.backgroundColor = '#10b981')}
            >
              Open Image in New Tab
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
