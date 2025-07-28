import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  ingredients: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface MenuState {
  items: MenuItem[];
  selectedItem: MenuItem | null;
  isDetailOpen: boolean;
  activeCategory: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Mediterranean Bowl',
    description: 'Fresh quinoa with grilled vegetables, olives, and tahini',
    price: 16.99,
    image: '/api/placeholder/300/200',
    category: 'bowls',
    tags: ['vegan', 'healthy'],
    ingredients: ['quinoa', 'bell peppers', 'olives', 'tahini', 'cucumber'],
    nutrition: { calories: 450, protein: 12, carbs: 65, fat: 18 }
  },
  {
    id: '2',
    name: 'Truffle Pasta',
    description: 'Handmade pasta with black truffle and parmesan',
    price: 24.99,
    image: '/api/placeholder/300/200',
    category: 'pasta',
    tags: ['signature', 'premium'],
    ingredients: ['pasta', 'black truffle', 'parmesan', 'cream', 'garlic'],
    nutrition: { calories: 680, protein: 22, carbs: 78, fat: 28 }
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with herb crust and seasonal vegetables',
    price: 28.99,
    image: '/api/placeholder/300/200',
    category: 'seafood',
    tags: ['healthy', 'protein'],
    ingredients: ['salmon', 'herbs', 'asparagus', 'carrots', 'lemon'],
    nutrition: { calories: 520, protein: 45, carbs: 15, fat: 32 }
  }
];

const initialState: MenuState = {
  items: menuItems,
  selectedItem: null,
  isDetailOpen: false,
  activeCategory: 'all',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<MenuItem>) => {
      state.selectedItem = action.payload;
      state.isDetailOpen = true;
    },
    closeDetail: (state) => {
      state.isDetailOpen = false;
      state.selectedItem = null;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setSelectedItem, closeDetail, setActiveCategory } = menuSlice.actions;
export default menuSlice.reducer;