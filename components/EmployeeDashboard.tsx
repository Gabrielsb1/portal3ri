import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { ThemeToggle } from './ui/theme-toggle';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Star, 
  Play, 
  CheckCircle, 
  Heart, 
  MessageCircle, 
  Share, 
  Download,
  Video,
  FileText,
  LogOut,
  Bell,
  Settings,
  Plus,
  Target,
  Eye,
  Sparkles,
  TrendingUp,
  Bot,
  Send,
  User,
  GraduationCap,
  Clock,
  Award,
  MessageSquare,
  ThumbsUp,
  Map,
  ArrowRight,
  List
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EmployeeDashboardProps {
  onLogout: () => void;
  employee: any;
  isDemoMode?: boolean;
  onUpgrade?: () => void;
  feedbacks?: any[];
  onMarkFeedbackAsRead?: (feedbackId: number) => void;
  onStartCourse?: (courseId: number) => void;
}

export function EmployeeDashboard({ onLogout, employee, isDemoMode = false, onUpgrade, feedbacks = [], onMarkFeedbackAsRead, onStartCourse }: EmployeeDashboardProps) {
  const [completedCourses, setCompletedCourses] = useState(employee?.completedCourses || 1);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Olá! Sou a IA assistente do Portal 3RI. Posso ajudar com dúvidas sobre rotinas do registro de imóveis, conceitos registrais ou materiais de treinamento interno.',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Novo curso disponível: Atendimento ao Cliente', time: '2h', read: false },
    { id: 2, text: 'Certificado de "Gestão de Vendas" está pronto', time: '1d', read: false },
    { id: 3, text: 'Seu gestor visualizou seu progresso', time: '2d', read: true }
  ]);

  const courses = [
    {
      id: 1,
      title: 'Procedimentos de Registro de Imóveis',
      description: 'Fluxo da matrícula no 3RI: protocolo, qualificação, registro e expedição de certidões',
      instructor: 'Equipe Registral 3RI',
      duration: '6h',
      level: 'Avançado',
      completed: completedCourses >= 1,
      completedDate: completedCourses >= 1 ? '15 Jan 2025' : undefined,
      grade: completedCourses >= 1 ? 92 : undefined,
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=300&h=200&fit=crop',
      hasExam: true,
      progress: completedCourses >= 1 ? 100 : 0
    },
    {
      id: 2,
      title: 'Atendimento ao Público em Cartório',
      description: 'Boas práticas de atendimento presencial e telefônico no 3º Registro de Imóveis de São Luís/MA',
      instructor: 'Coordenação de Atendimento 3RI',
      duration: '5h',
      level: 'Intermediário',
      completed: completedCourses >= 2,
      completedDate: completedCourses >= 2 ? '20 Jan 2025' : undefined,
      grade: completedCourses >= 2 ? 88 : undefined,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
      hasExam: true,
      progress: completedCourses >= 2 ? 100 : (completedCourses === 1 ? 30 : 0)
    },
    {
      id: 3,
      title: 'Normas da Corregedoria e Rotinas Internas',
      description: 'Principais provimentos, orientações da Corregedoria e padronizações internas do 3RI',
      instructor: 'Oficial do 3RI',
      duration: '8h',
      level: 'Avançado',
      completed: completedCourses >= 3,
      completedDate: completedCourses >= 3 ? '25 Jan 2025' : undefined,
      grade: completedCourses >= 3 ? 95 : undefined,
      image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=300&h=200&fit=crop',
      hasExam: true,
      progress: completedCourses >= 3 ? 100 : 0
    },
    {
      id: 4,
      title: 'Certidões, Matrículas e Averbações',
      description: 'Emissão de certidões, leitura de matrículas e principais tipos de averbações',
      instructor: 'Equipe de Certidões 3RI',
      duration: '4h',
      level: 'Básico',
      completed: false,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop',
      hasExam: true,
      progress: 0
    },
    {
      id: 5,
      title: 'Gestão de Protocolo e Prazos Legais',
      description: 'Organização do protocolo, controle de prazos e comunicação com o usuário externo',
      instructor: 'Supervisão de Protocolo 3RI',
      duration: '6h',
      level: 'Intermediário',
      completed: false,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop',
      hasExam: true,
      progress: 0
    }
  ];

  const handleStartCourse = (courseId: number) => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara começar cursos e acompanhar seu progresso, você precisa que seu gestor cadastre você no sistema.\n\nFale com seu gestor para ter acesso completo!');
      onUpgrade?.();
      return;
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Chamar callback para abrir o player do curso
    if (onStartCourse) {
      onStartCourse(courseId);
    }
  };

  const handleCompleteCourse = (courseId: number) => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara completar cursos e obter certificados, você precisa estar cadastrado no sistema.\n\nFale com seu gestor para ter acesso completo!');
      onUpgrade?.();
      return;
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    setCompletedCourses((prev: number) => Math.max(prev, courseId));
    alert(`Parabéns! Você completou "${course.title}"! 🎉\n\n✅ Curso concluído\n🎯 Prova incluída no curso\n📜 Certificado disponível\n📈 Seu progresso foi atualizado\n\nSeu gestor foi notificado sobre sua conclusão!`);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsAiTyping(true);

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponses = [
        "Ótima pergunta! No contexto do registro de imóveis, esse ponto aparece com frequência na qualificação do título. Posso explicar como o 3RI costuma tratar essa situação no dia a dia.",
        "Entendi sua dúvida. Vou explicar passo a passo como esse procedimento ocorre no cartório, desde o protocolo até o registro na matrícula.",
        "Esse é um tema importante nas rotinas internas. Vou resumir os principais cuidados que o escrevente precisa ter ao analisar esse tipo de ato.",
        "Perfeito! Esse é um exemplo prático do que vemos nos treinamentos internos. Vou relacionar com a norma da Corregedoria aplicável ao caso.",
        "Excelente pergunta sobre certidões e matrículas! Vou explicar como o 3RI organiza essas informações e quais campos merecem mais atenção."
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        id: chatMessages.length + 2,
        type: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsAiTyping(false);
    }, 2000);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const totalCourses = courses.length;
  const completedCoursesCount = courses.filter(c => c.completed).length;
  const totalHours = courses.filter(c => c.completed).reduce((acc, course) => {
    return acc + parseInt(course.duration);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl text-gray-900 dark:text-gray-50 tracking-tight">Portal 3RI</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">3º Registro de Imóveis de São Luís/MA</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap justify-center sm:justify-end">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="relative hover:bg-gray-100/80 dark:hover:bg-gray-700/80">
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hidden sm:flex">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="hover:bg-gray-100/80 dark:hover:bg-gray-700/80">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Demo Banner */}
        {isDemoMode && (
          <Card className="mb-6 sm:mb-8 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 shadow-lg">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-sm text-blue-800 dark:text-blue-300">🔍 Modo Demonstração</h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Você está navegando como visitante. Fale com seu gestor para ter acesso completo.
                    </p>
                  </div>
                </div>
                <Button onClick={onUpgrade} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Falar com Gestor
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="shadow-xl border-0 bg-card backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 shadow-xl ring-4 ring-background">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white text-lg">{employee?.name?.[0] || 'F'}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg sm:text-xl">{employee?.name || 'Funcionário'}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{employee?.position || 'Cargo'}</CardDescription>
                <Badge variant="outline">{employee?.department || 'Departamento'}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2 text-foreground">
                    <span>Progresso dos Cursos</span>
                    <span>{completedCoursesCount}/{totalCourses}</span>
                  </div>
                  <Progress value={(completedCoursesCount / totalCourses) * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400">{completedCoursesCount}</div>
                    <div className="text-xs text-muted-foreground">Cursos</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400">{totalHours}h</div>
                    <div className="text-xs text-muted-foreground">Estudadas</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0 bg-card backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Certificados</span>
                  <span className="text-xs sm:text-sm text-foreground">{completedCoursesCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Média de notas</span>
                  <span className="text-xs sm:text-sm text-foreground">90%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Streak de estudos</span>
                  <span className="text-xs sm:text-sm text-foreground">7 dias</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dashboard" className="text-xs sm:text-sm">Dashboard</TabsTrigger>
                <TabsTrigger value="courses" className="text-xs sm:text-sm">Cursos</TabsTrigger>
                <TabsTrigger value="feedbacks" className="text-xs sm:text-sm relative">
                  Feedbacks
                  {feedbacks.filter(f => !f.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {feedbacks.filter(f => !f.read).length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="ai-chat" className="text-xs sm:text-sm">IA Assistente</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <Card className="shadow-lg border-0 bg-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Cursos Completados</CardTitle>
                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-foreground">{completedCoursesCount}</div>
                      <p className="text-xs text-muted-foreground">de {totalCourses} disponíveis</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Horas de Estudo</CardTitle>
                      <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-foreground">{totalHours}h</div>
                      <p className="text-xs text-muted-foreground">Este mês</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Certificados</CardTitle>
                      <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-foreground">{completedCoursesCount}</div>
                      <p className="text-xs text-muted-foreground">Conquistados</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Progress */}
                <Card className="shadow-lg border-0 bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Progresso Atual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {courses.filter(c => c.progress > 0 && c.progress < 100).length > 0 ? (
                      <div className="space-y-4">
                        {courses.filter(c => c.progress > 0 && c.progress < 100).map((course) => (
                          <div key={course.id} className="flex items-center space-x-4">
                            <ImageWithFallback 
                              src={course.image} 
                              alt={course.title}
                              className="w-16 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm text-foreground">{course.title}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <Progress value={course.progress} className="flex-1 h-2" />
                                <span className="text-xs text-muted-foreground">{course.progress}%</span>
                              </div>
                            </div>
                            <Button size="sm" onClick={() => handleStartCourse(course.id)}>
                              Continuar
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Nenhum curso em progresso. Comece um novo curso na aba "Cursos"!
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Trilha de Aprendizado Recomendada */}
                <Card className="shadow-lg border-0 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <Map className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span>Trilha de Aprendizado Recomendada</span>
                    </CardTitle>
                    <CardDescription>
                      Sequência sugerida de cursos para seu desenvolvimento profissional no 3RI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 4, step: 1, title: 'Certidões, Matrículas e Averbações', level: 'Básico', description: 'Comece pelo básico: aprenda sobre certidões e matrículas' },
                        { id: 2, step: 2, title: 'Atendimento ao Público em Cartório', level: 'Intermediário', description: 'Desenvolva habilidades de atendimento ao público' },
                        { id: 1, step: 3, title: 'Procedimentos de Registro de Imóveis', level: 'Avançado', description: 'Aprofunde-se nos procedimentos registrais' },
                        { id: 5, step: 4, title: 'Gestão de Protocolo e Prazos Legais', level: 'Intermediário', description: 'Domine a gestão de protocolo e prazos' },
                        { id: 3, step: 5, title: 'Normas da Corregedoria e Rotinas Internas', level: 'Avançado', description: 'Conheça as normas e rotinas internas do cartório' }
                      ].map((item, index, array) => {
                        const course = courses.find(c => c.id === item.id);
                        const isCompleted = course?.completed || false;
                        const isInProgress = (course?.progress ?? 0) > 0 && (course?.progress ?? 0) < 100;
                        // Verifica se é o próximo curso recomendado (primeiro não completado após os anteriores completados)
                        const previousCourse = index > 0 ? courses.find(c => c.id === array[index - 1].id) : null;
                        const isNext = !isCompleted && !isInProgress && (index === 0 || (previousCourse?.completed || false));

                        return (
                          <div key={item.id} className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                                isCompleted 
                                  ? 'bg-green-600 dark:bg-green-500 text-white' 
                                  : isInProgress 
                                    ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                                    : isNext
                                      ? 'bg-purple-600 dark:bg-purple-500 text-white ring-2 ring-purple-300 dark:ring-purple-700'
                                      : 'bg-muted text-muted-foreground'
                              }`}>
                                {isCompleted ? <CheckCircle className="w-5 h-5" /> : item.step}
                              </div>
                              {index < array.length - 1 && (
                                <div className={`w-0.5 h-12 my-1 ${
                                  isCompleted ? 'bg-green-600 dark:bg-green-500' : 'bg-muted'
                                }`} />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-start justify-between mb-1">
                                <div>
                                  <h4 className={`font-medium ${
                                    isCompleted 
                                      ? 'text-green-600 dark:text-green-400' 
                                      : isInProgress 
                                        ? 'text-blue-600 dark:text-blue-400' 
                                        : 'text-foreground'
                                  }`}>
                                    {item.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                                </div>
                                <Badge variant={item.level === 'Básico' ? 'secondary' : item.level === 'Intermediário' ? 'default' : 'destructive'} className="ml-2">
                                  {item.level}
                                </Badge>
                              </div>
                              {isInProgress && course && (
                                <div className="mt-2">
                                  <Progress value={course.progress} className="h-2" />
                                  <span className="text-xs text-muted-foreground mt-1">{course.progress}% concluído</span>
                                </div>
                              )}
                              {isNext && (
                                <Button 
                                  size="sm" 
                                  className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500"
                                  onClick={() => handleStartCourse(item.id)}
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Iniciar Agora
                                </Button>
                              )}
                              {isInProgress && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="mt-2"
                                  onClick={() => handleStartCourse(item.id)}
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Continuar
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses" className="space-y-6">
                <Tabs defaultValue="my-courses" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="my-courses" className="flex items-center space-x-2">
                      <List className="w-4 h-4" />
                      <span>Meus Cursos</span>
                    </TabsTrigger>
                    <TabsTrigger value="available" className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Cursos Disponíveis</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Meus Cursos */}
                  <TabsContent value="my-courses" className="space-y-6">
                    <div className="grid gap-6">
                      {courses.filter(c => c.progress > 0 || c.completed).length > 0 ? (
                        courses.filter(c => c.progress > 0 || c.completed).map((course) => (
                          <Card key={course.id} className="shadow-lg border-0 bg-card hover:shadow-xl transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row gap-6">
                                <ImageWithFallback 
                                  src={course.image} 
                                  alt={course.title}
                                  className="w-full md:w-48 h-32 rounded-lg object-cover"
                                />
                                <div className="flex-1 space-y-4">
                                  <div>
                                    <div className="flex items-start justify-between mb-2">
                                      <h3 className="text-lg">{course.title}</h3>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant={course.level === 'Básico' ? 'secondary' : course.level === 'Intermediário' ? 'default' : 'destructive'}>
                                          {course.level}
                                        </Badge>
                                        {course.completed && (
                                          <Badge className="bg-green-600 dark:bg-green-500">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Concluído
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                                    
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                      <span>👨‍🏫 {course.instructor}</span>
                                      <span>⏱️ {course.duration}</span>
                                      {course.hasExam && <span>🎯 Inclui prova</span>}
                                    </div>
                                    
                                    {course.completed && course.grade && (
                                      <div className="flex items-center space-x-2 mt-2">
                                        <Star className="w-4 h-4 text-yellow-400 dark:text-yellow-500 fill-current" />
                                        <span className="text-sm text-foreground">Nota: {course.grade}%</span>
                                        <Badge variant="outline" className="text-xs">
                                          Concluído em {course.completedDate}
                                        </Badge>
                                      </div>
                                    )}
                                    
                                    {course.progress > 0 && course.progress < 100 && (
                                      <div className="mt-3">
                                        <div className="flex justify-between text-sm mb-1">
                                          <span>Progresso</span>
                                          <span>{course.progress}%</span>
                                        </div>
                                        <Progress value={course.progress} className="h-2" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center space-x-3">
                                    {course.completed ? (
                                      <div className="flex items-center space-x-3">
                                        <Button variant="outline" size="sm">
                                          <Download className="w-4 h-4 mr-2" />
                                          Certificado
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleStartCourse(course.id)}>
                                          <Play className="w-4 h-4 mr-2" />
                                          Revisar
                                        </Button>
                                        {(() => {
                                          const courseFeedback = feedbacks.find(f => f.courseId === course.id);
                                          if (courseFeedback) {
                                            return (
                                              <Button 
                                                variant="outline" 
                                                size="sm"
                                                className="relative"
                                                onClick={() => {
                                                  onMarkFeedbackAsRead?.(courseFeedback.id);
                                                  alert(`Feedback do Gestor:\n\n"${courseFeedback.feedback}"\n\nAvaliação: ${courseFeedback.rating}/5 estrelas\nData: ${courseFeedback.date}`);
                                                }}
                                              >
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Feedback
                                                {!courseFeedback.read && (
                                                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full"></span>
                                                )}
                                              </Button>
                                            );
                                          }
                                          return null;
                                        })()}
                                      </div>
                                    ) : course.progress > 0 ? (
                                      <Button onClick={() => handleStartCourse(course.id)}>
                                        <Play className="w-4 h-4 mr-2" />
                                        Continuar Curso
                                      </Button>
                                    ) : null}
                                    
                                    {course.progress > 80 && !course.completed && (
                                      <Button 
                                        variant="outline"
                                        onClick={() => handleCompleteCourse(course.id)}
                                      >
                                        <Target className="w-4 h-4 mr-2" />
                                        Fazer Prova
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <Card className="shadow-lg border-0 bg-card">
                          <CardContent className="p-12 text-center">
                            <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum curso iniciado</h3>
                            <p className="text-muted-foreground mb-4">Comece sua jornada de aprendizado explorando os cursos disponíveis!</p>
                            <Button onClick={() => {
                              const tabs = document.querySelector('[value="courses"]');
                              if (tabs) {
                                const availableTab = document.querySelector('[value="available"]');
                                if (availableTab) (availableTab as HTMLElement).click();
                              }
                            }}>
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Ver Cursos Disponíveis
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  {/* Cursos Disponíveis */}
                  <TabsContent value="available" className="space-y-6">
                    <div className="grid gap-6">
                      {courses.filter(c => c.progress === 0 && !c.completed).length > 0 ? (
                        courses.filter(c => c.progress === 0 && !c.completed).map((course) => (
                          <Card key={course.id} className="shadow-lg border-0 bg-card hover:shadow-xl transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row gap-6">
                                <ImageWithFallback 
                                  src={course.image} 
                                  alt={course.title}
                                  className="w-full md:w-48 h-32 rounded-lg object-cover"
                                />
                                <div className="flex-1 space-y-4">
                                  <div>
                                    <div className="flex items-start justify-between mb-2">
                                      <h3 className="text-lg">{course.title}</h3>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant={course.level === 'Básico' ? 'secondary' : course.level === 'Intermediário' ? 'default' : 'destructive'}>
                                          {course.level}
                                        </Badge>
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                                    
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                      <span>👨‍🏫 {course.instructor}</span>
                                      <span>⏱️ {course.duration}</span>
                                      {course.hasExam && <span>🎯 Inclui prova</span>}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3">
                                    <Button onClick={() => handleStartCourse(course.id)} className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">
                                      <Play className="w-4 h-4 mr-2" />
                                      Iniciar Curso
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <Card className="shadow-lg border-0 bg-card">
                          <CardContent className="p-12 text-center">
                            <Trophy className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-foreground mb-2">Parabéns!</h3>
                            <p className="text-muted-foreground">Você já iniciou todos os cursos disponíveis. Continue estudando para concluí-los!</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* Feedbacks Tab */}
              <TabsContent value="feedbacks" className="space-y-6">
                <Card className="shadow-lg border-0 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span>Feedbacks do Gestor</span>
                    </CardTitle>
                    <CardDescription>
                      Veja os feedbacks que seu gestor enviou sobre seu desempenho nos cursos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {feedbacks.length > 0 ? (
                      <div className="space-y-4">
                        {feedbacks
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((feedback) => (
                            <Card 
                              key={feedback.id} 
                              className={`${!feedback.read ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30' : 'border-border'} hover:shadow-md transition-shadow`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                      <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-foreground">{feedback.managerName}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        Feedback sobre: <span className="font-medium">{feedback.courseName}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={`w-4 h-4 ${
                                            i < feedback.rating 
                                              ? 'text-yellow-400 dark:text-yellow-500 fill-current' 
                                              : 'text-muted-foreground/30'
                                          }`} 
                                        />
                                      ))}
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {feedback.date}
                                    </Badge>
                                    {!feedback.read && (
                                      <Badge className="bg-blue-600 dark:bg-blue-500 text-xs">Novo</Badge>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="bg-muted rounded-lg p-4 mb-3">
                                  <p className="text-foreground">{feedback.feedback}</p>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>Avaliação: {feedback.rating}/5</span>
                                  </div>
                                  
                                  {!feedback.read && (
                                    <Button 
                                      size="sm" 
                                      onClick={() => onMarkFeedbackAsRead?.(feedback.id)}
                                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                    >
                                      Marcar como Lido
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        }
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-lg text-foreground mb-2">Nenhum feedback ainda</h3>
                        <p className="text-muted-foreground">
                          Complete seus cursos para receber feedbacks do seu gestor sobre seu desempenho!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Recent Feedbacks Summary */}
                {feedbacks.length > 0 && (
                  <Card className="shadow-lg border-0 bg-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Resumo dos Feedbacks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="text-2xl text-green-600 dark:text-green-400 mb-1">
                            {feedbacks.length}
                          </div>
                          <div className="text-sm text-muted-foreground">Total de Feedbacks</div>
                        </div>
                        
                        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="text-2xl text-yellow-600 dark:text-yellow-400 mb-1">
                            {feedbacks.length > 0 ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1) : '0'}
                          </div>
                          <div className="text-sm text-muted-foreground">Avaliação Média</div>
                        </div>
                        
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">
                            {feedbacks.filter(f => !f.read).length}
                          </div>
                          <div className="text-sm text-muted-foreground">Não Lidos</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* AI Chat Tab */}
              <TabsContent value="ai-chat" className="space-y-6">
                <Card className="shadow-lg border-0 bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span>IA Assistente</span>
                    </CardTitle>
                    <CardDescription>
                      Tire suas dúvidas sobre os cursos, peça explicações ou dicas de estudo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-80 overflow-y-auto border rounded-lg p-4 bg-muted/50">
                        <div className="space-y-4">
                          {chatMessages.map((message) => (
                            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.type === 'user' 
                                  ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                                  : 'bg-card border border-border'
                              }`}>
                                <div className="flex items-start space-x-2">
                                  {message.type === 'ai' && (
                                    <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                  )}
                                  {message.type === 'user' && (
                                    <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                  )}
                                  <div>
                                    <p className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-foreground'}`}>{message.content}</p>
                                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {isAiTyping && (
                            <div className="flex justify-start">
                              <div className="bg-card border border-border px-4 py-2 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Digite sua pergunta sobre os cursos..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          disabled={isAiTyping}
                        />
                        <Button 
                          onClick={handleSendMessage} 
                          disabled={!chatInput.trim() || isAiTyping}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="text-xs text-muted-foreground text-center">
                        A IA pode ajudar com dúvidas sobre conceitos, dicas de estudo e explicações dos cursos
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}