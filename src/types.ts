export interface Product {
  id: string;
  name: string;
  category: 'cupcakes' | 'cakes' | 'cookies' | 'pastries' | 'donuts' | 'waffles';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  tag?: string;
  image: string;
  badge?: string;
  calories?: string;
  sweetnessLevel?: number; // 1 to 5
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNote?: string;
}

export interface CakeConfig {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  cakeType: string;
  size: '0.5 kg' | '1 kg' | '1.5 kg' | '2 kg';
  flavor: string;
  filling: string;
  frosting: string;
  themeColor: string;
  isEggless: boolean;
  cakeMessage: string;
  quantity: number;
  deliveryDate: string;
  specialInstructions: string;
  hasSprinkles: boolean;
  hasCandles: boolean;
  hasEdibleFlowers: boolean;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  favoriteItem: string;
  date: string;
  avatarBg: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  likes: number;
  aspect: 'tall' | 'wide' | 'square';
}
