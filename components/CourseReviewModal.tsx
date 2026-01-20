import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  BookOpen, 
  Video, 
  FileText, 
  Download,
  Play,
  CheckCircle,
  Star,
  Award,
  Users,
  Target,
  Share
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  completed: boolean;
  completedDate?: string;
  grade?: number;
  certificate?: string;
  image: string;
}

interface CourseReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export function CourseReviewModal({ isOpen, onClose, course }: CourseReviewModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!course) return null;

  const modules = [
    {
      id: 1,
      title: 'Fundamentos de Vendas no Varejo',
      duration: '45min',
      completed: true,
      lessons: 8
    },
    {
      id: 2,
      title: 'Técnicas de Abordagem ao Cliente',
      duration: '1h 20min',
      completed: true,
      lessons: 12
    },
    {
      id: 3,
      title: 'Gestão de Metas e Indicadores',
      duration: '2h 15min',
      completed: true,
      lessons: 15
    },
    {
      id: 4,
      title: 'Avaliação Prática de Vendas',
      duration: '30min',
      completed: true,
      lessons: 1
    }
  ];

  const skills = [
    'Técnicas de Vendas',
    'Atendimento ao Cliente',
    'Gestão de Relacionamento',
    'Análise de Performance',
    'Negociação',
    'Fidelização de Clientes'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span>Revisão do Curso: {course.title}</span>
          </DialogTitle>
          <DialogDescription>
            Revise seu progresso, materiais e certificação do curso
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Header */}
          <Card className="border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/30">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-32 relative">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-600 dark:bg-green-500">
                    Concluído ✓
                  </Badge>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl text-foreground">{course.title}</h3>
                    <p className="text-muted-foreground">{course.description}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="text-xs text-muted-foreground">Concluído em</div>
                        <div className="text-foreground">{course.completedDate || '15 Jan 2024'}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="text-xs text-muted-foreground">Duração</div>
                        <div className="text-foreground">{course.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                      <div>
                        <div className="text-xs text-muted-foreground">Nota Final</div>
                        <div className="text-foreground">{course.grade || 92}%</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <div>
                        <div className="text-xs text-muted-foreground">Instrutor</div>
                        <div className="text-foreground">{course.instructor}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="modules">Módulos</TabsTrigger>
              <TabsTrigger value="certificate">Certificado</TabsTrigger>
              <TabsTrigger value="skills">Habilidades</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>Progresso do Curso</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl text-green-600 dark:text-green-400">100%</div>
                      <div className="text-sm text-muted-foreground">Completo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-blue-600 dark:text-blue-400">36</div>
                      <div className="text-sm text-muted-foreground">Aulas Assistidas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-purple-600 dark:text-purple-400">4</div>
                      <div className="text-sm text-muted-foreground">Módulos</div>
                    </div>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Iniciado em 10 Jan 2024</span>
                    <span>Concluído em 15 Jan 2024</span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estatísticas de Estudo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tempo total estudado</span>
                      <span className="text-sm text-foreground">8h 15min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Exercícios completados</span>
                      <span className="text-sm text-foreground">24/24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Projetos entregues</span>
                      <span className="text-sm text-foreground">3/3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Participação em fóruns</span>
                      <span className="text-sm text-foreground">12 posts</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Conquistas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                      <span className="text-sm text-foreground">Primeira Submissão</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                      <span className="text-sm text-foreground">Projeto Perfeito</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                      <span className="text-sm text-foreground">Ajudou Colegas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                      <span className="text-sm text-foreground">Conclusão Rápida</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="modules" className="space-y-4">
              {modules.map((module) => (
                <Card key={module.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="text-sm text-foreground">{module.title}</h4>
                          <p className="text-xs text-muted-foreground">{module.lessons} aulas • {module.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          Concluído
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Revisar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="certificate" className="space-y-4">
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg mb-2 text-foreground">Certificado de Conclusão</h3>
                  <p className="text-muted-foreground mb-4">
                    Parabéns! Você concluiu com sucesso o curso {course.title}
                  </p>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Detalhes do Certificado:</div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-foreground">
                      <div>ID: TH-{course.id}-2024-001</div>
                      <div>Data: 15 Jan 2024</div>
                      <div>Nota: {course.grade || 92}%</div>
                      <div>Carga Horária: {course.duration}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Certificado PDF
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share className="w-4 h-4 mr-2" />
                      Compartilhar no LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Habilidades Desenvolvidas</CardTitle>
                  <CardDescription>
                    Competências adquiridas durante o curso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximos Passos Recomendados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm text-foreground">Visual Merchandising</h4>
                      <p className="text-xs text-muted-foreground">Aprenda técnicas de vitrinismo e exposição</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm text-foreground">E-commerce e Omnichannel</h4>
                      <p className="text-xs text-muted-foreground">Estratégias digitais para o varejo</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm text-foreground">Atendimento ao Cliente Premium</h4>
                      <p className="text-xs text-muted-foreground">Excelência em atendimento e fidelização</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <div className="space-x-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Materiais
            </Button>
            <Button>
              <Video className="w-4 h-4 mr-2" />
              Assistir Novamente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}