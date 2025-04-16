import { create } from "zustand";

export interface FavoriteItem {
  tmdbID: string;
  mediaType: "tv" | "movie";
  title: string;
  posterPath: string | null;
}

interface FavoriteStore {
  favorite: FavoriteItem[];
  setFavorites: (items: FavoriteItem[]) => void;
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (tmdbID: string, mediaType: "movie" | "tv") => void;
  checkFavorite: (tmdbID: string, mediaType: "movie" | "tv") => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorite: [],

  setFavorites(items) {
    set({favorite:items});
  },

  addFavorite(item) {
    set((state) => ({
      favorite: [...state.favorite, item],
    }));
  },

  removeFavorite(tmdbID, mediaType) {
    set((state) => ({
      favorite: state.favorite.filter(
        (fav) => !(fav.tmdbID === tmdbID && fav.mediaType === mediaType)
      ),
    }));
  },

  checkFavorite(tmdbID, mediaType) {
    return get().favorite?.some(
      (fav) => fav.tmdbID === tmdbID && fav.mediaType === mediaType
    );
  },
}));
