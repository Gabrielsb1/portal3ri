import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { ThemeToggle } from './ui/theme-toggle';
import { 
  Building2, 
  Users, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Download,
  Video,
  Heart,
  MessageCircle,
  Share,
  BookOpen,
  Trophy,
  LogOut,
  Bell,
  Settings,
  ExternalLink,
  Eye,
  Send,
  Crown,
  Plus,
  UserPlus,
  GraduationCap,
  TrendingUp,
  Clock,
  Award,
  ChevronRight,
  BarChart3,
  MessageSquare
} from 'lucide-react';

interface CompanyDashboardProps {
  onLogout: () => void;
  onEmployeeLogin: (employee: any) => void;
  onSendFeedback: (feedback: any) => void;
  feedbacks: any[];
}

export function CompanyDashboard({ onLogout, onEmployeeLogin, onSendFeedback, feedbacks }: CompanyDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [feedbackData, setFeedbackData] = useState({
    courseId: '',
    courseName: '',
    feedback: '',
    rating: 5
  });
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    password: ''
  });
  const [companyStats, setCompanyStats] = useState({
    totalEmployees: 24,
    activeLearners: 18,
    completedCourses: 127,
    averageProgress: 73
  });

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Marina Matrículas',
      email: 'marina.matriculas@3ri.com.br',
      position: 'Escrevente de Registro',
      department: 'Registro',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e8?w=100&h=100&fit=crop&crop=face',
      coursesCompleted: 3,
      coursesInProgress: 1,
      totalCourses: 5,
      lastActivity: '2 horas atrás',
      averageGrade: 92,
      totalHours: 18,
      certificates: 3,
      progress: 80,
      status: 'active'
    },
    {
      id: 2,
      name: 'Carlos Protocolo',
      email: 'carlos.protocolo@3ri.com.br',
      position: 'Auxiliar de Protocolo',
      department: 'Protocolo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      coursesCompleted: 2,
      coursesInProgress: 2,
      totalCourses: 5,
      lastActivity: '1 dia atrás',
      averageGrade: 88,
      totalHours: 12,
      certificates: 2,
      progress: 60,
      status: 'active'
    },
    {
      id: 3,
      name: 'Ana Certidões',
      email: 'ana.certidoes@3ri.com.br',
      position: 'Supervisora de Certidões',
      department: 'Certidões',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      coursesCompleted: 4,
      coursesInProgress: 0,
      totalCourses: 5,
      lastActivity: '3 horas atrás',
      averageGrade: 95,
      totalHours: 24,
      certificates: 4,
      progress: 95,
      status: 'active'
    },
    {
      id: 4,
      name: 'Pedro Oficial Substituto',
      email: 'pedro.substituto@3ri.com.br',
      position: 'Oficial Substituto',
      department: 'Direção',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      coursesCompleted: 1,
      coursesInProgress: 1,
      totalCourses: 5,
      lastActivity: '5 horas atrás',
      averageGrade: 87,
      totalHours: 6,
      certificates: 1,
      progress: 30,
      status: 'active'
    },
    {
      id: 5,
      name: 'Lúcia Atendimento',
      email: 'lucia.atendimento@3ri.com.br',
      position: 'Atendente de Balcão',
      department: 'Atendimento',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      coursesCompleted: 2,
      coursesInProgress: 1,
      totalCourses: 5,
      lastActivity: '1 hora atrás',
      averageGrade: 90,
      totalHours: 15,
      certificates: 2,
      progress: 50,
      status: 'active'
    }
  ]);

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.department) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const employee = {
      id: employees.length + 1,
      ...newEmployee,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      coursesCompleted: 0,
      coursesInProgress: 0,
      totalCourses: 5,
      lastActivity: 'Nunca',
      averageGrade: 0,
      totalHours: 0,
      certificates: 0,
      progress: 0,
      status: 'active'
    };

    setEmployees(prev => [...prev, employee]);
    setCompanyStats(prev => ({ ...prev, totalEmployees: prev.totalEmployees + 1 }));
    setNewEmployee({ name: '', email: '', position: '', department: '', password: '' });
    setShowAddEmployee(false);
    alert(`Colaborador ${employee.name} cadastrado com sucesso!\n\nCredenciais de acesso:\nEmail: ${employee.email}\nSenha: ${employee.password || 'senha123'}\n\nO colaborador já pode acessar o Portal 3RI.`);
  };

  const handleEmployeeAccess = (employee: any) => {
    onEmployeeLogin({
      id: employee.id,
      name: employee.name,
      department: employee.department,
      position: employee.position,
      completedCourses: employee.coursesCompleted
    });
  };

  const handleOpenFeedback = (employee: any) => {
    setSelectedEmployee(employee);
    setFeedbackData({
      courseId: '',
      courseName: '',
      feedback: '',
      rating: 5
    });
    setShowFeedbackModal(true);
  };

  const handleSendFeedback = () => {
    if (!selectedEmployee || !feedbackData.feedback.trim()) {
      alert('Por favor, preencha o feedback antes de enviar!');
      return;
    }

    if (!feedbackData.courseId || !feedbackData.courseName) {
      alert('Por favor, selecione um curso para o feedback!');
      return;
    }

    const feedback = {
      employeeId: selectedEmployee.id,
      employeeName: selectedEmployee.name,
      courseId: parseInt(feedbackData.courseId),
      courseName: feedbackData.courseName,
      feedback: feedbackData.feedback,
      rating: feedbackData.rating
    };

    onSendFeedback(feedback);
    setShowFeedbackModal(false);
    setSelectedEmployee(null);
    setFeedbackData({
      courseId: '',
      courseName: '',
      feedback: '',
      rating: 5
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department.toLowerCase() === departmentFilter.toLowerCase();
    
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl text-foreground dark:text-gray-50">Administração 3RI</span>
              <span className="text-xs text-muted-foreground dark:text-gray-400 font-medium">3º Registro de Imóveis de São Luís/MA</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <Button 
              onClick={() => setShowAddEmployee(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 shadow-lg"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Cadastrar Funcionário</span>
              <span className="sm:hidden">Cadastrar</span>
            </Button>
            <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 dark:bg-red-400 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700 hidden sm:flex">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Cartório Profile */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop" />
                  <AvatarFallback>3RI</AvatarFallback>
                </Avatar>
                <CardTitle>3º Registro de Imóveis de São Luís/MA</CardTitle>
                <CardDescription>Serviços registrais imobiliários</CardDescription>
                <Badge className="bg-blue-600">Cartório Oficializado</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl text-blue-600">{companyStats.totalEmployees}</div>
                      <div className="text-xs text-muted-foreground">Funcionários</div>
                    </div>
                    <div>
                      <div className="text-2xl text-purple-600 dark:text-purple-400">{companyStats.activeLearners}</div>
                      <div className="text-xs text-muted-foreground">Estudando</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtros por Departamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant={departmentFilter === 'all' ? 'default' : 'outline'}
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setDepartmentFilter('all')}
                >
                  Todos os Departamentos
                </Button>
                {departments.map((dept) => (
                  <Button 
                    key={dept}
                    variant={departmentFilter === dept.toLowerCase() ? 'default' : 'outline'}
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => setDepartmentFilter(dept.toLowerCase())}
                  >
                    {dept}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Destaques do Mês</CardTitle>
                <CardDescription>Colaboradores com melhor desempenho em treinamentos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {employees
                  .sort((a, b) => b.averageGrade - a.averageGrade)
                  .slice(0, 5)
                  .map((employee, index) => (
                    <div key={employee.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${
                        index === 0 ? 'bg-yellow-500 dark:bg-yellow-600' : 
                        index === 1 ? 'bg-gray-400 dark:bg-gray-600' : 
                        index === 2 ? 'bg-amber-600 dark:bg-amber-500' : 'bg-blue-500 dark:bg-blue-600'
                      }`}>
                        {index + 1}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback className="text-xs">{employee.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate text-foreground">{employee.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{employee.department}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 dark:text-yellow-500 fill-current" />
                          <span className="text-xs text-foreground">{employee.averageGrade}%</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-16 h-6 text-xs p-1"
                        onClick={() => handleEmployeeAccess(employee)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Ver
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="employees">Funcionários</TabsTrigger>
                <TabsTrigger value="analytics">Relatórios</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Total de Funcionários</CardTitle>
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-foreground">{companyStats.totalEmployees}</div>
                      <p className="text-xs text-muted-foreground">+2 este mês</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Estudando Ativamente</CardTitle>
                      <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-foreground">{companyStats.activeLearners}</div>
                      <p className="text-xs text-muted-foreground">{Math.round((companyStats.activeLearners / companyStats.totalEmployees) * 100)}% do total</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Cursos Completados</CardTitle>
                      <Trophy className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-foreground">{companyStats.completedCourses}</div>
                      <p className="text-xs text-muted-foreground">+15 esta semana</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Progresso Médio</CardTitle>
                      <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-foreground">{companyStats.averageProgress}%</div>
                      <p className="text-xs text-muted-foreground">+5% vs mês anterior</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { user: 'Marina Vendas', action: 'completou o curso "Gestão de Vendas"', time: '2h', type: 'completed' },
                        { user: 'Ana E-commerce', action: 'iniciou o curso "Omnichannel"', time: '3h', type: 'started' },
                        { user: 'Carlos Vitrine', action: 'obteve certificado em "Visual Merchandising"', time: '5h', type: 'certificate' },
                        { user: 'Pedro Gerente', action: 'fez uma pergunta para a IA', time: '1d', type: 'question' },
                        { user: 'Lucia Compras', action: 'completou o curso "Negociação"', time: '2d', type: 'completed' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'completed' ? 'bg-green-600 dark:bg-green-500' : 
                            activity.type === 'started' ? 'bg-blue-600 dark:bg-blue-500' : 
                            activity.type === 'certificate' ? 'bg-purple-600 dark:bg-purple-500' : 'bg-orange-600 dark:bg-orange-500'
                          }`}></div>
                          <span className="text-sm text-foreground">{activity.user} {activity.action}</span>
                          <span className="text-xs text-muted-foreground ml-auto">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Employees Tab */}
              <TabsContent value="employees" className="space-y-6">
                {/* Search and Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar por nome, cargo ou departamento..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger className="w-full md:w-48">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="Filtrar por departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os departamentos</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Employees Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredEmployees.map((employee) => (
                    <Card key={employee.id} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback>{employee.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{employee.name}</CardTitle>
                              <CardDescription>{employee.position}</CardDescription>
                              <Badge variant="outline" className="text-xs mt-1">
                                {employee.department}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 dark:text-yellow-500 fill-current" />
                            <span className="text-sm text-foreground">{employee.averageGrade}%</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-foreground">
                            <span>Progresso Geral</span>
                            <span>{employee.progress}%</span>
                          </div>
                          <Progress value={employee.progress} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                          <div>
                            <div className="text-lg text-blue-600 dark:text-blue-400">{employee.coursesCompleted}</div>
                            <div className="text-xs text-muted-foreground">Concluídos</div>
                          </div>
                          <div>
                            <div className="text-lg text-orange-600 dark:text-orange-400">{employee.coursesInProgress}</div>
                            <div className="text-xs text-muted-foreground">Em Progresso</div>
                          </div>
                          <div>
                            <div className="text-lg text-green-600 dark:text-green-400">{employee.certificates}</div>
                            <div className="text-xs text-muted-foreground">Certificados</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{employee.totalHours}h estudadas</span>
                          </div>
                          <span>Ativo {employee.lastActivity}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="w-4 h-4 mr-2" />
                                Detalhes
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center space-x-3">
                                  <Avatar className="w-16 h-16">
                                    <AvatarImage src={employee.avatar} />
                                    <AvatarFallback>{employee.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h2 className="text-xl">{employee.name}</h2>
                                    <p className="text-muted-foreground">{employee.position}</p>
                                    <Badge variant="outline">{employee.department}</Badge>
                                  </div>
                                </DialogTitle>
                                <DialogDescription>
                                  Detalhes do desempenho e progresso de {employee.name}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div className="text-2xl text-blue-600 dark:text-blue-400">{employee.coursesCompleted}</div>
                                    <div className="text-sm text-muted-foreground">Cursos Completados</div>
                                  </div>
                                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                                    <div className="text-2xl text-green-600 dark:text-green-400">{employee.averageGrade}%</div>
                                    <div className="text-sm text-muted-foreground">Média de Notas</div>
                                  </div>
                                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                                    <div className="text-2xl text-purple-600 dark:text-purple-400">{employee.totalHours}h</div>
                                    <div className="text-sm text-muted-foreground">Horas Estudadas</div>
                                  </div>
                                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                                    <div className="text-2xl text-orange-600 dark:text-orange-400">{employee.certificates}</div>
                                    <div className="text-sm text-muted-foreground">Certificados</div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-lg mb-3">Progresso por Curso</h4>
                                  <div className="space-y-3">
                                    {[
                                      { name: 'Gestão de Vendas', progress: employee.coursesCompleted >= 1 ? 100 : 0, status: employee.coursesCompleted >= 1 ? 'Concluído' : 'Não iniciado' },
                                      { name: 'Visual Merchandising', progress: employee.coursesCompleted >= 2 ? 100 : (employee.coursesCompleted >= 1 ? 60 : 0), status: employee.coursesCompleted >= 2 ? 'Concluído' : employee.coursesCompleted >= 1 ? 'Em Progresso' : 'Não iniciado' },
                                      { name: 'E-commerce', progress: employee.coursesCompleted >= 3 ? 100 : 0, status: employee.coursesCompleted >= 3 ? 'Concluído' : 'Não iniciado' },
                                      { name: 'Atendimento ao Cliente', progress: 0, status: 'Não iniciado' },
                                      { name: 'Gestão de Estoque', progress: 0, status: 'Não iniciado' }
                                    ].map((course, index) => (
                                      <div key={index} className="flex items-center space-x-3">
                                        <div className="flex-1">
                                          <div className="flex justify-between text-sm mb-1">
                                            <span>{course.name}</span>
                                            <span className="text-muted-foreground">{course.progress}%</span>
                                          </div>
                                          <Progress value={course.progress} className="h-2" />
                                        </div>
                                        <Badge variant={course.status === 'Concluído' ? 'default' : course.status === 'Em Progresso' ? 'secondary' : 'outline'} className="text-xs">
                                          {course.status}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="text-center">
                                  <Button onClick={() => handleEmployeeAccess(employee)}>
                                    <Send className="w-4 h-4 mr-2" />
                                    Acessar como {employee.name}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button 
                            size="sm" 
                            onClick={() => handleEmployeeAccess(employee)}
                            className="flex-1"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Acessar
                          </Button>
                          
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenFeedback(employee)}
                            className="flex-1"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Feedback
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Engajamento por Departamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {departments.map((dept) => {
                          const deptEmployees = employees.filter(emp => emp.department === dept);
                          const avgProgress = Math.round(deptEmployees.reduce((acc, emp) => acc + emp.progress, 0) / deptEmployees.length);
                          
                          return (
                            <div key={dept} className="flex items-center space-x-4">
                              <div className="w-20 text-sm">{dept}</div>
                              <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>{deptEmployees.length} funcionários</span>
                                  <span>{avgProgress}%</span>
                                </div>
                                <Progress value={avgProgress} className="h-2" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Certificados por Mês</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl text-green-600 dark:text-green-400 mb-2">
                          {employees.reduce((acc, emp) => acc + emp.certificates, 0)}
                        </div>
                        <p className="text-sm text-muted-foreground">Total de certificados emitidos</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm text-foreground">
                            <span>Janeiro</span>
                            <span>8 certificados</span>
                          </div>
                          <div className="flex justify-between text-sm text-foreground">
                            <span>Dezembro</span>
                            <span>4 certificados</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Tempo de Estudo</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl text-blue-600 dark:text-blue-400 mb-2">
                          {employees.reduce((acc, emp) => acc + emp.totalHours, 0)}h
                        </div>
                        <p className="text-sm text-muted-foreground">Total de horas estudadas</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm text-foreground">
                            <span>Média por funcionário</span>
                            <span>{Math.round(employees.reduce((acc, emp) => acc + emp.totalHours, 0) / employees.length)}h</span>
                          </div>
                          <div className="flex justify-between text-sm text-foreground">
                            <span>Esta semana</span>
                            <span>42h</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Cadastrar Novo Funcionário</span>
              </DialogTitle>
              <DialogDescription>
                Preencha os dados para criar um novo acesso de funcionário
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Nome Completo *</label>
                <Input
                  placeholder="Ex: João Silva"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email *</label>
                <Input
                  type="email"
                  placeholder="joao.silva@empresa.com"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Cargo *</label>
                <Input
                  placeholder="Ex: Vendedor"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, position: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Departamento *</label>
                <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Atendimento">Atendimento</SelectItem>
                    <SelectItem value="Protocolo">Protocolo</SelectItem>
                    <SelectItem value="Certidões">Certidões</SelectItem>
                    <SelectItem value="Registro">Registro</SelectItem>
                    <SelectItem value="Direção">Direção</SelectItem>
                    <SelectItem value="RH">Recursos Humanos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Senha Inicial</label>
                <Input
                  type="password"
                  placeholder="Deixe vazio para senha padrão (senha123)"
                  value={newEmployee.password}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, password: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground mt-1">Se não informar, será usado "senha123"</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowAddEmployee(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleAddEmployee} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Cadastrar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedEmployee && (
        <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Enviar Feedback para {selectedEmployee.name}</span>
              </DialogTitle>
              <DialogDescription>
                Envie um feedback sobre o desempenho do funcionário em um curso específico
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedEmployee.avatar} />
                  <AvatarFallback>{selectedEmployee.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-foreground">{selectedEmployee.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.position}</p>
                  <Badge variant="outline" className="text-xs">{selectedEmployee.department}</Badge>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Selecionar Curso *</label>
                <Select 
                  value={feedbackData.courseId} 
                  onValueChange={(value) => {
                    const courseNames = {
                      '1': 'Procedimentos de Registro de Imóveis',
                      '2': 'Atendimento ao Público em Cartório',
                      '3': 'Normas da Corregedoria e Rotinas Internas',
                      '4': 'Certidões, Matrículas e Averbações',
                      '5': 'Gestão de Protocolo e Prazos Legais'
                    };
                    setFeedbackData(prev => ({ 
                      ...prev, 
                      courseId: value, 
                      courseName: courseNames[value as keyof typeof courseNames] 
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o curso para o feedback" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Procedimentos de Registro de Imóveis</SelectItem>
                    <SelectItem value="2">Atendimento ao Público em Cartório</SelectItem>
                    <SelectItem value="3">Normas da Corregedoria e Rotinas Internas</SelectItem>
                    <SelectItem value="4">Certidões, Matrículas e Averbações</SelectItem>
                    <SelectItem value="5">Gestão de Protocolo e Prazos Legais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Avaliação *</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFeedbackData(prev => ({ ...prev, rating }))}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 cursor-pointer transition-colors ${
                          rating <= feedbackData.rating 
                            ? 'text-yellow-400 dark:text-yellow-500 fill-current' 
                            : 'text-gray-300 dark:text-gray-600 hover:text-yellow-200 dark:hover:text-yellow-400'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">{feedbackData.rating}/5 estrelas</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Seu Feedback *</label>
                <Textarea
                  placeholder="Escreva seu feedback sobre o desempenho do funcionário neste curso..."
                  value={feedbackData.feedback}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, feedback: e.target.value }))}
                  className="min-h-24"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Compartilhe observações construtivas sobre o progresso, pontos fortes e áreas de melhoria
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowFeedbackModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleSendFeedback} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Feedback
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}