import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("Movies");
    
    const movie = await db
      .collection("movies")
      .findOne({ id: id });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Get director information
    const director = await db
      .collection("directors")
      .findOne({ id: movie.directorId });

    // Get genre information
    const genre = await db
      .collection("genres")
      .findOne({ id: movie.genreId });

    const movieWithDetails = {
      ...movie,
      director,
      genre
    };

    res.status(200).json(movieWithDetails);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Error fetching movie details' });
  }
}
