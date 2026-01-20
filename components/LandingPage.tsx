import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ThemeToggle } from './ui/theme-toggle';
import { 
  Building2, 
  Users, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Star, 
  Play, 
  CheckCircle, 
  ArrowRight,
  GraduationCap,
  Target,
  BarChart3,
  Clock,
  Award,
  Eye,
  UserPlus,
  Sparkles,
  Bot,
  Shield,
  Zap
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onGetStarted: () => void;
  onCompanyAccess: () => void;
  onDemo: () => void;
}

export function LandingPage({ onGetStarted, onCompanyAccess, onDemo }: LandingPageProps) {
  const features = [
    {
      icon: Users,
      title: 'Gestão de Servidores',
      description: 'Cadastre e organize os colaboradores do cartório, acompanhando o desempenho de cada um',
      color: 'bg-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Treinamentos Registral',
      description: 'Conteúdo focado em registro de imóveis, matrícula, certidões e procedimentos internos',
      color: 'bg-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Indicadores do Cartório',
      description: 'Acompanhe produtividade, cumprimento de prazos e evolução por setor',
      color: 'bg-green-600'
    },
    {
      icon: Bot,
      title: 'IA Assistente Registral',
      description: 'Colaboradores podem tirar dúvidas sobre rotinas e conceitos de registro de imóveis',
      color: 'bg-orange-600'
    },
    {
      icon: Award,
      title: 'Trilhas de Capacitação',
      description: 'Trilhas internas com avaliação e registro de conclusão para cada servidor',
      color: 'bg-pink-600'
    },
    {
      icon: Shield,
      title: 'Acesso Controlado',
      description: 'Perfis diferenciados para oficial, substitutos, escreventes e estagiários',
      color: 'bg-indigo-600'
    }
  ];

  const benefits = [
    {
      title: 'Para a Administração do 3RI',
      items: [
        'Cadastre e gerencie todos os colaboradores do cartório',
        'Acompanhe o nível de capacitação por setor (atendimento, protocolo, registro, certidões)',
        'Relatórios detalhados de participação em treinamentos internos',
        'Histórico de trilhas concluídas por servidor',
        'Visão consolidada da equipe para decisões de gestão'
      ]
    },
    {
      title: 'Para os Colaboradores',
      items: [
        'Acesso a trilhas sobre rotina registral e atendimento ao público',
        'IA assistente para dúvidas sobre procedimentos e conceitos',
        'Acompanhamento do próprio progresso em cada módulo',
        'Registro de participação em treinamentos obrigatórios',
        'Interface simples, pensada para o dia a dia de cartório'
      ]
    }
  ];

  const courses = [
    {
      title: 'Procedimentos de Registro de Imóveis',
      description: 'Fluxo completo da matrícula: protocolo, qualificação, registro e expedição de certidões',
      level: 'Intermediário',
      duration: '6h',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop'
    },
    {
      title: 'Atendimento ao Público em Cartório',
      description: 'Boas práticas de atendimento presencial e digital no 3º Registro de Imóveis de São Luís',
      level: 'Básico',
      duration: '4h',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop'
    },
    {
      title: 'Normas da Corregedoria e Rotinas Internas',
      description: 'Principais provimentos, orientações e padronizações aplicadas ao dia a dia do cartório',
      level: 'Avançado',
      duration: '8h',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl text-gray-900 dark:text-gray-50 tracking-tight">Portal 3RI</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">3º Registro de Imóveis de São Luís/MA</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={onDemo}>
              <Eye className="w-4 h-4 mr-2" />
              Ver Demonstração
            </Button>
            <Button onClick={onGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 shadow-lg">
              Acessar Plataforma
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50">
              <Sparkles className="w-4 h-4 mr-2" />
              Portal interno do 3º Registro de Imóveis de São Luís/MA
            </Badge>
            
            <h1 className="text-4xl md:text-6xl mb-6 text-gray-900 dark:text-gray-50 leading-tight">
              Modernize a gestão da equipe do 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent"> 3º Registro de Imóveis</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Portal único para a administração do cartório acompanhar treinamentos internos, rotinas registrais
              e indicadores de produtividade por setor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onGetStarted} 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 shadow-xl hover:shadow-2xl transition-all"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Acessar Portal Interno
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={onDemo}>
                <Play className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
              <section className="py-20 px-4 bg-white/60 dark:bg-gray-800/60">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 dark:text-gray-50">
              Tudo que você precisa para capacitar sua equipe
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Uma plataforma completa que conecta gestores e funcionários no processo de aprendizagem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-12 h-12 ${feature.color} dark:opacity-90 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 dark:text-gray-50">
              Duas visões, uma só plataforma
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Interface otimizada tanto para gestores quanto para funcionários
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="shadow-xl border-0 bg-card backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 ${index === 0 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-purple-600 dark:bg-purple-500'} rounded-lg flex items-center justify-center shadow-lg`}>
                      {index === 0 ? <Building2 className="w-5 h-5 text-white" /> : <Users className="w-5 h-5 text-white" />}
                    </div>
                    <CardTitle className="text-2xl">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 px-4 bg-white/60 dark:bg-gray-800/60">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 dark:text-gray-50">
              Trilhas de capacitação registral
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Conteúdo desenvolvido especificamente para a realidade do 3º Registro de Imóveis de São Luís/MA
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-card backdrop-blur-sm overflow-hidden">
                <div className="relative">
                  <ImageWithFallback 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${
                      course.level === 'Básico' ? 'bg-green-600 dark:bg-green-500' : 
                      course.level === 'Intermediário' ? 'bg-blue-600 dark:bg-blue-500' : 'bg-purple-600 dark:bg-purple-500'
                    }`}>
                      {course.level}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/90 dark:bg-background/90">
                      <Clock className="w-3 h-3 mr-1" />
                      {course.duration}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Trophy className="w-4 h-4 mr-1" />
                        Certificado
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 dark:text-gray-50">
              Resultados que você pode esperar
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '85%', label: 'Aumento no Engajamento', icon: TrendingUp },
              { number: '92%', label: 'Taxa de Conclusão', icon: CheckCircle },
              { number: '40h', label: 'Média de Estudo/Mês', icon: Clock },
              { number: '98%', label: 'Satisfação dos Usuários', icon: Star }
            ].map((stat, index) => (
              <Card key={index} className="text-center shadow-lg border-0 bg-card backdrop-blur-sm">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl mb-6">
              Eleve o padrão de atendimento e organização do 3º Registro de Imóveis
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Comece hoje mesmo a estruturar treinamentos, rotinas e indicadores em um único portal interno
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onGetStarted} 
                size="lg" 
                className="bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-200 shadow-xl"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Começar Agora
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onDemo}
                className="border-white text-white hover:bg-white/10 dark:hover:bg-white/20"
              >
                <Eye className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white/80 dark:bg-gray-800/80 border-t border-gray-200/60 dark:border-gray-700/60">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl text-gray-900 dark:text-gray-50">Portal 3RI</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">3º Registro de Imóveis de São Luís/MA - Portal interno de pessoas e rotinas</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span>© 2025 3º Registro de Imóveis de São Luís/MA</span>
            <span>•</span>
            <span>Gestão de pessoas e conhecimento</span>
            <span>•</span>
            <span>Foco em excelência registral</span>
          </div>
        </div>
      </footer>
    </div>
  );
}