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
  Video, 
  Play, 
  Camera, 
  Mic, 
  Upload, 
  Loader2,
  Download,
  Eye,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

interface VideoCreatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoCreator({ isOpen, onClose }: VideoCreatorProps) {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoData, setVideoData] = useState({
    script: 'Olá! Sou João Silva, desenvolvedor frontend com 3 anos de experiência. Sou apaixonado por criar interfaces incríveis e experiências de usuário memoráveis. Tenho expertise em React, TypeScript e sempre busco aprender novas tecnologias.',
    style: 'professional',
    background: 'office',
    duration: '60'
  });

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string) => {
    setVideoData(prev => ({ ...prev, [field]: value }));
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Simular gravação
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 60) {
          clearInterval(interval);
          setIsRecording(false);
          setStep(3);
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setStep(3);
  };

  const processVideo = async () => {
    setIsProcessing(true);
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 4000));
    setIsProcessing(false);
    setStep(4);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span>Criador de Vídeo de Apresentação</span>
          </DialogTitle>
          <DialogDescription>
            Crie um vídeo profissional de apresentação para se destacar no banco de talentos
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
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg mb-2 text-foreground">Roteiro do seu vídeo</h3>
              <p className="text-muted-foreground">
                Escreva o que você gostaria de falar no seu vídeo de apresentação
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="script">Roteiro (máx. 300 palavras)</Label>
                <Textarea
                  id="script"
                  rows={6}
                  value={videoData.script}
                  onChange={(e) => handleInputChange('script', e.target.value)}
                  placeholder="Apresente-se, fale sobre sua experiência, habilidades e objetivos..."
                />
                <div className="text-right text-sm text-muted-foreground">
                  {videoData.script.split(' ').length}/300 palavras
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Estilo do vídeo</Label>
                  <Select value={videoData.style} onValueChange={(value) => handleInputChange('style', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Profissional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="creative">Criativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Fundo virtual</Label>
                  <Select value={videoData.background} onValueChange={(value) => handleInputChange('background', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Escritório</SelectItem>
                      <SelectItem value="home">Home Office</SelectItem>
                      <SelectItem value="neutral">Neutro</SelectItem>
                      <SelectItem value="none">Sem fundo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm text-foreground">Dicas para um bom vídeo:</h4>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      <li>• Fale com clareza e naturalidade</li>
                      <li>• Mantenha contato visual com a câmera</li>
                      <li>• Use boa iluminação</li>
                      <li>• Tenha um ambiente silencioso</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 relative">
                <Camera className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                {isRecording && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 dark:bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg mb-2 text-foreground">
                {isRecording ? 'Gravando...' : 'Pronto para gravar?'}
              </h3>
              
              {isRecording && (
                <div className="text-2xl text-red-600 dark:text-red-400 mb-4">
                  {formatTime(recordingTime)}
                </div>
              )}
              
              <p className="text-muted-foreground mb-6">
                {isRecording 
                  ? 'Fale naturalmente seguindo seu roteiro'
                  : 'Certifique-se de que sua câmera e microfone estão funcionando'
                }
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Mic className="w-4 h-4" />
                  <span>Seu roteiro</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground leading-relaxed">
                  {videoData.script}
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
                  <Camera className="w-4 h-4 mr-2" />
                  Iniciar Gravação
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Parar Gravação
                </Button>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg mb-2 text-foreground">Gravação concluída!</h3>
              <p className="text-muted-foreground">
                Revise sua gravação e faça ajustes se necessário
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Preview do vídeo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center relative">
                  <Play className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  <div className="absolute bottom-2 left-2 bg-black/75 text-white px-2 py-1 rounded text-xs">
                    {formatTime(recordingTime)}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setStep(2)}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Gravar Novamente
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={processVideo} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Finalizar Vídeo'
                )}
              </Button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-red-600 dark:text-red-400" />
            <h3 className="text-lg mb-2 text-foreground">Processando seu vídeo...</h3>
            <p className="text-muted-foreground">Estamos aplicando melhorias e preparando seu vídeo final</p>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl mb-2 text-foreground">Vídeo criado com sucesso!</h3>
            <p className="text-muted-foreground mb-6">
              Seu vídeo de apresentação está pronto e foi adicionado ao seu perfil no banco de talentos
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                <Download className="w-4 h-4 mr-2" />
                Baixar Vídeo
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Ver no Perfil
              </Button>
            </div>
          </div>
        )}

        {step < 3 && (
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={step === 1 || isRecording}
            >
              Anterior
            </Button>
            <Button 
              onClick={nextStep}
              disabled={step === 2}
            >
              Próximo
            </Button>
          </div>
        )}

        {step === 4 && (
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