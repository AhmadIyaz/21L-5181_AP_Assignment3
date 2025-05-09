import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("Movies");
    
    const director = await db
      .collection("directors")
      .findOne({ id: id });

    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }

    // Get movies directed by this director
    const movies = await db
      .collection("movies")
      .find({ directorId: id })
      .sort({ rating: -1 })
      .toArray();

    const directorWithMovies = {
      ...director,
      movies
    };

    res.status(200).json(directorWithMovies);
  } catch (error) {
    console.error('Error fetching director details:', error);
    res.status(500).json({ message: 'Error fetching director details' });
  }
}
