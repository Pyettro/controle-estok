import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockCreateProduct, mockDeleteProduct, mockGetProducts, mockUpdateProduct } from "@/lib/mockApi";
import { Product, ProductInput } from "@/types";

const API_URL = import.meta.env.VITE_API_URL?.trim();
export const productsQueryKey = ["products"];

const fetchProducts = async (): Promise<Product[]> => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) {
      throw new Error("Não foi possível carregar os produtos.");
    }
    return res.json();
  }

  return mockGetProducts();
};

const createProductRequest = async (input: ProductInput): Promise<Product> => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Falha ao criar produto.");
    }

    return res.json();
  }

  return mockCreateProduct(input);
};

export const useProductsQuery = () =>
  useQuery({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
  });

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsQueryKey });
    },
  });
};

const updateProductRequest = async (id: string, input: ProductInput): Promise<Product> => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Falha ao atualizar produto.");
    }

    return res.json();
  }

  return mockUpdateProduct(id, input);
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ProductInput }) =>
      updateProductRequest(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsQueryKey });
    },
  });
};

const deleteProductRequest = async (id: string): Promise<void> => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Falha ao excluir produto.");
    }

    return;
  }

  await mockDeleteProduct(id);
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsQueryKey });
    },
  });
};
