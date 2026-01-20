import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  FileText, 
  Download, 
  Sparkles, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award,
  Phone,
  Mail,
  MapPin,
  Loader2
} from 'lucide-react';

interface CurriculumGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CurriculumGenerator({ isOpen, onClose }: CurriculumGeneratorProps) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      location: 'São Paulo, SP',
      title: 'Desenvolvedor Frontend'
    },
    experience: [
      {
        company: 'Tech Corp',
        position: 'Desenvolvedor Frontend Jr',
        period: '2022 - Presente',
        description: 'Desenvolvimento de interfaces web usando React e TypeScript'
      }
    ],
    education: [
      {
        institution: 'Universidade de São Paulo',
        course: 'Ciência da Computação',
        period: '2019 - 2023'
      }
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
    summary: 'Desenvolvedor frontend apaixonado por criar experiências de usuário excepcionais.',
    template: 'modern'
  });

  const totalSteps = 5;

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (section: string, index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section as keyof typeof prev].map((item: any, i: number) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        position: '',
        period: '',
        description: ''
      }]
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        course: '',
        period: ''
      }]
    }));
  };

  const generateCurriculum = async () => {
    setIsGenerating(true);
    // Simular processamento IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setStep(6); // Tela de resultado
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      generateCurriculum();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Gerador de Currículo IA</span>
          </DialogTitle>
          <DialogDescription>
            Nossa IA criará um currículo personalizado baseado no seu perfil e experiências
          </DialogDescription>
        </DialogHeader>

        {step <= totalSteps && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Etapa {step} de {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(step / totalSteps) * 100} />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg text-foreground">Informações Pessoais</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={formData.personalInfo.name}
                  onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Título profissional</Label>
                <Input
                  id="title"
                  value={formData.personalInfo.title}
                  onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={formData.personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg text-foreground">Resumo Profissional</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary">Descreva brevemente sua experiência e objetivos</Label>
              <Textarea
                id="summary"
                rows={4}
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Ex: Desenvolvedor frontend com 3 anos de experiência..."
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg text-foreground">Experiência Profissional</h3>
              </div>
              <Button onClick={addExperience} variant="outline" size="sm">
                Adicionar Experiência
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Empresa</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => handleArrayInputChange('experience', index, 'company', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cargo</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => handleArrayInputChange('experience', index, 'position', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Período</Label>
                        <Input
                          value={exp.period}
                          onChange={(e) => handleArrayInputChange('experience', index, 'period', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label>Descrição</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => handleArrayInputChange('experience', index, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg text-foreground">Formação Acadêmica</h3>
              </div>
              <Button onClick={addEducation} variant="outline" size="sm">
                Adicionar Formação
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Instituição</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => handleArrayInputChange('education', index, 'institution', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Curso</Label>
                        <Input
                          value={edu.course}
                          onChange={(e) => handleArrayInputChange('education', index, 'course', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Período</Label>
                        <Input
                          value={edu.period}
                          onChange={(e) => handleArrayInputChange('education', index, 'period', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg text-foreground">Habilidades e Template</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Habilidades principais</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Input 
                  placeholder="Digite uma habilidade e pressione Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = e.currentTarget.value.trim();
                      if (value && !formData.skills.includes(value)) {
                        setFormData(prev => ({
                          ...prev,
                          skills: [...prev.skills, value]
                        }));
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Template do currículo</Label>
                <Select value={formData.template} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, template: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Moderno</SelectItem>
                    <SelectItem value="classic">Clássico</SelectItem>
                    <SelectItem value="creative">Criativo</SelectItem>
                    <SelectItem value="minimal">Minimalista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg mb-2 text-foreground">Gerando seu currículo...</h3>
            <p className="text-muted-foreground">Nossa IA está analisando suas informações e criando um currículo personalizado</p>
          </div>
        )}

        {step === 6 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl mb-2 text-foreground">Currículo gerado com sucesso!</h3>
            <p className="text-muted-foreground mb-6">
              Seu currículo foi criado usando inteligência artificial baseado nas suas informações
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
            </div>
          </div>
        )}

        {step <= totalSteps && (
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={step === 1}
            >
              Anterior
            </Button>
            <Button onClick={nextStep} disabled={isGenerating}>
              {step === totalSteps ? 'Gerar Currículo' : 'Próximo'}
            </Button>
          </div>
        )}

        {step === 6 && (
          <div className="flex justify-center pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}