export type ListCreateParams = {
  name: string;
  description?: string;
  purchaseDate?: Date;
};

export type ListEditParams = {
  name?: string;
  description?: string;
  purchaseDate?: Date;
};
