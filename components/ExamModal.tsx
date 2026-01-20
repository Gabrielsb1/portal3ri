import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  Clock, 
  AlertTriangle, 
  Shield, 
  Camera, 
  Monitor,
  Eye,
  CheckCircle,
  XCircle,
  Trophy,
  Lock,
  Zap,
  AlertCircle,
  Share
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  onExamComplete: (score: number) => void;
}

export function ExamModal({ isOpen, onClose, courseTitle, onExamComplete }: ExamModalProps) {
  const [examState, setExamState] = useState<'intro' | 'security' | 'exam' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutos
  const [securityChecks, setSecurityChecks] = useState({
    camera: false,
    fullscreen: false,
    microphone: false,
    screenShare: false
  });
  const [examScore, setExamScore] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "Qual é a principal vantagem do React Hooks em relação aos Class Components?",
      options: [
        "Melhor performance",
        "Reutilização de lógica stateful",
        "Sintaxe mais simples",
        "Melhor debugging"
      ],
      correctAnswer: 1,
      explanation: "React Hooks permitem reutilizar lógica stateful entre componentes sem modificar a hierarquia de componentes."
    },
    {
      id: 2,
      question: "O que é o Virtual DOM no React?",
      options: [
        "Uma cópia do DOM real mantida em memória",
        "Um novo tipo de elemento HTML",
        "Uma biblioteca externa",
        "Um método de renderização"
      ],
      correctAnswer: 0,
      explanation: "O Virtual DOM é uma representação em memória do DOM real, permitindo atualizações mais eficientes."
    },
    {
      id: 3,
      question: "Qual Hook é usado para gerenciar estado local em componentes funcionais?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ],
      correctAnswer: 1,
      explanation: "useState é o Hook fundamental para adicionar estado local a componentes funcionais."
    },
    {
      id: 4,
      question: "Quando o useEffect é executado?",
      options: [
        "Apenas na montagem do componente",
        "Apenas na desmontagem",
        "Após cada renderização",
        "Apenas quando o estado muda"
      ],
      correctAnswer: 2,
      explanation: "Por padrão, useEffect executa após cada renderização, mas pode ser controlado com array de dependências."
    },
    {
      id: 5,
      question: "O que é prop drilling?",
      options: [
        "Otimização de props",
        "Passar props através de múltiplos níveis",
        "Validação de props",
        "Compressão de dados"
      ],
      correctAnswer: 1,
      explanation: "Prop drilling é o processo de passar props através de múltiplos níveis de componentes intermediários."
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examState === 'exam' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleExamSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examState, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSecurityCheck = async (type: keyof typeof securityChecks) => {
    // Simular verificações de segurança
    if (type === 'camera') {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setSecurityChecks(prev => ({ ...prev, camera: true }));
      } catch (error) {
        alert('Acesso à câmera é obrigatório para realizar a prova.');
      }
    } else if (type === 'fullscreen') {
      try {
        await document.documentElement.requestFullscreen();
        setSecurityChecks(prev => ({ ...prev, fullscreen: true }));
      } catch (error) {
        alert('Modo tela cheia é obrigatório para a prova.');
      }
    } else if (type === 'microphone') {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setSecurityChecks(prev => ({ ...prev, microphone: true }));
      } catch (error) {
        alert('Acesso ao microfone é obrigatório para monitoramento de áudio.');
      }
    } else if (type === 'screenShare') {
      setSecurityChecks(prev => ({ ...prev, screenShare: true }));
    }
  };

  const startExam = () => {
    const allChecksComplete = Object.values(securityChecks).every(check => check);
    if (allChecksComplete) {
      setExamState('exam');
    } else {
      alert('Complete todas as verificações de segurança antes de iniciar a prova.');
    }
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleExamSubmit = () => {
    const score = calculateScore();
    setExamScore(score);
    setExamState('results');
    onExamComplete(score);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excelente! Você demonstrou domínio do conteúdo.';
    if (score >= 60) return 'Bom trabalho! Continue praticando para melhorar.';
    return 'Continue estudando. Você pode refazer a prova em 24 horas.';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {examState === 'intro' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Prova de Certificação: {courseTitle}</span>
              </DialogTitle>
              <DialogDescription>
                Teste seus conhecimentos e obtenha sua certificação oficial
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-lg">Informações da Prova</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-foreground">Duração: 30 minutos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-foreground">Questões: {questions.length}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-foreground">Nota mínima: 60%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-foreground">Tentativas: 3 por dia</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-800 dark:text-orange-300">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Regras Importantes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                  <p>• A prova é monitorada por IA para garantir integridade</p>
                  <p>• Sair da tela cheia resultará em cancelamento automático</p>
                  <p>• Não é permitido consultar materiais externos</p>
                  <p>• Tentativas de cola resultarão em suspensão da conta</p>
                  <p>• O tempo é rigorosamente controlado</p>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button onClick={() => setExamState('security')}>
                  Continuar para Verificações
                </Button>
              </div>
            </div>
          </>
        )}

        {examState === 'security' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Verificações de Segurança</span>
              </DialogTitle>
              <DialogDescription>
                Complete todas as verificações para iniciar a prova
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Camera className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="text-sm">Verificação de Câmera</h4>
                        <p className="text-xs text-gray-600">Permitir acesso à câmera para monitoramento</p>
                      </div>
                    </div>
                    {securityChecks.camera ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Button size="sm" onClick={() => handleSecurityCheck('camera')}>
                        Verificar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="text-sm">Modo Tela Cheia</h4>
                        <p className="text-xs text-gray-600">Ativar tela cheia durante a prova</p>
                      </div>
                    </div>
                    {securityChecks.fullscreen ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Button size="sm" onClick={() => handleSecurityCheck('fullscreen')}>
                        Ativar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="text-sm">Monitoramento de Áudio</h4>
                        <p className="text-xs text-gray-600">Detectar sons suspeitos durante a prova</p>
                      </div>
                    </div>
                    {securityChecks.microphone ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Button size="sm" onClick={() => handleSecurityCheck('microphone')}>
                        Verificar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="text-sm">Bloqueio de Aplicações</h4>
                        <p className="text-xs text-gray-600">Impedir acesso a outras aplicações</p>
                      </div>
                    </div>
                    {securityChecks.screenShare ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Button size="sm" onClick={() => handleSecurityCheck('screenShare')}>
                        Ativar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setExamState('intro')}>
                  Voltar
                </Button>
                <Button 
                  onClick={startExam}
                  disabled={!Object.values(securityChecks).every(check => check)}
                >
                  Iniciar Prova
                </Button>
              </div>
            </div>
          </>
        )}

        {examState === 'exam' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Questão {currentQuestion + 1} de {questions.length}</span>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-red-600 dark:text-red-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(timeLeft)}
                  </Badge>
                  <Badge variant="outline">
                    {Object.keys(answers).length}/{questions.length} respondidas
                  </Badge>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <Progress value={((currentQuestion + 1) / questions.length) * 100} />

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">
                    {questions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[questions[currentQuestion].id]?.toString()}
                    onValueChange={(value) => 
                      handleAnswerSelect(questions[currentQuestion].id, parseInt(value))
                    }
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-foreground">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                >
                  Anterior
                </Button>
                <div className="space-x-2">
                  {currentQuestion < questions.length - 1 ? (
                    <Button onClick={handleNextQuestion}>
                      Próxima
                    </Button>
                  ) : (
                    <Button onClick={handleExamSubmit} className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                      Finalizar Prova
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {examState === 'results' && examScore !== null && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Resultado da Prova</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className={`text-6xl mb-4 ${getScoreColor(examScore)}`}>
                    {examScore}%
                  </div>
                  <h3 className="text-xl mb-2 text-foreground">
                    {examScore >= 60 ? 'Parabéns!' : 'Tente Novamente'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {getScoreMessage(examScore)}
                  </p>
                  {examScore >= 60 && (
                    <Badge className="bg-green-600 dark:bg-green-500 text-white px-4 py-2">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprovado
                    </Badge>
                  )}
                  {examScore < 60 && (
                    <Badge variant="destructive" className="px-4 py-2">
                      <XCircle className="w-4 h-4 mr-2" />
                      Não Aprovado
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas Detalhadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-foreground">
                    <span>Questões corretas:</span>
                    <span>{Math.round((examScore / 100) * questions.length)}/{questions.length}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tempo utilizado:</span>
                    <span>{formatTime(1800 - timeLeft)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Precisão:</span>
                    <span>{examScore}%</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={onClose}>
                  Fechar
                </Button>
                {examScore >= 60 ? (
                  <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                    <Trophy className="w-4 h-4 mr-2" />
                    Ver Certificado
                  </Button>
                ) : (
                  <Button variant="outline">
                    Estudar Mais
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}