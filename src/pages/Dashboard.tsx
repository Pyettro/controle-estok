import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, TrendingDown, AlertCircle, LogOut, Plus, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  category: string;
  supplier: string;
  quantity: number;
  minQuantity: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
      return;
    }

    // Dados simulados
    const mockProducts: Product[] = [
      { id: 1, name: "Notebook Dell", category: "Eletrônicos", supplier: "Dell Inc.", quantity: 15, minQuantity: 5 },
      { id: 2, name: "Mouse Logitech", category: "Periféricos", supplier: "Logitech", quantity: 3, minQuantity: 10 },
      { id: 3, name: "Teclado Mecânico", category: "Periféricos", supplier: "Redragon", quantity: 25, minQuantity: 10 },
      { id: 4, name: "Monitor LG 27''", category: "Eletrônicos", supplier: "LG", quantity: 8, minQuantity: 5 },
      { id: 5, name: "Cadeira Gamer", category: "Mobiliário", supplier: "DT3 Sports", quantity: 2, minQuantity: 5 },
    ];

    setProducts(mockProducts);
    setTotalProducts(mockProducts.reduce((acc, p) => acc + p.quantity, 0));
    setLowStockCount(mockProducts.filter(p => p.quantity < p.minQuantity).length);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/login");
  };

  const productEntries = 12;
  const productExits = 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Controle de Estoque</h1>
              <p className="text-sm text-muted-foreground">Gestão Inteligente de Inventário</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold">{totalProducts}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">unidades em estoque</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Entradas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-3xl font-bold text-success">{productEntries}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">movimentações este mês</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                <span className="text-3xl font-bold text-destructive">{productExits}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">movimentações este mês</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow border-warning/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Estoque Baixo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                <span className="text-3xl font-bold text-warning">{lowStockCount}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">produtos precisam reposição</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Button 
            size="lg" 
            className="h-auto py-6 flex-col gap-2"
            onClick={() => navigate("/products")}
          >
            <Plus className="h-6 w-6" />
            <span>Cadastrar Produto</span>
          </Button>
          <Button 
            size="lg" 
            className="h-auto py-6 flex-col gap-2"
            variant="secondary"
            onClick={() => navigate("/movements")}
          >
            <TrendingUp className="h-6 w-6" />
            <span>Registrar Movimentação</span>
          </Button>
          <Button 
            size="lg" 
            className="h-auto py-6 flex-col gap-2"
            variant="outline"
            onClick={() => navigate("/reports")}
          >
            <FileText className="h-6 w-6" />
            <span>Visualizar Relatórios</span>
          </Button>
        </div>

        {/* Products Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Produtos em Estoque</CardTitle>
            <CardDescription>
              Visão geral dos produtos cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Produto</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Categoria</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Fornecedor</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm">Quantidade</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                      <td className="py-3 px-4 text-muted-foreground">{product.supplier}</td>
                      <td className="py-3 px-4 text-right font-semibold">{product.quantity}</td>
                      <td className="py-3 px-4 text-center">
                        {product.quantity < product.minQuantity ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-warning/10 text-warning text-xs font-medium">
                            <AlertCircle className="h-3 w-3" />
                            Baixo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                            Normal
                          </span>
                        )}
                      </td>
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

export default Dashboard;