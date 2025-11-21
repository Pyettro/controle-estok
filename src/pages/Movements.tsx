import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProductsQuery } from "@/hooks/useProducts";
import { useCreateMovementMutation, useMovementsQuery } from "@/hooks/useMovements";

const Movements = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product: "",
    type: "",
    quantity: "",
    reason: "",
  });

  const { data: products = [], isLoading: loadingProducts } = useProductsQuery();
  const { data: movements = [], isLoading: loadingMovements } = useMovementsQuery();
  const createMovement = useCreateMovementMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.product || !formData.type || !formData.quantity) {
      toast({
        title: "Erro ao registrar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    createMovement.mutate(
      {
        productId: formData.product,
        type: formData.type as "entrada" | "saida",
        quantity: Number(formData.quantity),
        reason: formData.reason,
      },
      {
        onSuccess: () => {
          const isEntry = formData.type === "entrada";
          toast({
            title: "Movimentação registrada!",
            description: `${formData.type === "entrada" ? "Entrada" : "Saída"} de ${formData.quantity} unidades registrada com sucesso.`,
            variant: isEntry ? "default" : "default",
          });
          setFormData({
            product: "",
            type: "",
            quantity: "",
            reason: "",
          });
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : "Erro ao registrar movimentação.";
          toast({
            title: "Erro ao registrar",
            description: message,
            variant: "destructive",
          });
        },
      },
    );
  };

  const recentMovements = useMemo(() => movements.slice(0, 5), [movements]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-accent p-2">
              <TrendingUp className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Movimentações de Estoque</h1>
              <p className="text-sm text-muted-foreground">Registre entradas e saídas de produtos</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Nova Movimentação</CardTitle>
            <CardDescription>
              Registre entrada ou saída de produtos do estoque
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="product">Produto *</Label>
                <Select
                  value={formData.product}
                  onValueChange={(value) => setFormData({ ...formData, product: value })}
                  disabled={loadingProducts || !products.length}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Movimentação *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo/Observação</Label>
                <Textarea
                  id="reason"
                  placeholder="Ex: Compra de novos equipamentos, venda para cliente, etc."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button type="submit" className="w-full sm:flex-1" disabled={createMovement.isPending}>
                  Registrar Movimentação
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Recent Movements */}
        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>Últimas Movimentações</CardTitle>
            <CardDescription>Histórico recente de entradas e saídas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loadingMovements && (
                <p className="text-sm text-muted-foreground">Carregando movimentações...</p>
              )}
              {!loadingMovements && recentMovements.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma movimentação registrada.</p>
              )}
              {!loadingMovements && recentMovements.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{movement.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(movement.date).toLocaleDateString("pt-BR")}
                    </p>
                    {movement.reason && (
                      <p className="text-xs text-muted-foreground mt-1">Motivo: {movement.reason}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        movement.type === "entrada"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {movement.type === "entrada" ? "+" : "-"}
                      {movement.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Movements;
