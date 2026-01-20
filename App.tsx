import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'employee' | 'company' | 'demo'>('landing');
  const [userType, setUserType] = useState<'employee' | 'company' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<any>(null);

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
    setCurrentView('landing');
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

  console.log('Current state:', { currentView, userType, isAuthenticated, isDemoMode, currentEmployee });

  if (currentView === 'landing') {
    return (
      <LandingPage 
        onGetStarted={() => setCurrentView('auth')}
        onCompanyAccess={() => setCurrentView('auth')}
        onDemo={handleDemo}
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
  return <LandingPage onGetStarted={() => setCurrentView('auth')} onCompanyAccess={() => setCurrentView('auth')} onDemo={handleDemo} />;
}