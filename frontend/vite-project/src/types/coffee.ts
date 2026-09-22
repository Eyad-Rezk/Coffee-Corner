export interface ICoffee {
  _id?: string;
  name: string;
  img_uri: string;
  description: string;
  ingredients: string;
  steps: string;
  isFavorite?: boolean;
  createdAt?: string;
}

export type CoffeeFormData = Omit<ICoffee, '_id' | 'createdAt'>;

export type ViewRoute = 'home' | 'collection' | 'favorites' | 'add' | 'edit' | 'details';