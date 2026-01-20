import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { 
  X, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  Clock,
  Building2,
  Star,
  Target
} from 'lucide-react';

interface JobModalProps {
  onClose: () => void;
  onCreateJob: (job: any) => void;
}

export function JobModal({ onClose, onCreateJob }: JobModalProps) {
  const [jobData, setJobData] = useState({
    title: '',
    company: 'Varejo Premium',
    location: '',
    type: '',
    level: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    requiredCourses: [] as string[],
    skills: [] as string[]
  });

  const availableCourses = [
    'Gestão de Vendas no Varejo',
    'Visual Merchandising Avançado',
    'E-commerce e Omnichannel',
    'Atendimento ao Cliente Excepcional',
    'Gestão de Estoque e Compras',
    'Marketing Digital para Varejo',
    'Gestão de Equipes no Varejo',
    'Análise de Dados no Varejo'
  ];

  const availableSkills = [
    'Gestão de Vendas',
    'Visual Merchandising',
    'E-commerce',
    'Atendimento ao Cliente',
    'Gestão de Equipe',
    'Análise de Dados',
    'Marketing Digital',
    'Compras',
    'Negociação',
    'CRM',
    'KPIs'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobData.title || !jobData.location || !jobData.type || !jobData.description) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const newJob = {
      id: Date.now(),
      ...jobData,
      createdAt: new Date().toISOString(),
      applications: [],
      status: 'active'
    };

    onCreateJob(newJob);
    onClose();
  };

  const handleCourseToggle = (course: string) => {
    setJobData(prev => ({
      ...prev,
      requiredCourses: prev.requiredCourses.includes(course)
        ? prev.requiredCourses.filter(c => c !== course)
        : [...prev.requiredCourses, course]
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setJobData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Criar Nova Vaga</span>
          </DialogTitle>
          <DialogDescription>
            Preencha as informações da vaga para atrair os melhores talentos do varejo
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Título da Vaga *</label>
                  <Input
                    placeholder="Ex: Gerente de Vendas"
                    value={jobData.title}
                    onChange={(e) => setJobData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Localização *</label>
                  <Input
                    placeholder="Ex: São Paulo, SP"
                    value={jobData.location}
                    onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Tipo de Contrato *</label>
                  <Select value={jobData.type} onValueChange={(value) => setJobData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Tempo Integral</SelectItem>
                      <SelectItem value="part-time">Meio Período</SelectItem>
                      <SelectItem value="contract">Contrato</SelectItem>
                      <SelectItem value="internship">Estágio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Nível de Experiência</label>
                  <Select value={jobData.level} onValueChange={(value) => setJobData(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Júnior</SelectItem>
                      <SelectItem value="mid">Pleno</SelectItem>
                      <SelectItem value="senior">Sênior</SelectItem>
                      <SelectItem value="lead">Líder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Faixa Salarial</label>
                  <Input
                    placeholder="Ex: R$ 3.000 - R$ 5.000"
                    value={jobData.salary}
                    onChange={(e) => setJobData(prev => ({ ...prev, salary: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Descrição e Requisitos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Descrição e Requisitos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Descrição da Vaga *</label>
                  <Textarea
                    placeholder="Descreva as principais responsabilidades e objetivos da posição..."
                    value={jobData.description}
                    onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Requisitos</label>
                  <Textarea
                    placeholder="Liste os requisitos necessários para a vaga..."
                    value={jobData.requirements}
                    onChange={(e) => setJobData(prev => ({ ...prev, requirements: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Benefícios</label>
                  <Textarea
                    placeholder="Descreva os benefícios oferecidos..."
                    value={jobData.benefits}
                    onChange={(e) => setJobData(prev => ({ ...prev, benefits: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cursos Obrigatórios */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span>Cursos Obrigatórios</span>
              </CardTitle>
              <CardDescription>
                Selecione os cursos que o candidato DEVE visualizar antes de se candidatar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableCourses.map((course) => (
                  <div key={course} className="flex items-center space-x-2">
                    <Checkbox
                      id={course}
                      checked={jobData.requiredCourses.includes(course)}
                      onCheckedChange={() => handleCourseToggle(course)}
                    />
                    <label htmlFor={course} className="text-sm cursor-pointer text-foreground">
                      {course}
                    </label>
                  </div>
                ))}
              </div>
              {jobData.requiredCourses.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-300">
                    <strong>Cursos selecionados:</strong> Os candidatos precisarão visualizar {jobData.requiredCourses.length} curso(s) antes de se candidatar.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Habilidades Desejadas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Habilidades Desejadas</span>
              </CardTitle>
              <CardDescription>
                Selecione as habilidades que serão filtradas no banco de talentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={jobData.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <label htmlFor={skill} className="text-sm cursor-pointer">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Briefcase className="w-4 h-4 mr-2" />
              Publicar Vaga
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}