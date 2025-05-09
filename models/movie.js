import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  releaseYear: { type: Number },
  rating: { type: Number },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true,
  },
  directorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: true,
  },
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);