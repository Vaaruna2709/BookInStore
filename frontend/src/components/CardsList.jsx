import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'; // Ensure this matches the exact case of the file name


const CardsList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/search.json', {
          params: {
            q: 'fiction',
            limit: 30,
          }
        });
        setBooks(response.data.docs);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="cards-list">
      {books.map((book, index) => (
        <Card
          key={index}
          title={book.title}
          description={book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
        />
      ))}
    </div>
  );
};

export default CardsList;
