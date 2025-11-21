import { Movement, MovementInput, Product, ProductInput } from "@/types";

const PRODUCTS_KEY = "controle-estok:products";
const MOVEMENTS_KEY = "controle-estok:movements";

const defaultProducts: Product[] = [
  { id: "1", name: "Notebook Dell", category: "Eletrônicos", supplier: "Dell Inc.", quantity: 15, minQuantity: 5 },
  { id: "2", name: "Mouse Logitech", category: "Periféricos", supplier: "Logitech", quantity: 3, minQuantity: 10 },
  { id: "3", name: "Teclado Mecânico", category: "Periféricos", supplier: "Redragon", quantity: 25, minQuantity: 10 },
  { id: "4", name: "Monitor LG 27''", category: "Eletrônicos", supplier: "LG", quantity: 8, minQuantity: 5 },
  { id: "5", name: "Cadeira Gamer", category: "Mobiliário", supplier: "DT3 Sports", quantity: 2, minQuantity: 5 },
];

const defaultMovements: Movement[] = [
  { id: "m1", productId: "1", productName: "Notebook Dell", type: "entrada", quantity: 5, reason: "Compra fornecedor", date: "2025-10-15T10:00:00.000Z" },
  { id: "m2", productId: "2", productName: "Mouse Logitech", type: "saida", quantity: 3, reason: "Entrega pedido", date: "2025-10-14T09:00:00.000Z" },
  { id: "m3", productId: "4", productName: "Monitor LG 27''", type: "entrada", quantity: 2, reason: "Reposição estoque", date: "2025-10-12T16:00:00.000Z" },
];

const withDelay = async <T,>(value: T, timeout = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), timeout));

const readFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
};

const persistToStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors in fallback mode
  }
};

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const mockGetProducts = async () => {
  const products = readFromStorage<Product[]>(PRODUCTS_KEY, defaultProducts);
  return withDelay(products);
};

export const mockCreateProduct = async (input: ProductInput) => {
  const products = readFromStorage<Product[]>(PRODUCTS_KEY, defaultProducts);
  const newProduct: Product = { id: generateId(), ...input };

  products.push(newProduct);
  persistToStorage(PRODUCTS_KEY, products);

  return withDelay(newProduct);
};

export const mockGetMovements = async () => {
  const movements = readFromStorage<Movement[]>(MOVEMENTS_KEY, defaultMovements);
  // ensure sorted by newest
  return withDelay([...movements].sort((a, b) => b.date.localeCompare(a.date)));
};

export const mockCreateMovement = async (input: MovementInput) => {
  const products = readFromStorage<Product[]>(PRODUCTS_KEY, defaultProducts);
  const product = products.find((p) => p.id === input.productId);

  if (!product) {
    throw new Error("Produto não encontrado para registrar movimentação.");
  }

  const quantityChange = input.type === "entrada" ? input.quantity : -input.quantity;

  product.quantity = Math.max(0, product.quantity + quantityChange);
  persistToStorage(PRODUCTS_KEY, products);

  const movement: Movement = {
    id: generateId(),
    productId: product.id,
    productName: product.name,
    type: input.type,
    quantity: input.quantity,
    reason: input.reason,
    date: new Date().toISOString(),
  };

  const existingMovements = readFromStorage<Movement[]>(MOVEMENTS_KEY, defaultMovements);
  const updatedMovements = [movement, ...existingMovements];
  persistToStorage(MOVEMENTS_KEY, updatedMovements);

  return withDelay(movement);
};
