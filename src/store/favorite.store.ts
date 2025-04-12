import { create } from "zustand";

export interface FavoriteItem {
  tmdbID: string;
  mediaType: "tv" | "movie";
  title: string;
  posterPath: string;
}

interface FavoriteStore {
  favorite: FavoriteItem[];
  setFavorites: (items: FavoriteItem[]) => void;
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (tmdbID: string, mediaType: "movie" | "tv") => void;
  isFavorite: (tmdbID: string, mediaType: "movie" | "tv") => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set ,get)=>({
     favorite : [],
     setFavorites(items) {
        this.favorite = items
     },
     addFavorite(item) {
         set((state)=>({
            favorite : [...state.favorite , item]
         }))
     },
     removeFavorite(tmdbID, mediaType) {
          this.favorite = get().favorite.filter((_ , i)=> !(tmdbID===_.tmdbID && mediaType ===_.mediaType))
     },
     isFavorite(tmdbID, mediaType) {
           return get().favorite.some((_)=>(_.mediaType === mediaType && _.tmdbID ===tmdbID ))
     },
}))
