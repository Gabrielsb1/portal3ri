import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Star, 
  Play, 
  Lock, 
  Heart, 
  MessageCircle, 
  Share, 
  Download,
  Video,
  FileText,
  Crown,
  LogOut,
  Bell,
  Settings,
  ExternalLink,
  Plus,
  Target,
  Zap,
  Eye,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CurriculumGenerator } from './CurriculumGenerator';
import { VideoCreator } from './VideoCreator';
import { CreatePostModal } from './CreatePostModal';
import { PremiumUpgrade } from './PremiumUpgrade';
import { CourseReviewModal } from './CourseReviewModal';
import { ConnectionsModal } from './ConnectionsModal';
import { ExamModal } from './ExamModal';

interface DashboardProps {
  onLogout: () => void;
  isDemoMode?: boolean;
  onUpgrade?: () => void;
}

export function Dashboard({ onLogout, isDemoMode = false, onUpgrade }: DashboardProps) {
  const [completedCourses, setCompletedCourses] = useState(1);
  const [isPremium, setIsPremium] = useState(false);
  const [showCurriculumGenerator, setShowCurriculumGenerator] = useState(false);
  const [showVideoCreator, setShowVideoCreator] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showPremiumUpgrade, setShowPremiumUpgrade] = useState(false);
  const [showCourseReview, setShowCourseReview] = useState<number | null>(null);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState<string | null>(null);
  const [userRank, setUserRank] = useState(24);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Nova empresa do varejo visualizou seu perfil', time: '2h', read: false },
    { id: 2, text: 'Alguém curtiu sua publicação sobre vendas', time: '1d', read: false },
    { id: 3, text: 'Novo curso disponível: Atendimento ao Cliente', time: '2d', read: true }
  ]);
  const [feedPosts, setFeedPosts] = useState([
    {
      id: 1,
      author: 'Marina Vendas',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e8?w=100&h=100&fit=crop&crop=face',
      time: '2h',
      content: 'Acabei de completar o curso "Gestão de Vendas no Varejo"! 🛍️ Aprendi técnicas incríveis para aumentar a conversão e fidelizar clientes.',
      course: 'Gestão de Vendas',
      likes: 34,
      comments: 12,
      shares: 5,
      liked: false
    },
    {
      id: 2,
      author: 'Carlos Vitrine',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      time: '5h',
      content: 'Finalizei meu projeto de Visual Merchandising! A vitrine ficou incrível e as vendas aumentaram 40%. O curso realmente funciona! 📈',
      course: 'Visual Merchandising',
      likes: 28,
      comments: 8,
      shares: 3,
      liked: true
    }
  ]);

  const courses = [
    {
      id: 1,
      title: 'Gestão de Vendas no Varejo',
      description: 'Estratégias avançadas para aumentar vendas e fidelizar clientes no varejo moderno',
      instructor: 'Marina Varejo',
      duration: '6h',
      level: 'Avançado',
      isPremium: false,
      completed: completedCourses >= 1,
      completedDate: completedCourses >= 1 ? '15 Jan 2025' : undefined,
      grade: completedCourses >= 1 ? 92 : undefined,
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=300&h=200&fit=crop',
      hasExam: true
    },
    {
      id: 2,
      title: 'Visual Merchandising Avançado',
      description: 'Técnicas profissionais de vitrinismo e exposição de produtos para maximizar vendas',
      instructor: 'Carlos Vitrine',
      duration: '5h',
      level: 'Intermediário',
      isPremium: false,
      completed: completedCourses >= 2,
      completedDate: completedCourses >= 2 ? '20 Jan 2025' : undefined,
      grade: completedCourses >= 2 ? 88 : undefined,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
      hasExam: true
    },
    {
      id: 3,
      title: 'E-commerce e Omnichannel',
      description: 'Estratégias digitais e integração de canais online/offline no varejo',
      instructor: 'Ana Digital',
      duration: '8h',
      level: 'Avançado',
      isPremium: false,
      completed: completedCourses >= 3,
      completedDate: completedCourses >= 3 ? '25 Jan 2025' : undefined,
      grade: completedCourses >= 3 ? 95 : undefined,
      image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=300&h=200&fit=crop',
      hasExam: true
    },
    {
      id: 4,
      title: 'Atendimento ao Cliente Excepcional',
      description: 'Técnicas de atendimento que encantam clientes e geram fidelização',
      instructor: 'Patricia Cliente',
      duration: '4h',
      level: 'Básico',
      isPremium: false,
      completed: false,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop',
      hasExam: true
    },
    {
      id: 5,
      title: 'Gestão de Estoque e Compras',
      description: 'Otimização de estoque, análise de giro e estratégias de compras inteligentes',
      instructor: 'Roberto Estoque',
      duration: '6h',
      level: 'Intermediário',
      isPremium: true,
      completed: false,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop',
      hasExam: true
    },
    {
      id: 6,
      title: 'Marketing Digital para Varejo',
      description: 'Estratégias de marketing digital específicas para lojas e e-commerce',
      instructor: 'Camila Marketing',
      duration: '7h',
      level: 'Intermediário',
      isPremium: true,
      completed: false,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      hasExam: true
    },
    {
      id: 7,
      title: 'Gestão de Equipes no Varejo',
      description: 'Liderança, motivação e desenvolvimento de equipes de vendas',
      instructor: 'Fernando Líder',
      duration: '5h',
      level: 'Avançado',
      isPremium: false,
      completed: false,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
      hasExam: true
    },
    {
      id: 8,
      title: 'Análise de Dados no Varejo',
      description: 'KPIs, métricas e análise de dados para tomada de decisão no varejo',
      instructor: 'Lucas Analytics',
      duration: '6h',
      level: 'Avançado',
      isPremium: true,
      completed: false,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      hasExam: true
    },
    {
      id: 9,
      title: 'Negociação e Relacionamento com Fornecedores',
      description: 'Técnicas de negociação e gestão de relacionamento com fornecedores',
      instructor: 'João Negociador',
      duration: '5h',
      level: 'Intermediário',
      isPremium: true,
      completed: false,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      hasExam: true
    },
    {
      id: 10,
      title: 'Tendências e Inovação no Varejo',
      description: 'Últimas tendências, tecnologias emergentes e inovação no setor',
      instructor: 'Sofia Inovação',
      duration: '4h',
      level: 'Intermediário',
      isPremium: true,
      completed: false,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      hasExam: true
    }
  ];

  const handleStartCourse = (courseId: number) => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara começar cursos e acompanhar seu progresso, você precisa criar uma conta gratuita.\n\nClique em "Criar Conta" para se cadastrar e aproveitar o primeiro mês premium grátis!');
      onUpgrade?.();
      return;
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    if (course.isPremium && !isPremium) {
      alert('Este é um curso Premium!\n\nFaça o upgrade para acessar todos os cursos avançados e recursos exclusivos.');
      setShowPremiumUpgrade(true);
      return;
    }

    // Simula início do curso
    alert(`Iniciando "${course.title}"!\n\n📚 Curso: ${course.title}\n👨‍🏫 Instrutor: ${course.instructor}\n⏱️ Duração: ${course.duration}\n📊 Nível: ${course.level}\n🎯 Inclui: Prova para certificação\n\nEm uma versão real, isso abriaria o player do curso com as aulas.`);
  };

  const handleCompleteCourse = (courseId: number) => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara começar cursos e acompanhar seu progresso, você precisa criar uma conta gratuita.\n\nClique em "Criar Conta" para se cadastrar e aproveitar o primeiro mês premium grátis!');
      onUpgrade?.();
      return;
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    if (course.isPremium && !isPremium) {
      alert('Este é um curso Premium!\n\nFaça o upgrade para acessar todos os cursos avançados e recursos exclusivos.');
      setShowPremiumUpgrade(true);
      return;
    }
    
    setCompletedCourses(prev => Math.max(prev, courseId));
    alert(`Parabéns! Você completou "${course.title}"! 🎉\n\n✅ Curso concluído\n🎯 Prova incluída no curso\n📈 Seu ranking melhorou\n\nContinue aprendendo para desbloquear mais recursos!`);
  };

  const getRankDisplay = () => {
    if (isDemoMode) {
      return 'Top 100';
    }
    
    if (isPremium) {
      return `#${userRank}`;
    }
    
    // Usuários não-premium veem apenas faixas
    if (userRank <= 10) return 'Top 10';
    if (userRank <= 50) return 'Top 50';
    if (userRank <= 100) return 'Top 100';
    return 'Top 500+';
  };

  const getRankDisplayWithBlur = () => {
    if (isDemoMode || isPremium) {
      return <span className="text-2xl">{getRankDisplay()}</span>;
    }
    
    // Para usuários gratuitos, mostrar ranking exato borrado
    return (
      <div className="relative cursor-pointer" onClick={() => setShowPremiumUpgrade(true)}>
        <span className="text-2xl blur-sm select-none pointer-events-none">#{userRank}</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs px-2 py-1 shadow-lg">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      </div>
    );
  };

  const handleCreatePost = (newPost: any) => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara publicar no feed e interagir com outros profissionais, você precisa criar uma conta.\n\nClique em "Criar Conta" para se cadastrar gratuitamente!');
      onUpgrade?.();
      return;
    }
    
    if (!isPremium) {
      setShowPremiumUpgrade(true);
      return;
    }
    setFeedPosts(prev => [newPost, ...prev]);
  };

  const handleLikePost = (postId: number) => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara curtir posts e interagir no feed, você precisa criar uma conta gratuita.\n\nClique em "Criar Conta" para se cadastrar!');
      onUpgrade?.();
      return;
    }
    
    setFeedPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleTryCreatePost = () => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara publicar no feed e conectar-se com outros profissionais, você precisa criar uma conta.\n\nClique em "Criar Conta" para se cadastrar gratuitamente!');
      onUpgrade?.();
      return;
    }
    
    if (!isPremium) {
      alert('Publicar no feed é uma funcionalidade exclusiva Premium!\n\nFaça o upgrade para compartilhar suas conquistas e conectar-se com outros profissionais.');
      setShowPremiumUpgrade(true);
      return;
    }
    setShowCreatePost(true);
  };

  const handleReviewCourse = (courseId: number) => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara revisar cursos e acessar todos os materiais, você precisa criar uma conta gratuita.\n\nClique em "Criar Conta" para começar!');
      onUpgrade?.();
      return;
    }
    
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setShowCourseReview(courseId);
    }
  };

  const handleExamComplete = (score: number) => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara fazer provas e melhorar seu ranking, você precisa criar uma conta.\n\nClique em "Criar Conta" para se cadastrar gratuitamente!');
      onUpgrade?.();
      return;
    }
    
    // Simular melhoria no ranking com base na nota
    if (score >= 80) {
      setUserRank(prev => Math.max(1, prev - 3));
    } else if (score >= 60) {
      setUserRank(prev => Math.max(1, prev - 1));
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const canAccessAIFeatures = completedCourses >= 2 && isPremium;
  const canAccessTalentBank = completedCourses >= 2;
  const totalCourses = courses.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl text-gray-900 tracking-tight">TalentHub</span>
              <span className="text-xs text-gray-600 font-medium">Futuro em Movimento</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap justify-center sm:justify-end">
            {!isPremium && (
              <Button 
                onClick={() => setShowPremiumUpgrade(true)} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-shadow text-xs sm:text-sm px-3 sm:px-4"
              >
                <Crown className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Upgrade Premium</span>
                <span className="sm:hidden">Premium</span>
              </Button>
            )}
            <Button variant="ghost" size="sm" className="relative hover:bg-gray-100/80">
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100/80 hidden sm:flex">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="hover:bg-gray-100/80">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Demo Banner */}
        {isDemoMode && (
          <Card className="mb-6 sm:mb-8 border-blue-200 bg-blue-50 shadow-lg">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-sm text-blue-800">🔍 Modo Demonstração</h4>
                    <p className="text-xs text-blue-600">
                      Você está navegando sem conta. Muitas funcionalidades estão bloqueadas.
                    </p>
                  </div>
                </div>
                <Button onClick={onUpgrade} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Conta Grátis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 shadow-xl ring-4 ring-white">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg">JS</AvatarFallback>
                  </Avatar>
                  {isPremium && (
                    <div className="absolute -top-2 -right-2">
                      <Crown className="w-6 h-6 text-yellow-500 drop-shadow-lg" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg sm:text-xl">João Silva</CardTitle>
                <CardDescription className="text-sm sm:text-base">Especialista em Varejo</CardDescription>
                {isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso dos Cursos</span>
                    <span>{completedCourses}/{totalCourses}</span>
                  </div>
                  <Progress value={(completedCourses / totalCourses) * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl text-blue-600">{completedCourses}</div>
                    <div className="text-xs text-gray-600">Cursos</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl text-purple-600 cursor-pointer" onClick={() => setShowConnectionsModal(true)}>
                      24
                    </div>
                    <div className="text-xs text-gray-600">Conexões</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs sm:text-sm"
                    onClick={() => setShowConnectionsModal(true)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Descobrir Pessoas
                  </Button>
                  
                  {completedCourses > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm"
                      onClick={() => setShowExamModal(courses[0].title)}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Fazer Prova
                    </Button>
                  )}
                </div>

                {canAccessAIFeatures && (
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm"
                      onClick={() => setShowVideoCreator(true)}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Vídeo Apresentação
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm"
                      onClick={() => setShowCurriculumGenerator(true)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Currículo IA
                      <Download className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Horas estudadas</span>
                  <span className="text-xs sm:text-sm">18h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Rank no banco</span>
                  <div className="flex items-center">
                    {getRankDisplayWithBlur()}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">Visualizações perfil</span>
                  <span className="text-xs sm:text-sm">142</span>
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
                <TabsTrigger value="feed" className="text-xs sm:text-sm">Feed</TabsTrigger>
                <TabsTrigger value="talent" className="text-xs sm:text-sm">Talentos</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <Card className="shadow-lg border-0 bg-white/80">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Cursos Completados</CardTitle>
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">{completedCourses}</div>
                      <p className="text-xs text-gray-600">de {totalCourses} disponíveis</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white/80">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Posts no Feed</CardTitle>
                      <Users className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">2</div>
                      <p className="text-xs text-gray-600">Este mês</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white/80">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Ranking</CardTitle>
                      <Trophy className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      {getRankDisplayWithBlur()}
                      <p className="text-xs text-gray-600">No banco de talentos</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Achievement Cards */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl">Próximas Conquistas</h3>
                  <div className="grid gap-4">
                    <Card className={`shadow-lg border-0 ${canAccessAIFeatures ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-white/80'}`}>
                      <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4 gap-3 sm:gap-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${canAccessAIFeatures ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <FileText className={`w-5 h-5 ${canAccessAIFeatures ? 'text-green-600' : 'text-gray-400'}`} />
                          </div>
                          <div className="text-center sm:text-left">
                            <h4 className="text-sm">Currículo Personalizado IA</h4>
                            <p className="text-xs text-gray-600">Complete 2 cursos + Premium para desbloquear</p>
                          </div>
                        </div>
                        {canAccessAIFeatures ? (
                          <Badge className="bg-green-600">Desbloqueado!</Badge>
                        ) : (
                          <div className="flex flex-col items-center sm:items-end space-y-1">
                            <Badge variant="secondary">{completedCourses}/2</Badge>
                            {completedCourses >= 2 && !isPremium && (
                              <Badge variant="outline" className="text-xs cursor-pointer" onClick={() => setShowPremiumUpgrade(true)}>
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className={`shadow-lg border-0 ${canAccessAIFeatures ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-white/80'}`}>
                      <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4 gap-3 sm:gap-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${canAccessAIFeatures ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <Video className={`w-5 h-5 ${canAccessAIFeatures ? 'text-green-600' : 'text-gray-400'}`} />
                          </div>
                          <div className="text-center sm:text-left">
                            <h4 className="text-sm">Vídeo de Apresentação</h4>
                            <p className="text-xs text-gray-600">Complete 2 cursos + Premium para desbloquear</p>
                          </div>
                        </div>
                        {canAccessAIFeatures ? (
                          <Badge className="bg-green-600">Desbloqueado!</Badge>
                        ) : (
                          <div className="flex flex-col items-center sm:items-end space-y-1">
                            <Badge variant="secondary">{completedCourses}/2</Badge>
                            {completedCourses >= 2 && !isPremium && (
                              <Badge variant="outline" className="text-xs cursor-pointer" onClick={() => setShowPremiumUpgrade(true)}>
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses" className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                  <h3 className="text-lg sm:text-xl">Meus Cursos</h3>
                  <Button variant="outline" className="text-xs sm:text-sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Explorar Mais Cursos
                  </Button>
                </div>

                {/* Cursos Completados Section */}
                {completedCourses > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-green-600" />
                      <h4 className="text-base sm:text-lg text-green-600">Cursos Completados</h4>
                      <Badge className="bg-green-600">{completedCourses}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {courses.filter(course => course.completed).map((course) => (
                        <Card key={course.id} className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
                          <div className="relative">
                            <ImageWithFallback
                              src={course.image}
                              alt={course.title}
                              className="w-full h-32 sm:h-48 object-cover rounded-t-lg"
                            />
                            <Badge className="absolute top-2 right-2 bg-green-600 shadow-lg">
                              Concluído ✓
                            </Badge>
                            {course.hasExam && (
                              <Badge className="absolute top-2 left-2 bg-blue-600 shadow-lg">
                                <Target className="w-3 h-3 mr-1" />
                                Prova Incluída
                              </Badge>
                            )}
                          </div>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base sm:text-lg">{course.title}</CardTitle>
                              {course.isPremium && (
                                <Badge variant="secondary">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-sm">{course.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                              <span className="text-xs sm:text-sm text-gray-600">Por {course.instructor}</span>
                              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                                <span>{course.duration}</span>
                                <span>•</span>
                                <span>{course.level}</span>
                              </div>
                            </div>
                            
                            {course.grade && (
                              <div className="mb-4 p-3 bg-green-100 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-green-800">Nota final:</span>
                                  <span className="text-lg text-green-800">{course.grade}%</span>
                                </div>
                                <div className="text-xs text-green-600 mt-1">
                                  Completado em {course.completedDate}
                                </div>
                              </div>
                            )}
                            
                            <Button 
                              variant="outline" 
                              className="w-full text-xs sm:text-sm"
                              onClick={() => handleReviewCourse(course.id)}
                            >
                              <Trophy className="w-4 h-4 mr-2" />
                              Revisar Curso
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outros Cursos Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h4 className="text-base sm:text-lg">Continuar Aprendendo</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {courses.filter(course => !course.completed).map((course) => (
                      <Card key={course.id} className="shadow-lg border-0 bg-white/80 hover:shadow-xl transition-shadow">
                        <div className="relative">
                          <ImageWithFallback
                            src={course.image}
                            alt={course.title}
                            className="w-full h-32 sm:h-48 object-cover rounded-t-lg"
                          />
                          {course.isPremium && !isPremium && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                              <div className="text-center text-white">
                                <Lock className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-sm">Premium</p>
                              </div>
                            </div>
                          )}
                          {course.hasExam && (
                            <Badge className="absolute top-2 left-2 bg-blue-600 shadow-lg">
                              <Target className="w-3 h-3 mr-1" />
                              Prova Incluída
                            </Badge>
                          )}
                        </div>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base sm:text-lg">{course.title}</CardTitle>
                            {course.isPremium && (
                              <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white">
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-sm">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                            <span className="text-xs sm:text-sm text-gray-600">Por {course.instructor}</span>
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                              <span>{course.duration}</span>
                              <span>•</span>
                              <span>{course.level}</span>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full text-xs sm:text-sm"
                            onClick={() => handleStartCourse(course.id)}
                            disabled={course.isPremium && !isPremium}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            {course.isPremium && !isPremium ? 'Upgrade para Acessar' : 'Iniciar Curso'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Feed Tab */}
              <TabsContent value="feed" className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                  <h3 className="text-lg sm:text-xl">Feed Profissional</h3>
                  <Button onClick={handleTryCreatePost} className="text-xs sm:text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Post
                  </Button>
                </div>

                <div className="space-y-6">
                  {feedPosts.map((post) => (
                    <Card key={post.id} className="shadow-lg border-0 bg-white/80">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                              <h4 className="text-sm">{post.author}</h4>
                              <Badge variant="outline" className="text-xs w-fit">
                                <Trophy className="w-3 h-3 mr-1" />
                                {post.course}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">{post.time}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{post.content}</p>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLikePost(post.id)}
                            className={`text-xs sm:text-sm ${post.liked ? 'text-red-500' : ''}`}
                          >
                            <Heart className={`w-4 h-4 mr-2 ${post.liked ? 'fill-current' : ''}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                            <Share className="w-4 h-4 mr-2" />
                            {post.shares}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Talent Bank Tab */}
              <TabsContent value="talent" className="space-y-6">
                <div className="text-center py-12">
                  {canAccessTalentBank ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl text-green-600">Parabéns! Você está no Banco de Talentos</h3>
                      <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                        Seu perfil agora é visível para empresas do varejo. Continue completando cursos e melhorando suas habilidades para subir no ranking!
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl text-blue-600 mb-2">142</div>
                          <div className="text-sm text-gray-600">Visualizações do Perfil</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl text-purple-600 mb-2">{getRankDisplay()}</div>
                          <div className="text-sm text-gray-600">Posição no Ranking</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg sm:col-span-2 lg:col-span-1">
                          <div className="text-2xl text-green-600 mb-2">7</div>
                          <div className="text-sm text-gray-600">Empresas Interessadas</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <Trophy className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl text-gray-600">Complete 2 cursos para acessar o Banco de Talentos</h3>
                      <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
                        Após completar 2 cursos, seu perfil ficará visível para empresas do varejo que procuram novos talentos.
                      </p>
                      <div className="mt-6">
                        <Progress value={(completedCourses / 2) * 100} className="max-w-md mx-auto h-3" />
                        <p className="text-sm text-gray-600 mt-2">{completedCourses}/2 cursos completados</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCurriculumGenerator && (
        <CurriculumGenerator onClose={() => setShowCurriculumGenerator(false)} />
      )}
      
      {showVideoCreator && (
        <VideoCreator onClose={() => setShowVideoCreator(false)} />
      )}
      
      {showCreatePost && (
        <CreatePostModal 
          onClose={() => setShowCreatePost(false)}
          onPost={handleCreatePost}
        />
      )}
      
      {showPremiumUpgrade && (
        <PremiumUpgrade 
          onClose={() => setShowPremiumUpgrade(false)}
          onUpgrade={() => {
            setIsPremium(true);
            setShowPremiumUpgrade(false);
            alert('🎉 Upgrade realizado com sucesso!\n\nAgora você tem acesso a todas as funcionalidades Premium!');
          }}
        />
      )}
      
      {showCourseReview !== null && (
        <CourseReviewModal 
          onClose={() => setShowCourseReview(null)}
          course={courses.find(c => c.id === showCourseReview)}
        />
      )}
      
      {showConnectionsModal && (
        <ConnectionsModal onClose={() => setShowConnectionsModal(false)} />
      )}
      
      {showExamModal && (
        <ExamModal 
          onClose={() => setShowExamModal(null)}
          courseName={showExamModal}
          onComplete={handleExamComplete}
        />
      )}
    </div>
  );
}