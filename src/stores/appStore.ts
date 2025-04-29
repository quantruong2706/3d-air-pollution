import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  setMenuOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>(set => ({
  isDarkMode: false,
  toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
  isMenuOpen: false,
  toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
  setMenuOpen: isOpen => set({ isMenuOpen: isOpen }),
}));
