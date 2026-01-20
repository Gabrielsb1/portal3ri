import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  Clock,
  Building2,
  Star,
  Target,
  Play,
  CheckCircle,
  Lock,
  Send,
  AlertCircle,
  BookOpen
} from 'lucide-react';

interface JobApplicationModalProps {
  job: any;
  onClose: () => void;
  onApply: (application: any) => void;
  userCourses: string[];
  onViewCourse: (courseName: string) => void;
  isDemoMode?: boolean;
  onUpgrade?: () => void;
}

export function JobApplicationModal({ 
  job, 
  onClose, 
  onApply, 
  userCourses, 
  onViewCourse,
  isDemoMode = false,
  onUpgrade
}: JobApplicationModalProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [viewedCourses, setViewedCourses] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'courses' | 'application'>('courses');

  const requiredCourses = job.requiredCourses || [];
  const hasRequiredCourses = requiredCourses.length > 0;
  const completedRequiredCourses = requiredCourses.filter((course: string) => 
    viewedCourses.includes(course)
  );
  const canProceed = !hasRequiredCourses || completedRequiredCourses.length === requiredCourses.length;

  const handleViewCourse = (courseName: string) => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara visualizar cursos e se candidatar a vagas, você precisa criar uma conta gratuita.\n\nClique em "Criar Conta" para se cadastrar!');
      onUpgrade?.();
      return;
    }

    setViewedCourses(prev => [...prev, courseName]);
    onViewCourse(courseName);
    
    // Simula visualização do curso
    alert(`📚 Visualizando "${courseName}"\n\nEm uma versão real, isso abriria o curso completo com todas as aulas e materiais.\n\n✅ Curso visualizado com sucesso!`);
  };

  const handleProceedToApplication = () => {
    if (!canProceed) {
      alert('Você precisa visualizar todos os cursos obrigatórios antes de se candidatar!');
      return;
    }
    setCurrentStep('application');
  };

  const handleSubmitApplication = () => {
    if (isDemoMode) {
      alert('🔒 Modo Demonstração\n\nPara se candidatar a vagas, você precisa criar uma conta gratuita.\n\nClique em "Criar Conta" para começar sua jornada!');
      onUpgrade?.();
      return;
    }

    if (!coverLetter.trim()) {
      alert('Por favor, escreva uma carta de apresentação!');
      return;
    }

    const application = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedAt: new Date().toISOString(),
      status: 'pending',
      coverLetter,
      viewedCourses,
      requiredCoursesViewed: completedRequiredCourses.length,
      totalRequiredCourses: requiredCourses.length
    };

    onApply(application);
    onClose();
  };

  const getJobTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      'full-time': 'Tempo Integral',
      'part-time': 'Meio Período',
      'contract': 'Contrato',
      'internship': 'Estágio'
    };
    return types[type] || type;
  };

  const getLevelLabel = (level: string) => {
    const levels: { [key: string]: string } = {
      'entry': 'Júnior',
      'mid': 'Pleno',
      'senior': 'Sênior',
      'lead': 'Líder'
    };
    return levels[level] || level;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Candidatar-se para {job.title}</span>
          </DialogTitle>
          <DialogDescription>
            {job.company} • {job.location}
          </DialogDescription>
        </DialogHeader>

        {currentStep === 'courses' ? (
          <div className="space-y-6">
            {/* Informações da Vaga */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Detalhes da Vaga</span>
                  <div className="flex items-center space-x-2">
                    {job.type && (
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {getJobTypeLabel(job.type)}
                      </Badge>
                    )}
                    {job.level && (
                      <Badge variant="outline">
                        <Star className="w-3 h-3 mr-1" />
                        {getLevelLabel(job.level)}
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Publicado hoje</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm mb-2">Descrição:</h4>
                  <p className="text-sm text-gray-600">{job.description}</p>
                </div>

                {job.requirements && (
                  <div>
                    <h4 className="text-sm mb-2">Requisitos:</h4>
                    <p className="text-sm text-gray-600">{job.requirements}</p>
                  </div>
                )}

                {job.benefits && (
                  <div>
                    <h4 className="text-sm mb-2">Benefícios:</h4>
                    <p className="text-sm text-gray-600">{job.benefits}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cursos Obrigatórios */}
            {hasRequiredCourses && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    <span>Cursos Obrigatórios</span>
                  </CardTitle>
                  <CardDescription>
                    Você deve visualizar {requiredCourses.length} curso(s) antes de se candidatar a esta vaga
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progresso</span>
                      <span>{completedRequiredCourses.length}/{requiredCourses.length}</span>
                    </div>
                    <Progress 
                      value={(completedRequiredCourses.length / requiredCourses.length) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-3">
                    {requiredCourses.map((courseName: string) => {
                      const isViewed = viewedCourses.includes(courseName);
                      const isCompleted = userCourses.includes(courseName);
                      
                      return (
                        <div key={courseName} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isViewed ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-100 dark:bg-gray-800'
                            }`}>
                              {isViewed ? (
                                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                              ) : (
                                <BookOpen className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm text-foreground">{courseName}</p>
                              <div className="flex items-center space-x-2">
                                {isCompleted && (
                                  <Badge variant="secondary" className="text-xs">
                                    Completado
                                  </Badge>
                                )}
                                {isViewed && (
                                  <Badge className="bg-green-600 dark:bg-green-500 text-xs">
                                    Visualizado
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {!isViewed && (
                            <Button 
                              size="sm" 
                              onClick={() => handleViewCourse(courseName)}
                              className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Visualizar
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {!canProceed && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">
                          Você precisa visualizar todos os cursos obrigatórios antes de prosseguir com a candidatura.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Botões */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Fechar
              </Button>
              <Button 
                onClick={handleProceedToApplication}
                disabled={!canProceed}
                className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500"
              >
                {!canProceed && <Lock className="w-4 h-4 mr-2" />}
                {canProceed ? 'Prosseguir com Candidatura' : 'Cursos Obrigatórios Pendentes'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Resumo dos Cursos Visualizados */}
            {hasRequiredCourses && (
              <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span>Cursos Visualizados</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-800 dark:text-green-300 mb-3">
                    ✅ Você visualizou todos os {requiredCourses.length} cursos obrigatórios!
                  </p>
                  <div className="space-y-2">
                    {completedRequiredCourses.map((course: string) => (
                      <Badge key={course} className="bg-green-600 dark:bg-green-500 mr-2">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Carta de Apresentação */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Carta de Apresentação</CardTitle>
                <CardDescription>
                  Conte por que você é o candidato ideal para esta vaga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Olá! Estou muito interessado(a) na vaga de... Tenho experiência em... e acredito que posso contribuir..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {coverLetter.length}/1000 caracteres
                </p>
              </CardContent>
            </Card>

            {/* Informações da Candidatura */}
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Informações da Candidatura</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-foreground">
                  <p><strong>Vaga:</strong> {job.title}</p>
                  <p><strong>Empresa:</strong> {job.company}</p>
                  <p><strong>Local:</strong> {job.location}</p>
                  {hasRequiredCourses && (
                    <p><strong>Cursos visualizados:</strong> {completedRequiredCourses.length}/{requiredCourses.length}</p>
                  )}
                  <p className="text-blue-700 dark:text-blue-400 mt-3">
                    💡 <strong>Dica:</strong> A empresa poderá ver que você visualizou os cursos obrigatórios, isso demonstra seu interesse e comprometimento!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Botões */}
            <div className="flex justify-between pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setCurrentStep('courses')}
              >
                Voltar
              </Button>
              <div className="space-x-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmitApplication}
                  className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Candidatura
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}