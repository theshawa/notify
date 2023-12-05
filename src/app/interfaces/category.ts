export interface Category {
  id: string;
  name: string;
  theme: {
    fg: string;
    bg: string;
  };
  updatedAt: number;
  createdAt: number;
}
