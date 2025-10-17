import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft, Download, TrendingUp, TrendingDown, Package } from "lucide-react";

const Reports = () => {
  const navigate = useNavigate();

  const reportData = {
    totalValue: "R$ 125.430,00",
    monthlyEntries: 45,
    monthlyExits: 32,
    turnoverRate: "68%",
  };

  const topProducts = [
    { name: "Notebook Dell", movements: 24, status: "high" },
    { name: "Monitor LG 27''", movements: 18, status: "high" },
    { name: "Mouse Logitech", movements: 15, status: "medium" },
    { name: "Teclado Mecânico", movements: 12, status: "medium" },
    { name: "Cadeira Gamer", movements: 8, status: "low" },
  ];

  const categoryData = [
    { category: "Eletrônicos", value: "R$ 78.200,00", percentage: 62 },
    { category: "Periféricos", value: "R$ 32.150,00", percentage: 26 },
    { category: "Mobiliário", value: "R$ 15.080,00", percentage: 12 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Relatórios e Análises</h1>
              <p className="text-sm text-muted-foreground">Visualize dados consolidados do estoque</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total em Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{reportData.totalValue}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Entradas do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-2xl font-bold text-success">{reportData.monthlyEntries}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saídas do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                <span className="text-2xl font-bold text-destructive">{reportData.monthlyExits}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Giro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{reportData.turnoverRate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Top Products */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Produtos Mais Movimentados</CardTitle>
                  <CardDescription>Ranking de produtos por volume de transações</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.movements} movimentações</p>
                    </div>
                    <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          product.status === "high" ? "bg-success" :
                          product.status === "medium" ? "bg-warning" : "bg-muted-foreground"
                        }`}
                        style={{ width: `${(product.movements / 24) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                  <CardDescription>Valor de estoque por categoria de produto</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categoryData.map((category, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{category.category}</span>
                      <span className="text-sm font-bold text-primary">{category.value}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{category.percentage}% do total</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Exportar Relatórios</CardTitle>
            <CardDescription>Gere relatórios consolidados em diferentes formatos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Download className="h-5 w-5" />
                <span>Relatório Completo PDF</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Download className="h-5 w-5" />
                <span>Planilha Excel</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Download className="h-5 w-5" />
                <span>Dados CSV</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reports;