import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProductMutation, useProductsQuery } from "@/hooks/useProducts";

const Products = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    supplier: "",
    quantity: "",
    minQuantity: "",
  });

  const { data: products = [], isLoading } = useProductsQuery();
  const createProduct = useCreateProductMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.supplier || !formData.quantity) {
      toast({
        title: "Erro ao cadastrar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    createProduct.mutate(
      {
        name: formData.name,
        category: formData.category,
        supplier: formData.supplier,
        quantity: Number(formData.quantity),
        minQuantity: Number(formData.minQuantity || 0),
      },
      {
        onSuccess: () => {
          toast({
            title: "Produto cadastrado com sucesso!",
            description: `${formData.name} foi adicionado ao estoque.`,
          });
          setFormData({
            name: "",
            category: "",
            supplier: "",
            quantity: "",
            minQuantity: "",
          });
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : "Erro ao cadastrar produto.";
          toast({
            title: "Erro ao cadastrar",
            description: message,
            variant: "destructive",
          });
        },
      },
    );
  };

  const productCountCopy = useMemo(() => {
    if (isLoading) return "Carregando lista...";
    if (!products.length) return "Nenhum produto ainda";
    return `${products.length} produto${products.length > 1 ? "s" : ""} cadastrados`;
  }, [isLoading, products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Cadastro de Produtos</h1>
              <p className="text-sm text-muted-foreground">Adicione novos produtos ao estoque</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Novo Produto</CardTitle>
            <CardDescription>
              Preencha os dados do produto para cadastrá-lo no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Notebook Dell Inspiron"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                    <SelectItem value="perifericos">Periféricos</SelectItem>
                    <SelectItem value="mobiliario">Mobiliário</SelectItem>
                    <SelectItem value="escritorio">Material de Escritório</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Fornecedor *</Label>
                <Input
                  id="supplier"
                  placeholder="Ex: Dell Inc."
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade Inicial *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minQuantity">Estoque Mínimo</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button type="submit" className="w-full sm:flex-1" disabled={createProduct.isPending}>
                  Cadastrar Produto
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

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>Produtos cadastrados</CardTitle>
            <CardDescription>{productCountCopy}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 text-xs font-semibold uppercase text-muted-foreground">Produto</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold uppercase text-muted-foreground">Categoria</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold uppercase text-muted-foreground">Fornecedor</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold uppercase text-muted-foreground">Qtd</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td className="py-3 px-3 text-muted-foreground" colSpan={4}>
                        Carregando produtos...
                      </td>
                    </tr>
                  )}
                  {!isLoading && products.length === 0 && (
                    <tr>
                      <td className="py-3 px-3 text-muted-foreground" colSpan={4}>
                        Você ainda não adicionou produtos.
                      </td>
                    </tr>
                  )}
                  {!isLoading && products.map((product) => (
                    <tr key={product.id} className="border-b last:border-0">
                      <td className="py-3 px-3">{product.name}</td>
                      <td className="py-3 px-3 text-muted-foreground">{product.category}</td>
                      <td className="py-3 px-3 text-muted-foreground">{product.supplier}</td>
                      <td className="py-3 px-3 text-right font-semibold">{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Products;
