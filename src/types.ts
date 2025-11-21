export type MovementType = "entrada" | "saida";

export interface Product {
  id: string;
  name: string;
  category: string;
  supplier: string;
  quantity: number;
  minQuantity: number;
}

export interface ProductInput {
  name: string;
  category: string;
  supplier: string;
  quantity: number;
  minQuantity: number;
}

export interface Movement {
  id: string;
  productId: string;
  productName: string;
  type: MovementType;
  quantity: number;
  reason?: string;
  date: string;
}

export interface MovementInput {
  productId: string;
  type: MovementType;
  quantity: number;
  reason?: string;
}
