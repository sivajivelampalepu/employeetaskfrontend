import { create } from "zustand";

const useLoaderStore = create((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
}));

export default useLoaderStore;
