import mongoose, { Schema, models, model, Document } from "mongoose";

interface IFavorite extends Document {
  userID: mongoose.Schema.Types.ObjectId;
  tmdbID: string;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string;
  addedAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tmdbID: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ["movie", "tv"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export const favoriteModel = models.Favorite || model<IFavorite>("Favorite", FavoriteSchema);

