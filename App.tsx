import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';
import { CoursePlayer } from './components/CoursePlayer';

export default function App() {
  // Carregar estado do localStorage ao inicializar
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'employee' | 'company' | 'demo' | 'course'>(() => {
    const saved = localStorage.getItem('portal3ri_view');
    return (saved as any) || 'landing';
  });
  const [currentCourseId, setCurrentCourseId] = useState<number | null>(() => {
    const saved = localStorage.getItem('portal3ri_courseId');
    return saved ? parseInt(saved) : null;
  });
  const [userType, setUserType] = useState<'employee' | 'company' | null>(() => {
    const saved = localStorage.getItem('portal3ri_userType');
    return saved as any || null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('portal3ri_authenticated');
    return saved === 'true';
  });
  const [isDemoMode, setIsDemoMode] = useState(() => {
    const saved = localStorage.getItem('portal3ri_demoMode');
    return saved === 'true';
  });
  const [currentEmployee, setCurrentEmployee] = useState<any>(() => {
    const saved = localStorage.getItem('portal3ri_employee');
    return saved ? JSON.parse(saved) : null;
  });

  // Salvar estado no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('portal3ri_view', currentView);
  }, [currentView]);

  useEffect(() => {
    if (currentCourseId) {
      localStorage.setItem('portal3ri_courseId', currentCourseId.toString());
    } else {
      localStorage.removeItem('portal3ri_courseId');
    }
  }, [currentCourseId]);

  useEffect(() => {
    if (userType) {
      localStorage.setItem('portal3ri_userType', userType);
    } else {
      localStorage.removeItem('portal3ri_userType');
    }
  }, [userType]);

  useEffect(() => {
    localStorage.setItem('portal3ri_authenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('portal3ri_demoMode', isDemoMode.toString());
  }, [isDemoMode]);

  useEffect(() => {
    if (currentEmployee) {
      localStorage.setItem('portal3ri_employee', JSON.stringify(currentEmployee));
    } else {
      localStorage.removeItem('portal3ri_employee');
    }
  }, [currentEmployee]);

  // Sistema de feedbacks
  const [feedbacks, setFeedbacks] = useState<any[]>([
    {
      id: 1,
      employeeId: 1,
      employeeName: 'João Silva',
      courseId: 1,
      courseName: 'Procedimentos de Registro de Imóveis',
      managerName: 'Oficial do 3RI',
      feedback: 'Excelente desempenho no módulo de procedimentos de registro. Você demonstrou boa compreensão do fluxo da matrícula. Continue assim!',
      rating: 5,
      date: '2025-01-20',
      read: false
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Marina Matrículas',
      courseId: 1,
      courseName: 'Procedimentos de Registro de Imóveis',
      managerName: 'Oficial do 3RI',
      feedback: 'Ótimo aproveitamento dos conteúdos. A aplicação prática nas qualificações do dia a dia tem sido muito consistente.',
      rating: 5,
      date: '2025-01-18',
      read: true
    },
    {
      id: 3,
      employeeId: 2,
      employeeName: 'Marina Matrículas',
      courseId: 2,
      courseName: 'Atendimento ao Público em Cartório',
      managerName: 'Oficial do 3RI',
      feedback: 'Muito bom desenvolvimento nas técnicas de atendimento ao público. Continue reforçando a clareza das orientações aos usuários.',
      rating: 4,
      date: '2025-01-15',
      read: true
    }
  ]);

  const handleAuth = (type: 'employee' | 'company', employeeData?: any) => {
    console.log('handleAuth called with:', type, employeeData);
    setUserType(type);
    setIsAuthenticated(true);
    setIsDemoMode(false);
    if (type === 'employee' && employeeData) {
      setCurrentEmployee(employeeData);
    }
    setCurrentView(type === 'employee' ? 'employee' : 'company');
  };

  const handleDemo = () => {
    console.log('handleDemo called');
    setUserType('employee');
    setIsAuthenticated(false);
    setIsDemoMode(true);
    setCurrentEmployee({
      id: 'demo',
      name: 'João Silva',
      department: 'Vendas',
      position: 'Vendedor',
      completedCourses: 1
    });
    setCurrentView('demo');
  };

  const handleLogout = () => {
    console.log('handleLogout called');
    setIsAuthenticated(false);
    setUserType(null);
    setIsDemoMode(false);
    setCurrentEmployee(null);
    setCurrentCourseId(null);
    setCurrentView('landing');
    // Limpar localStorage
    localStorage.removeItem('portal3ri_view');
    localStorage.removeItem('portal3ri_courseId');
    localStorage.removeItem('portal3ri_userType');
    localStorage.removeItem('portal3ri_authenticated');
    localStorage.removeItem('portal3ri_demoMode');
    localStorage.removeItem('portal3ri_employee');
  };

  const handleEmployeeLogin = (employeeData: any) => {
    console.log('handleEmployeeLogin called with:', employeeData);
    setCurrentEmployee(employeeData);
    setUserType('employee');
    setIsAuthenticated(true);
    setIsDemoMode(false);
    setCurrentView('employee');
  };

  const handleSendFeedback = (feedback: any) => {
    const newFeedback = {
      id: feedbacks.length + 1,
      ...feedback,
      managerName: 'Gestor da Empresa',
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    
    setFeedbacks(prev => [...prev, newFeedback]);
    
    // Simular notificação para o funcionário
    alert(`Feedback enviado com sucesso para ${feedback.employeeName}!`);
  };

  const handleMarkFeedbackAsRead = (feedbackId: number) => {
    setFeedbacks(prev => 
      prev.map(feedback => 
        feedback.id === feedbackId ? { ...feedback, read: true } : feedback
      )
    );
  };

  const handleStartCourse = (courseId: number) => {
    setCurrentCourseId(courseId);
    setCurrentView('course');
  };

  const handleBackFromCourse = () => {
    setCurrentView('employee');
    setCurrentCourseId(null);
  };

  const handleCompleteCourse = () => {
    alert('Parabéns! Você completou o curso! 🎉\n\nSeu progresso foi atualizado e seu gestor foi notificado.');
    setCurrentView('employee');
    setCurrentCourseId(null);
  };

  // Dados dos cursos com módulos e aulas
  const getCourseData = (courseId: number) => {
    const coursesData: Record<number, any> = {
      1: {
        id: 1,
        title: 'Procedimentos de Registro de Imóveis',
        description: 'Fluxo da matrícula no 3RI: protocolo, qualificação, registro e expedição de certidões',
        instructor: 'Equipe Registral 3RI',
        duration: '6h',
        level: 'Avançado',
        image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=300&h=200&fit=crop',
        modules: [
          {
            id: 'mod1',
            title: 'Introdução ao Registro de Imóveis',
            description: 'Conceitos fundamentais e estrutura do sistema registral',
            lessons: [
              { id: 'l1', title: 'O que é o Registro de Imóveis', duration: '15min', type: 'video' as const, completed: false, locked: false, description: 'Nesta aula introdutória, você aprenderá os conceitos fundamentais sobre o Registro de Imóveis, sua função social e importância no sistema jurídico brasileiro. Entenda como funciona a estrutura registral e sua relação com a segurança jurídica das transações imobiliárias.' },
              { id: 'l2', title: 'Estrutura do Cartório e Setores', duration: '20min', type: 'video' as const, completed: false, locked: false, description: 'Conheça a organização interna do 3º Registro de Imóveis de São Luís/MA. Aprenda sobre os diferentes setores (protocolo, qualificação, registro, certidões) e como cada um contribui para o funcionamento eficiente do cartório.' },
              { id: 'l3', title: 'Leitura: Lei de Registros Públicos', duration: '10min', type: 'text' as const, completed: false, locked: false, description: 'Leitura obrigatória sobre a Lei 6.015/73 (Lei de Registros Públicos). Estude os principais artigos que regulamentam o registro de imóveis e compreenda a base legal que fundamenta todas as atividades do cartório.' },
            ],
            completed: false
          },
          {
            id: 'mod2',
            title: 'Protocolo e Recebimento de Documentos',
            description: 'Processo de protocolização e análise inicial',
            lessons: [
              { id: 'l4', title: 'Como protocolizar documentos no 3RI', duration: '25min', type: 'video' as const, completed: false, locked: true, description: 'Aprenda o processo completo de protocolização de documentos no 3RI. Veja quais documentos são necessários, como preencher corretamente os formulários e os cuidados essenciais para evitar devoluções e retrabalho.' },
              { id: 'l5', title: 'Análise de Requisitos de Protocolo', duration: '30min', type: 'video' as const, completed: false, locked: true, description: 'Desenvolva habilidades para analisar se um documento atende todos os requisitos legais para protocolização. Aprenda a identificar documentos incompletos ou com irregularidades antes do protocolo.' },
              { id: 'l6', title: 'Exercício: Protocolo Prático', duration: '20min', type: 'exercise' as const, completed: false, locked: true, description: 'Exercício prático para fixar o aprendizado sobre protocolização. Analise casos reais e pratique a identificação de documentos corretos e incorretos para protocolo.' },
            ],
            completed: false
          },
          {
            id: 'mod3',
            title: 'Qualificação e Registro',
            description: 'Processo de qualificação de títulos e registro na matrícula',
            lessons: [
              { id: 'l7', title: 'Qualificação de Títulos', duration: '40min', type: 'video' as const, completed: false, locked: true, description: 'Aprenda a qualificar títulos imobiliários de forma correta e eficiente. Entenda os principais pontos de atenção na análise de documentos, verificação de capacidade das partes e identificação de vícios que impedem o registro.' },
              { id: 'l8', title: 'Registro na Matrícula', duration: '35min', type: 'video' as const, completed: false, locked: true, description: 'Domine o processo de registro de atos na matrícula do imóvel. Aprenda sobre a numeração, organização das informações e os cuidados necessários para manter a integridade do histórico registral.' },
              { id: 'l9', title: 'Averbações Comuns', duration: '30min', type: 'video' as const, completed: false, locked: true, description: 'Conheça os principais tipos de averbações realizadas no 3RI: casamento, divórcio, óbito, usucapião, entre outras. Aprenda quando e como fazer cada tipo de averbação corretamente.' },
            ],
            completed: false
          },
          {
            id: 'mod4',
            title: 'Certidões e Atendimento',
            description: 'Emissão de certidões e atendimento ao público',
            lessons: [
              { id: 'l10', title: 'Tipos de Certidões', duration: '25min', type: 'video' as const, completed: false, locked: true, description: 'Conheça todos os tipos de certidões emitidas pelo 3RI: certidão de inteiro teor, certidão simplificada, certidão de ônus reais, entre outras. Entenda quando cada tipo é solicitado e suas diferenças.' },
              { id: 'l11', title: 'Emissão de Certidões', duration: '30min', type: 'video' as const, completed: false, locked: true, description: 'Aprenda o processo completo de emissão de certidões no sistema do 3RI. Veja como localizar informações na matrícula, formatar corretamente a certidão e garantir que todas as informações estejam atualizadas.' },
              { id: 'l12', title: 'Avaliação Final', duration: '45min', type: 'exercise' as const, completed: false, locked: true, description: 'Avaliação final do curso para testar seus conhecimentos sobre procedimentos de registro de imóveis. Inclui questões práticas sobre protocolo, qualificação, registro e emissão de certidões.' },
            ],
            completed: false
          }
        ]
      },
      2: {
        id: 2,
        title: 'Atendimento ao Público em Cartório',
        description: 'Boas práticas de atendimento presencial e telefônico no 3º Registro de Imóveis de São Luís/MA',
        instructor: 'Coordenação de Atendimento 3RI',
        duration: '5h',
        level: 'Intermediário',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
        modules: [
          {
            id: 'mod1',
            title: 'Fundamentos do Atendimento',
            description: 'Princípios básicos de atendimento ao público',
            lessons: [
              { id: 'l1', title: 'Importância do Atendimento de Qualidade', duration: '20min', type: 'video' as const, completed: false, locked: false, description: 'Entenda por que um atendimento de qualidade é fundamental no cartório. Aprenda sobre a importância da primeira impressão, como o atendimento impacta a imagem do 3RI e as expectativas dos usuários do serviço registral.' },
              { id: 'l2', title: 'Postura Profissional', duration: '15min', type: 'video' as const, completed: false, locked: false, description: 'Desenvolva uma postura profissional adequada para o atendimento no cartório. Aprenda sobre comunicação verbal e não verbal, etiqueta profissional e como transmitir confiança e credibilidade aos usuários.' },
              { 
                id: 'l3', 
                title: 'Questionário: Manual de Atendimento 3RI', 
                duration: '10min', 
                type: 'quiz' as const, 
                completed: false, 
                locked: false, 
                description: 'Teste seus conhecimentos sobre o manual interno de atendimento do 3RI. Responda as perguntas e veja sua pontuação.',
                quiz: {
                  questions: [
                    {
                      id: 'q1',
                      question: 'Qual é a importância da primeira impressão no atendimento ao público?',
                      options: [
                        'Não tem importância, o que importa é resolver o problema',
                        'É fundamental, pois cria a imagem inicial do cartório',
                        'Só importa em atendimentos presenciais',
                        'Depende do tipo de usuário'
                      ],
                      correctAnswer: 1,
                      points: 10
                    },
                    {
                      id: 'q2',
                      question: 'Qual deve ser a postura profissional adequada no atendimento?',
                      options: [
                        'Formal e distante',
                        'Amigável mas profissional, transmitindo confiança',
                        'Informal e descontraída',
                        'Rígida e autoritária'
                      ],
                      correctAnswer: 1,
                      points: 10
                    },
                    {
                      id: 'q3',
                      question: 'Ao receber um usuário no cartório, o primeiro passo deve ser:',
                      options: [
                        'Pedir os documentos imediatamente',
                        'Identificar a necessidade e direcionar ao setor correto',
                        'Enviar para a fila sem perguntar nada',
                        'Atender na ordem de chegada sem triagem'
                      ],
                      correctAnswer: 1,
                      points: 15
                    },
                    {
                      id: 'q4',
                      question: 'Na comunicação telefônica, é importante:',
                      options: [
                        'Falar rápido para atender mais pessoas',
                        'Manter comunicação clara e objetiva, mesmo sem contato visual',
                        'Usar gírias para parecer mais próximo',
                        'Deixar o usuário falar sem interromper'
                      ],
                      correctAnswer: 1,
                      points: 15
                    },
                    {
                      id: 'q5',
                      question: 'Qual é o objetivo principal do atendimento de qualidade no 3RI?',
                      options: [
                        'Atender o maior número de pessoas possível',
                        'Garantir satisfação do usuário e imagem positiva do cartório',
                        'Reduzir o tempo de atendimento',
                        'Aplicar todas as normas rigorosamente'
                      ],
                      correctAnswer: 1,
                      points: 20
                    }
                  ],
                  totalPoints: 70
                }
              },
            ],
            completed: false
          },
          {
            id: 'mod2',
            title: 'Atendimento Presencial',
            description: 'Técnicas para atendimento presencial eficiente',
            lessons: [
              { id: 'l4', title: 'Recepção e Triagem', duration: '25min', type: 'video' as const, completed: false, locked: true, description: 'Aprenda técnicas eficientes de recepção e triagem de usuários. Saiba como identificar rapidamente a necessidade do usuário, direcioná-lo ao setor correto e otimizar o fluxo de atendimento no cartório.' },
              { id: 'l5', title: 'Orientação ao Usuário', duration: '30min', type: 'video' as const, completed: false, locked: true, description: 'Desenvolva habilidades para orientar usuários de forma clara e objetiva. Aprenda a explicar procedimentos, requisitos de documentos e prazos de forma que o usuário compreenda completamente o que precisa fazer.' },
              { id: 'l6', title: 'Exercício: Simulação de Atendimento', duration: '20min', type: 'exercise' as const, completed: false, locked: true, description: 'Pratique suas habilidades de atendimento através de simulações de situações reais. Treine como lidar com diferentes tipos de usuários e situações que podem ocorrer no dia a dia do cartório.' },
            ],
            completed: false
          },
          {
            id: 'mod3',
            title: 'Atendimento Telefônico',
            description: 'Boas práticas para atendimento por telefone',
            lessons: [
              { id: 'l7', title: 'Técnicas de Comunicação Telefônica', duration: '25min', type: 'video' as const, completed: false, locked: true, description: 'Aprenda técnicas específicas para atendimento telefônico eficiente. Saiba como manter uma comunicação clara, objetiva e profissional mesmo sem contato visual, garantindo que o usuário obtenha todas as informações necessárias.' },
              { id: 'l8', title: 'Resolução de Problemas por Telefone', duration: '30min', type: 'video' as const, completed: false, locked: true, description: 'Desenvolva habilidades para resolver problemas e dúvidas dos usuários por telefone. Aprenda a identificar a necessidade real do usuário, oferecer soluções adequadas e quando necessário, agendar atendimento presencial.' },
            ],
            completed: false
          }
        ]
      },
      3: {
        id: 3,
        title: 'Normas da Corregedoria e Rotinas Internas',
        description: 'Principais provimentos, orientações da Corregedoria e padronizações internas do 3RI',
        instructor: 'Oficial do 3RI',
        duration: '8h',
        level: 'Avançado',
        image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=300&h=200&fit=crop',
        modules: [
          {
            id: 'mod1',
            title: 'Provimentos da Corregedoria',
            description: 'Principais provimentos aplicáveis',
            lessons: [
              { id: 'l1', title: 'Provimento CGJ-MA 01/2020', duration: '30min', type: 'video' as const, completed: false, locked: false, description: 'Estude o Provimento CGJ-MA 01/2020 que estabelece normas e procedimentos para registro de imóveis no estado do Maranhão. Entenda suas principais diretrizes e como aplicá-las no dia a dia do 3RI.' },
              { id: 'l2', title: 'Provimento CGJ-MA 02/2021', duration: '25min', type: 'video' as const, completed: false, locked: false, description: 'Conheça o Provimento CGJ-MA 02/2021 e suas atualizações em relação aos procedimentos registrais. Aprenda sobre as mudanças implementadas e como elas afetam o trabalho no cartório.' },
              { id: 'l3', title: 'Leitura: Provimentos Recentes', duration: '15min', type: 'text' as const, completed: false, locked: false, description: 'Leitura complementar sobre os provimentos mais recentes da Corregedoria Geral de Justiça do Maranhão. Mantenha-se atualizado sobre as normas que regulamentam o trabalho no 3RI.' },
            ],
            completed: false
          },
          {
            id: 'mod2',
            title: 'Rotinas Internas do 3RI',
            description: 'Padronizações e procedimentos internos',
            lessons: [
              { id: 'l4', title: 'Fluxo de Trabalho por Setor', duration: '35min', type: 'video' as const, completed: false, locked: true, description: 'Compreenda o fluxo de trabalho específico de cada setor do 3RI: protocolo, qualificação, registro e certidões. Aprenda como os setores se relacionam e como otimizar a comunicação entre eles.' },
              { id: 'l5', title: 'Padronização de Documentos', duration: '30min', type: 'video' as const, completed: false, locked: true, description: 'Aprenda sobre a padronização de documentos adotada pelo 3RI. Conheça os modelos padrão, formatações exigidas e como garantir que todos os documentos sigam o mesmo padrão de qualidade.' },
            ],
            completed: false
          }
        ]
      }
    };

    return coursesData[courseId] || coursesData[1];
  };

  console.log('Current state:', { currentView, userType, isAuthenticated, isDemoMode, currentEmployee, currentCourseId });

  // Se está autenticado e tem curso, mostrar o curso primeiro
  if (currentView === 'course' && currentCourseId) {
    const courseData = getCourseData(currentCourseId);
    return (
      <CoursePlayer 
        course={courseData}
        onBack={handleBackFromCourse}
        onCompleteCourse={handleCompleteCourse}
      />
    );
  }

  if (currentView === 'landing') {
    return (
      <LandingPage 
        onGetStarted={() => setCurrentView('auth')}
        onCompanyAccess={() => setCurrentView('auth')}
      />
    );
  }

  if (currentView === 'auth') {
    return (
      <AuthPage 
        onAuth={handleAuth}
        onEmployeeLogin={handleEmployeeLogin}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'employee') {
    return (
      <EmployeeDashboard 
        onLogout={handleLogout} 
        employee={currentEmployee}
        feedbacks={feedbacks.filter(f => f.employeeId === currentEmployee?.id)}
        onMarkFeedbackAsRead={handleMarkFeedbackAsRead}
        onStartCourse={handleStartCourse}
      />
    );
  }

  if (currentView === 'demo') {
    return (
      <EmployeeDashboard 
        onLogout={handleLogout} 
        employee={currentEmployee}
        isDemoMode={true}
        onUpgrade={() => setCurrentView('auth')}
        feedbacks={feedbacks.filter(f => f.employeeId === 1)} // Demo usa ID 1
        onMarkFeedbackAsRead={handleMarkFeedbackAsRead}
        onStartCourse={handleStartCourse}
      />
    );
  }

  if (currentView === 'company') {
    return (
      <CompanyDashboard 
        onLogout={handleLogout}
        onEmployeeLogin={handleEmployeeLogin}
        onSendFeedback={handleSendFeedback}
        feedbacks={feedbacks}
      />
    );
  }

  // Fallback para a landing page
  return <LandingPage onGetStarted={() => setCurrentView('auth')} onCompanyAccess={() => setCurrentView('auth')} />;
}