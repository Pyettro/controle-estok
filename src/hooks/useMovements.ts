import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockCreateMovement, mockGetMovements } from "@/lib/mockApi";
import { Movement, MovementInput } from "@/types";
import { productsQueryKey } from "./useProducts";

const API_URL = import.meta.env.VITE_API_URL?.trim();
export const movementsQueryKey = ["movements"];

const fetchMovements = async (): Promise<Movement[]> => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/movements`);
    if (!res.ok) {
      throw new Error("Não foi possível carregar as movimentações.");
    }
    return res.json();
  }

  return mockGetMovements();
};

const createMovementRequest = async (input: MovementInput): Promise<Movement> => {
  if (API_URL) {
    const res = await fetch(`${API_URL}/movements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Falha ao registrar movimentação.");
    }

    return res.json();
  }

  return mockCreateMovement(input);
};

export const useMovementsQuery = () =>
  useQuery({
    queryKey: movementsQueryKey,
    queryFn: fetchMovements,
  });

export const useCreateMovementMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMovementRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementsQueryKey });
      queryClient.invalidateQueries({ queryKey: productsQueryKey });
    },
  });
};
