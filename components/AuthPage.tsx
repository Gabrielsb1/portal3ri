import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ThemeToggle } from './ui/theme-toggle';
import { 
  ArrowLeft, 
  Building2, 
  User, 
  Mail, 
  Lock, 
  GraduationCap,
  Users,
  Sparkles
} from 'lucide-react';

interface AuthPageProps {
  onAuth: (type: 'employee' | 'company', employeeData?: any) => void;
  onEmployeeLogin: (employee: any) => void;
  onBack: () => void;
}

export function AuthPage({ onAuth, onEmployeeLogin, onBack }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'employee' | 'company'>('employee');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock de colaboradores cadastrados
  const mockEmployees = [
    {
      id: 1,
      name: 'João Gabriel',
      email: 'gabriel@3ri.com.br',
      department: 'Atendimento',
      position: 'Escrevente',
      completedCourses: 1
    },
    {
      id: 2,
      name: 'Marina Matrículas',
      email: 'marina.matriculas@3ri.com.br',
      department: 'Registro',
      position: 'Escrevente Substituta',
      completedCourses: 3
    },
    {
      id: 3,
      name: 'Carlos Protocolo',
      email: 'carlos.protocolo@3ri.com.br',
      department: 'Protocolo',
      position: 'Auxiliar de Protocolo',
      completedCourses: 2
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (userType === 'employee') {
        if (isLogin) {
          // Login do colaborador
          const employee = mockEmployees.find(emp => 
            emp.email.toLowerCase() === formData.email.toLowerCase()
          );
          
          if (employee && formData.password === 'senha123') {
            onEmployeeLogin(employee);
          } else {
            alert('Email ou senha incorretos!\n\nTente:\nEmail: joao.silva@empresa.com\nSenha: senha123');
          }
        } else {
          // Cadastro de funcionário não permitido
          alert('O cadastro de funcionários deve ser feito pelo gestor da empresa.\n\nFale com seu gestor para obter acesso à plataforma.');
        }
      } else {
        // Gestor / Administração do cartório
        if (isLogin) {
          if (formData.email.toLowerCase() === 'oficial@3ri.com.br' && formData.password === 'admin123') {
            onAuth('company');
          } else {
            alert('Email ou senha incorretos!\n\nTente:\nEmail: oficial@3ri.com.br\nSenha: admin123');
          }
        } else {
          // Cadastro inicial do cartório / credencial administrativa
          if (formData.email && formData.password && formData.company && formData.name) {
            onAuth('company');
          } else {
            alert('Por favor, preencha todos os campos obrigatórios!');
          }
        }
      }
    } catch (error) {
      alert('Erro ao processar autenticação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900 dark:text-gray-50 tracking-tight">Portal 3RI</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">3º Registro de Imóveis de São Luís/MA</p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <Card className="shadow-xl border-0 bg-card backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isLogin ? 'Entrar no Portal Interno' : 'Criar Acesso'}
            </CardTitle>
            <CardDescription>
              {userType === 'employee' 
                ? (isLogin ? 'Acesse seus treinamentos e informações internas' : 'Peça ao Oficial ou gestor para cadastrá-lo')
                : (isLogin ? 'Acesse o painel da administração do cartório' : 'Registre o acesso administrativo do cartório')
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'employee' | 'company')} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employee" className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Colaborador</span>
                </TabsTrigger>
                <TabsTrigger value="company" className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>Administração</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && userType === 'employee' && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> O cadastro de funcionários deve ser feito pelo gestor da empresa. 
                    Fale com seu gestor para ter acesso à plataforma.
                  </p>
                </div>
              )}

              {!isLogin && userType === 'company' && (
                <>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Nome do Oficial / Responsável *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Nome do Cartório *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="3º Registro de Imóveis de São Luís/MA"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Email institucional *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder={userType === 'employee' ? 'nome.sobrenome@3ri.com.br' : 'oficial@3ri.com.br'}
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Senha *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-shadow"
                disabled={(!isLogin && userType === 'employee') || isLoading}
              >
                {isLoading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
              </Button>
            </form>

            {/* Credenciais de demonstração */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm mb-2">💡 Credenciais de teste (ambiente de demonstração):</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <strong>Administração (Oficial do Cartório):</strong>
                  <br />📧 Email: oficial@3ri.com.br
                  <br />🔒 Senha: admin123
                </div>
                <div>
                  <strong>Colaborador:</strong>
                  <br />📧 Email: gabriel@3ri.com.br
                  <br />🔒 Senha: senha123
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm"
                disabled={(!isLogin && userType === 'employee') || isLoading}
              >
                {isLogin 
                  ? (userType === 'employee' ? 'Precisa de acesso? Fale com o Oficial ou gestor' : 'Não tem acesso? Registre o cartório')
                  : (userType === 'employee' ? 'Já tem acesso? Fazer login' : 'Já possui acesso? Fazer login')
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}