import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { ThemeToggle } from './ui/theme-toggle';
import { 
  Play, 
  CheckCircle, 
  Lock, 
  Clock, 
  ArrowLeft,
  BookOpen,
  FileText,
  Video,
  Download,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  HelpCircle,
  Trophy,
  Award
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'exercise' | 'quiz';
  completed: boolean;
  locked: boolean;
  videoUrl?: string;
  content?: string;
  description?: string;
  quiz?: {
    questions: QuizQuestion[];
    totalPoints: number;
  };
}

interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  completed: boolean;
}

interface CoursePlayerProps {
  course: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    level: string;
    image: string;
    modules: Module[];
  };
  onBack: () => void;
  onCompleteCourse?: () => void;
}

// Componente de Questionário
function QuizComponent({ lesson, onComplete }: { lesson: Lesson; onComplete: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  if (!lesson.quiz) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-yellow-500/10">
        <div className="text-center max-w-2xl px-8">
          <HelpCircle className="w-16 h-16 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-4">Questionário não disponível</h3>
        </div>
      </div>
    );
  }

  const { questions, totalPoints } = lesson.quiz;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calcular pontuação
      let totalScore = 0;
      questions.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          totalScore += q.points;
        }
      });
      setScore(totalScore);
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    onComplete();
  };

  if (showResults) {
    const percentage = Math.round((score / totalPoints) * 100);
    const isPassed = percentage >= 70;

    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-yellow-500/10 p-8">
        <div className="bg-card border border-border rounded-lg p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            {isPassed ? (
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            ) : (
              <Award className="w-20 h-20 text-orange-500 mx-auto mb-4" />
            )}
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isPassed ? 'Parabéns! Você passou!' : 'Continue estudando!'}
            </h2>
            <p className="text-muted-foreground">
              Você completou o questionário
            </p>
          </div>

          <div className="bg-muted rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Sua Pontuação</span>
              <span className="text-2xl font-bold text-foreground">{score} / {totalPoints} pontos</span>
            </div>
            <Progress value={percentage} className="h-3 mb-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Percentual de acerto</span>
              <span className={`font-semibold ${isPassed ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                {percentage}%
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-foreground mb-3">Resumo das Respostas</h3>
            {questions.map((q, idx) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className={`p-3 rounded-lg border ${
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Pergunta {idx + 1}: {q.question}
                    </span>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 ml-2" />
                    ) : (
                      <span className="text-xs text-red-600 dark:text-red-400 font-semibold">Errada</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Sua resposta:</span> {q.options[userAnswer] || 'Não respondida'}
                  </div>
                  {!isCorrect && (
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      <span className="font-medium">Resposta correta:</span> {q.options[q.correctAnswer]}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    Pontos: {isCorrect ? q.points : 0} / {q.points}
                  </div>
                </div>
              );
            })}
          </div>

          <Button 
            onClick={handleFinish}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            size="lg"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Finalizar Questionário
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-yellow-500/10 p-8">
      <div className="bg-card border border-border rounded-lg p-8 max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">{lesson.title}</h2>
            <Badge variant="outline" className="text-sm">
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </Badge>
          </div>
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
        </div>

        <div className="mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <HelpCircle className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
            <h3 className="text-lg font-semibold text-foreground">{currentQuestion.question}</h3>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                      : 'border-border hover:border-blue-300 dark:hover:border-blue-700 bg-card'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-600 dark:bg-blue-500'
                        : 'border-muted-foreground'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-foreground">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {currentQuestion.points} pontos
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion.id] === undefined}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isLastQuestion ? 'Finalizar' : 'Próxima'}
            {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CoursePlayer({ course, onBack, onCompleteCourse }: CoursePlayerProps) {
  const [currentModuleId, setCurrentModuleId] = useState<string>(course.modules[0]?.id || '');
  const [currentLessonId, setCurrentLessonId] = useState<string>('');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set([course.modules[0]?.id || '']));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [videoProgress, setVideoProgress] = useState<number>(0);

  // Encontrar primeira aula não bloqueada
  useEffect(() => {
    const firstModule = course.modules[0];
    if (firstModule && firstModule.lessons.length > 0) {
      const firstUnlockedLesson = firstModule.lessons.find(l => !l.locked);
      if (firstUnlockedLesson) {
        setCurrentModuleId(firstModule.id);
        setCurrentLessonId(firstUnlockedLesson.id);
      }
    }
  }, [course]);

  const currentModule = course.modules.find(m => m.id === currentModuleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === currentLessonId);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handleLessonClick = (moduleId: string, lessonId: string, lesson: Lesson) => {
    if (lesson.locked) return;
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
  };

  const handleCompleteLesson = () => {
    if (!currentLessonId) return;
    setCompletedLessons(prev => new Set(prev).add(currentLessonId));
    
    // Desbloquear próxima aula
    const currentModuleIndex = course.modules.findIndex(m => m.id === currentModuleId);
    const currentLessonIndex = currentModule?.lessons.findIndex(l => l.id === currentLessonId) || 0;
    
    if (currentLessonIndex < currentModule!.lessons.length - 1) {
      // Próxima aula do mesmo módulo
      const nextLesson = currentModule!.lessons[currentLessonIndex + 1];
      if (nextLesson && nextLesson.locked) {
        // Desbloquear próxima aula
        const updatedModules = course.modules.map(m => {
          if (m.id === currentModuleId) {
            return {
              ...m,
              lessons: m.lessons.map(l => 
                l.id === nextLesson.id ? { ...l, locked: false } : l
              )
            };
          }
          return m;
        });
        // Atualizar curso seria feito via callback em produção
      }
    } else if (currentModuleIndex < course.modules.length - 1) {
      // Próxima aula do próximo módulo
      const nextModule = course.modules[currentModuleIndex + 1];
      if (nextModule && nextModule.lessons.length > 0) {
        const firstLesson = nextModule.lessons[0];
        if (firstLesson && firstLesson.locked) {
          // Desbloquear primeira aula do próximo módulo
          // Atualizar curso seria feito via callback em produção
        }
      }
    }

    // Verificar se curso foi completado
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedCount = completedLessons.size + 1;
    if (completedCount === totalLessons && onCompleteCourse) {
      setTimeout(() => {
        onCompleteCourse();
      }, 1000);
    }
  };

  const getModuleProgress = (module: Module) => {
    const completed = module.lessons.filter(l => completedLessons.has(l.id) || l.completed).length;
    return (completed / module.lessons.length) * 100;
  };

  const getCourseProgress = () => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completed = course.modules.reduce((acc, m) => 
      acc + m.lessons.filter(l => completedLessons.has(l.id) || l.completed).length, 0
    );
    return totalLessons > 0 ? (completed / totalLessons) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-foreground hover:bg-muted">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-medium text-foreground">{course.title}</h1>
                <p className="text-xs text-muted-foreground">{course.instructor}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="text-right hidden md:block">
              <div className="text-xs text-muted-foreground">Progresso do Curso</div>
              <div className="text-sm font-medium text-foreground">{Math.round(getCourseProgress())}%</div>
            </div>
            <div className="w-32 hidden md:block">
              <Progress value={getCourseProgress()} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Main Content - Player */}
        <main className="flex-1 flex flex-col bg-background overflow-hidden min-w-0">
          {currentLesson ? (
            <>
              {/* Video Player Area */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {currentLesson.type === 'quiz' ? (
                  <div className="flex gap-3 p-4 flex-1 min-h-0">
                    <div className="flex-1">
                      <QuizComponent lesson={currentLesson} onComplete={handleCompleteLesson} />
                    </div>
                    {/* Sidebar de Vídeos Restantes */}
                    <aside className="w-[320px] bg-card border border-border rounded-lg overflow-hidden flex flex-col flex-shrink-0">
                      <div className="p-4 border-b border-border flex-shrink-0">
                        <h3 className="text-sm font-semibold text-foreground">Aulas do Curso</h3>
                        <p className="text-xs text-muted-foreground mt-1">Todas as aulas disponíveis</p>
                      </div>
                      <ScrollArea className="flex-1 min-h-0">
                        <div className="p-3 space-y-2">
                          {(() => {
                            const allLessons: Array<{ moduleId: string; moduleTitle: string; lesson: Lesson; index: number; globalIndex: number }> = [];
                            let globalIdx = 0;
                            course.modules.forEach(module => {
                              module.lessons.forEach((lesson, idx) => {
                                allLessons.push({ moduleId: module.id, moduleTitle: module.title, lesson, index: idx, globalIndex: globalIdx });
                                globalIdx++;
                              });
                            });
                            
                            const currentIndex = allLessons.findIndex(l => l.lesson.id === currentLessonId);
                            
                            return allLessons.map(({ moduleId, moduleTitle, lesson, index, globalIndex }) => {
                              const isCurrent = lesson.id === currentLessonId;
                              const isCompleted = completedLessons.has(lesson.id) || lesson.completed;
                              const isLocked = lesson.locked && !isCompleted;
                              
                              return (
                                <Card 
                                  key={lesson.id}
                                  className={`cursor-pointer transition-all ${
                                    isCurrent
                                      ? 'ring-2 ring-blue-600 dark:ring-blue-500 bg-blue-50 dark:bg-blue-950/20'
                                      : isLocked
                                        ? 'opacity-50 cursor-not-allowed hover:shadow-sm'
                                        : 'hover:shadow-md'
                                  }`}
                                  onClick={() => !isLocked && handleLessonClick(moduleId, lesson.id, lesson)}
                                >
                                  <CardContent className="p-3">
                                    <div className="flex items-start space-x-3">
                                      <div className="flex-shrink-0 mt-0.5">
                                        {isCurrent ? (
                                          <div className="w-10 h-10 rounded bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                            <Play className="w-5 h-5 text-white" />
                                          </div>
                                        ) : isLocked ? (
                                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-muted-foreground" />
                                          </div>
                                        ) : isCompleted ? (
                                          <div className="w-10 h-10 rounded bg-green-600 dark:bg-green-500 flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                          </div>
                                        ) : lesson.type === 'video' ? (
                                          <div className="w-10 h-10 rounded bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                            <Video className="w-5 h-5 text-white" />
                                          </div>
                                        ) : lesson.type === 'exercise' ? (
                                          <div className="w-10 h-10 rounded bg-purple-600 dark:bg-purple-500 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-white" />
                                          </div>
                                        ) : lesson.type === 'quiz' ? (
                                          <div className="w-10 h-10 rounded bg-orange-600 dark:bg-orange-500 flex items-center justify-center">
                                            <HelpCircle className="w-5 h-5 text-white" />
                                          </div>
                                        ) : (
                                          <div className="w-10 h-10 rounded bg-green-600 dark:bg-green-500 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-white" />
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-medium leading-tight mb-1 ${
                                          isCurrent
                                            ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                            : isLocked 
                                              ? 'text-muted-foreground' 
                                              : 'text-foreground'
                                        }`}>
                                          {lesson.title}
                                        </h4>
                                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                                          <span>{lesson.duration}</span>
                                          <span>•</span>
                                          <span>{lesson.type === 'video' ? 'Vídeo' : lesson.type === 'exercise' ? 'Exercício' : lesson.type === 'quiz' ? 'Questionário' : 'Leitura'}</span>
                                          {isCompleted && (
                                            <>
                                              <span>•</span>
                                              <span className="text-green-600 dark:text-green-400">Concluída</span>
                                            </>
                                          )}
                                          {isCurrent && (
                                            <>
                                              <span>•</span>
                                              <span className="text-blue-600 dark:text-blue-400 font-semibold">Atual</span>
                                            </>
                                          )}
                                        </div>
                                        <p className="text-xs text-muted-foreground/70 line-clamp-1">
                                          {moduleTitle}
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            });
                          })()}
                        </div>
                      </ScrollArea>
                    </aside>
                  </div>
                ) : (
                  <div className="flex gap-3 p-4 flex-1 min-h-0">
                    {/* Container do Vídeo Centralizado */}
                    <div className="flex-1 flex justify-center min-w-0 overflow-hidden">
                      {/* Player de Vídeo */}
                      <div className="flex flex-col min-w-0 w-full" style={{ maxWidth: '900px' }}>
                        <div className="bg-black rounded-lg overflow-hidden flex items-center justify-center relative flex-shrink-0" style={{ aspectRatio: '16/9', width: '100%' }}>
                          {currentLesson.type === 'video' ? (
                            <>
                              {/* Player do YouTube */}
                              <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1`}
                                title={currentLesson.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </>
                          ) : currentLesson.type === 'exercise' ? (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                              <div className="text-center max-w-2xl px-8">
                                <FileText className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-foreground mb-4">{currentLesson.title}</h3>
                                <div className="bg-card border border-border rounded-lg p-6 text-left">
                                  <p className="text-foreground mb-4">{currentLesson.content || 'Conteúdo do exercício apareceria aqui...'}</p>
                                  <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                                    Iniciar Exercício
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/10 to-blue-500/10">
                              <div className="text-center max-w-2xl px-8">
                                <BookOpen className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-foreground mb-4">{currentLesson.title}</h3>
                                <div className="bg-card border border-border rounded-lg p-6 text-left">
                                  <div className="prose prose-invert dark:prose-invert max-w-none">
                                    <p className="text-foreground mb-4">{currentLesson.content || 'Conteúdo da leitura apareceria aqui...'}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Lesson Info */}
                        <div className="bg-card border border-border rounded-lg p-6 mt-4 flex-shrink-0">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1 min-w-0">
                              <h2 className="text-2xl font-bold text-foreground mb-3">{currentLesson.title}</h2>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground flex-wrap">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {currentLesson.duration}
                                </span>
                                <Badge variant="outline">
                                  {currentLesson.type === 'video' ? 'Vídeo' : currentLesson.type === 'exercise' ? 'Exercício' : 'Leitura'}
                                </Badge>
                                <span className="truncate">Módulo: {currentModule?.title}</span>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              {!completedLessons.has(currentLesson.id) && !currentLesson.completed && (
                                <Button 
                                  onClick={handleCompleteLesson}
                                  className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Marcar como Concluída
                                </Button>
                              )}
                              {completedLessons.has(currentLesson.id) && (
                                <Badge className="bg-green-600 dark:bg-green-500">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Concluída
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Descrição da Aula */}
                          <div className="border-t border-border pt-4">
                            <h3 className="text-sm font-semibold text-foreground mb-2">Sobre esta aula</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {currentLesson.description || 'Nesta aula você aprenderá conceitos importantes sobre o tema abordado. Acompanhe atentamente o conteúdo e pratique os exercícios propostos para fixar o aprendizado.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  {/* Sidebar de Vídeos Restantes */}
                  <aside className="w-[320px] bg-card border border-border rounded-lg overflow-hidden flex flex-col flex-shrink-0">
                    <div className="p-4 border-b border-border flex-shrink-0">
                      <h3 className="text-sm font-semibold text-foreground">Aulas do Curso</h3>
                      <p className="text-xs text-muted-foreground mt-1">Todas as aulas disponíveis</p>
                    </div>
                    <ScrollArea className="flex-1 min-h-0">
                      <div className="p-3 space-y-2">
                        {(() => {
                          if (!currentLessonId) {
                            return (
                              <div className="text-center py-4">
                                <p className="text-sm text-muted-foreground">Selecione uma aula para começar</p>
                              </div>
                            );
                          }

                          const allLessons: Array<{ moduleId: string; moduleTitle: string; lesson: Lesson; index: number; globalIndex: number }> = [];
                          let globalIdx = 0;
                          course.modules.forEach(module => {
                            module.lessons.forEach((lesson, idx) => {
                              allLessons.push({ moduleId: module.id, moduleTitle: module.title, lesson, index: idx, globalIndex: globalIdx });
                              globalIdx++;
                            });
                          });
                          
                          const currentIndex = allLessons.findIndex(l => l.lesson.id === currentLessonId);
                          
                          if (currentIndex === -1) {
                            return (
                              <div className="text-center py-4">
                                <p className="text-sm text-muted-foreground">Carregando aulas...</p>
                              </div>
                            );
                          }

                          // Mostrar todas as aulas, mas destacar a atual e as próximas
                          return allLessons.map(({ moduleId, moduleTitle, lesson, index, globalIndex }) => {
                            const isCurrent = lesson.id === currentLessonId;
                            const isBefore = globalIndex < currentIndex;
                            const isAfter = globalIndex > currentIndex;
                            const isCompleted = completedLessons.has(lesson.id) || lesson.completed;
                            const isLocked = lesson.locked && !isCompleted;
                            
                            return (
                              <Card 
                                key={lesson.id}
                                className={`cursor-pointer transition-all ${
                                  isCurrent
                                    ? 'ring-2 ring-blue-600 dark:ring-blue-500 bg-blue-50 dark:bg-blue-950/20'
                                    : isLocked
                                      ? 'opacity-50 cursor-not-allowed hover:shadow-sm'
                                      : 'hover:shadow-md'
                                }`}
                                onClick={() => !isLocked && handleLessonClick(moduleId, lesson.id, lesson)}
                              >
                                <CardContent className="p-3">
                                  <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                      {isCurrent ? (
                                        <div className="w-10 h-10 rounded bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                          <Play className="w-5 h-5 text-white" />
                                        </div>
                                      ) : isLocked ? (
                                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                          <Lock className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                      ) : isCompleted ? (
                                        <div className="w-10 h-10 rounded bg-green-600 dark:bg-green-500 flex items-center justify-center">
                                          <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                      ) : lesson.type === 'video' ? (
                                        <div className="w-10 h-10 rounded bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                          <Video className="w-5 h-5 text-white" />
                                        </div>
                                      ) : lesson.type === 'exercise' ? (
                                        <div className="w-10 h-10 rounded bg-purple-600 dark:bg-purple-500 flex items-center justify-center">
                                          <FileText className="w-5 h-5 text-white" />
                                        </div>
                                      ) : lesson.type === 'quiz' ? (
                                        <div className="w-10 h-10 rounded bg-orange-600 dark:bg-orange-500 flex items-center justify-center">
                                          <HelpCircle className="w-5 h-5 text-white" />
                                        </div>
                                      ) : (
                                        <div className="w-10 h-10 rounded bg-green-600 dark:bg-green-500 flex items-center justify-center">
                                          <BookOpen className="w-5 h-5 text-white" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className={`text-sm font-medium leading-tight mb-1 ${
                                        isCurrent
                                          ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                          : isLocked 
                                            ? 'text-muted-foreground' 
                                            : 'text-foreground'
                                      }`}>
                                        {lesson.title}
                                      </h4>
                                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                                        <span>{lesson.duration}</span>
                                        <span>•</span>
                                        <span>{lesson.type === 'video' ? 'Vídeo' : lesson.type === 'exercise' ? 'Exercício' : lesson.type === 'quiz' ? 'Questionário' : 'Leitura'}</span>
                                        {isCompleted && (
                                          <>
                                            <span>•</span>
                                            <span className="text-green-600 dark:text-green-400">Concluída</span>
                                          </>
                                        )}
                                        {isCurrent && (
                                          <>
                                            <span>•</span>
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold">Atual</span>
                                          </>
                                        )}
                                      </div>
                                      <p className="text-xs text-muted-foreground/70 line-clamp-1">
                                        {moduleTitle}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          });
                        })()}
                      </div>
                    </ScrollArea>
                  </aside>
                </div>
                )}

              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium text-muted-foreground">Selecione uma aula para começar</h3>
              </div>
            </div>
          )}
        </main>

        {/* Sidebar - Trilha do Curso */}
        <aside className="bg-card border-l border-border overflow-hidden flex flex-col min-w-0 hidden lg:flex">
          <div className="p-4 border-b border-border flex-shrink-0">
            <h2 className="text-base font-semibold text-foreground mb-1">Conteúdo do Curso</h2>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{course.modules.length} módulos</span>
              <span>•</span>
              <span>{course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas</span>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {course.modules.map((module, moduleIndex) => {
                const isExpanded = expandedModules.has(module.id);
                const moduleProgress = getModuleProgress(module);
                const isModuleCompleted = moduleProgress === 100;

                return (
                  <div key={module.id} className="mb-1">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                          isModuleCompleted 
                            ? 'bg-green-600 dark:bg-green-500 text-white' 
                            : moduleProgress > 0 
                              ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {isModuleCompleted ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-semibold">{moduleIndex + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-foreground">{module.title}</div>
                          {module.description && (
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{module.description}</div>
                          )}
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="text-xs text-muted-foreground">
                              {module.lessons.filter(l => completedLessons.has(l.id) || l.completed).length}/{module.lessons.length} aulas
                            </div>
                            {moduleProgress > 0 && (
                              <>
                                <span className="text-muted-foreground/50">•</span>
                                <div className="flex-1 max-w-20">
                                  <Progress value={moduleProgress} className="h-1" />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="ml-10 mt-1 space-y-0.5">
                        {module.lessons.map((lesson, lessonIndex) => {
                          const isActive = currentLessonId === lesson.id;
                          const isCompleted = completedLessons.has(lesson.id) || lesson.completed;
                          const isLocked = lesson.locked && !isCompleted;

                          return (
                            <button
                              key={lesson.id}
                              onClick={() => !isLocked && handleLessonClick(module.id, lesson.id, lesson)}
                              disabled={isLocked}
                              className={`w-full flex items-start space-x-2 p-2.5 rounded-md transition-colors text-left ${
                                isActive
                                  ? 'bg-blue-600/10 dark:bg-blue-500/10 border-l-2 border-blue-600 dark:border-blue-500'
                                  : isLocked
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-muted/50'
                              }`}
                            >
                              <div className="flex-shrink-0 mt-0.5">
                                {isLocked ? (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                ) : isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                                ) : lesson.type === 'video' ? (
                                  <Video className="w-4 h-4 text-muted-foreground" />
                                ) : lesson.type === 'exercise' ? (
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`text-sm leading-tight ${
                                  isActive 
                                    ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                                    : isLocked 
                                      ? 'text-muted-foreground' 
                                      : 'text-foreground'
                                }`}>
                                  {lesson.title}
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                  {lesson.type === 'video' && (
                                    <>
                                      <span className="text-xs text-muted-foreground/50">•</span>
                                      <span className="text-xs text-muted-foreground">Vídeo</span>
                                    </>
                                  )}
                                  {lesson.type === 'exercise' && (
                                    <>
                                      <span className="text-xs text-muted-foreground/50">•</span>
                                      <span className="text-xs text-muted-foreground">Exercício</span>
                                    </>
                                  )}
                                  {lesson.type === 'text' && (
                                    <>
                                      <span className="text-xs text-muted-foreground/50">•</span>
                                      <span className="text-xs text-muted-foreground">Leitura</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </aside>

      </div>
    </div>
  );
}
