import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { 
  Crown, 
  CheckCircle, 
  CreditCard, 
  Lock,
  Users,
  BookOpen,
  Trophy,
  Star,
  Video,
  FileText,
  Building2,
  Sparkles
} from 'lucide-react';

interface PremiumUpgradeProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function PremiumUpgrade({ isOpen, onClose, onUpgrade }: PremiumUpgradeProps) {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    acceptTerms: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    monthly: {
      price: 49,
      period: 'mês',
      discount: 0,
      total: 49
    },
    annual: {
      price: 390,
      period: 'ano',
      discount: 30,
      total: 390,
      monthlyEquivalent: 32.5
    }
  };

  const premiumFeatures = [
    { icon: BookOpen, title: 'Todos os cursos premium', description: 'Acesso ilimitado a mais de 100 cursos' },
    { icon: Users, title: 'Feed profissional completo', description: 'Networking avançado e visibilidade' },
    { icon: Trophy, title: 'Banco de talentos', description: 'Seja descoberto por empresas' },
    { icon: FileText, title: 'Currículo personalizado por IA', description: 'CV otimizado automaticamente' },
    { icon: Video, title: 'Vídeo de apresentação', description: 'Destaque-se com vídeos profissionais' },
    { icon: Building2, title: 'Conexão direta com empresas', description: 'Acesso direto a recrutadores' },
    { icon: Star, title: 'Certificados verificados', description: 'Validação profissional dos cursos' },
    { icon: Sparkles, title: 'Suporte prioritário', description: 'Atendimento especializado 24/7' }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setStep(3);
  };

  const completeUpgrade = () => {
    onUpgrade();
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
            <span>Upgrade para Premium</span>
          </DialogTitle>
          <DialogDescription>
            Desbloqueie todo o potencial da plataforma TalentHub
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            {/* Current vs Premium */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <span>Plano Atual (Gratuito)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span>Acesso limitado a cursos</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span>Feed básico</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span>Perfil simples</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-4">
                    Funcionalidades limitadas para explorar a plataforma
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                    <span>Premium</span>
                  </CardTitle>
                  <Badge className="w-fit bg-yellow-500 dark:bg-yellow-600 text-white">
                    Primeiro mês grátis
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {premiumFeatures.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span>{feature.title}</span>
                    </div>
                  ))}
                  <div className="text-xs text-muted-foreground mt-4">
                    + mais 4 funcionalidades exclusivas
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All Premium Features */}
            <div>
              <h3 className="text-lg mb-4 text-foreground">Tudo que você terá no Premium:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm text-foreground">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Plans */}
            <div>
              <h3 className="text-lg mb-4">Escolha seu plano:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer transition-all ${
                    selectedPlan === 'monthly' ? 'border-blue-500 ring-2 ring-blue-200' : ''
                  }`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Mensal</CardTitle>
                        <CardDescription>Flexibilidade total</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-foreground">R$ {plans.monthly.price}</div>
                        <div className="text-sm text-muted-foreground">por mês</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="w-fit">
                      Primeiro mês grátis
                    </Badge>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all relative ${
                    selectedPlan === 'annual' ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800' : ''
                  }`}
                  onClick={() => setSelectedPlan('annual')}
                >
                  <Badge className="absolute -top-2 right-4 bg-green-600 dark:bg-green-500">
                    Economize 30%
                  </Badge>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Anual</CardTitle>
                        <CardDescription>Melhor valor</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-foreground">R$ {plans.annual.monthlyEquivalent}</div>
                        <div className="text-sm text-muted-foreground">por mês</div>
                        <div className="text-xs text-muted-foreground">
                          R$ {plans.annual.total} cobrados anualmente
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge className="w-fit bg-green-600 dark:bg-green-500">
                      2 meses grátis
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={onClose}>
                Talvez depois
              </Button>
              <Button onClick={() => setStep(2)}>
                Continuar com {selectedPlan === 'monthly' ? 'Mensal' : 'Anual'}
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl mb-2 text-foreground">Finalizar assinatura</h3>
              <p className="text-muted-foreground">
                Plano {selectedPlan === 'monthly' ? 'Mensal' : 'Anual'} - 
                R$ {selectedPlan === 'monthly' ? plans.monthly.price : plans.annual.monthlyEquivalent}
                {selectedPlan === 'monthly' ? '/mês' : '/mês (cobrado anualmente)'}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Dados do cartão</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Nome no cartão</Label>
                  <Input
                    id="cardName"
                    value={paymentData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    placeholder="João Silva"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do cartão</Label>
                  <Input
                    id="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Validade</Label>
                    <Input
                      id="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/AA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
              <CardContent className="pt-6">
                <h4 className="text-sm mb-3 text-foreground">Resumo da cobrança:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-foreground">
                    <span>Plano {selectedPlan === 'monthly' ? 'Mensal' : 'Anual'}</span>
                    <span>R$ {selectedPlan === 'monthly' ? plans.monthly.price : plans.annual.total}</span>
                  </div>
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Desconto primeiro mês</span>
                    <span>-R$ {selectedPlan === 'monthly' ? plans.monthly.price : plans.annual.monthlyEquivalent}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg text-foreground">
                    <span>Total hoje</span>
                    <span>R$ 0,00</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Próxima cobrança em 30 dias: R$ {selectedPlan === 'monthly' ? plans.monthly.price : plans.annual.monthlyEquivalent}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={paymentData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
              />
              <Label htmlFor="acceptTerms" className="text-sm">
                Aceito os termos de uso e política de cancelamento
              </Label>
            </div>

            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button 
                onClick={handlePayment}
                disabled={!paymentData.acceptTerms || isProcessing}
              >
                {isProcessing ? 'Processando...' : 'Confirmar Assinatura'}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl mb-2 text-foreground">Bem-vindo ao Premium! 🎉</h3>
            <p className="text-muted-foreground mb-6">
              Sua assinatura foi ativada com sucesso. Agora você tem acesso a todos os recursos premium.
            </p>
            
            <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <h4 className="text-sm mb-2 text-foreground">O que foi desbloqueado:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-foreground">Todos os cursos premium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-foreground">Banco de talentos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-foreground">Currículo IA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-foreground">Vídeo de apresentação</span>
                </div>
              </div>
            </div>

            <Button onClick={completeUpgrade} className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
              Explorar recursos Premium
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}