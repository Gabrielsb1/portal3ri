import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  Users, 
  Search, 
  UserPlus, 
  MessageCircle, 
  Trophy, 
  MapPin, 
  Briefcase,
  Crown,
  CheckCircle,
  UserCheck,
  Filter,
  Star
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar: string;
  title: string;
  location: string;
  company: string;
  completedCourses: number;
  ranking: string;
  isPremium: boolean;
  isConnected: boolean;
  connectionStatus: 'none' | 'pending' | 'connected';
  mutualConnections: number;
  recentCourse?: string;
}

interface ConnectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
}

export function ConnectionsModal({ isOpen, onClose, isPremium }: ConnectionsModalProps) {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Ana Clara Vendas',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e8?w=100&h=100&fit=crop&crop=face',
      title: 'Gerente de Vendas',
      location: 'São Paulo, SP',
      company: 'Magazine Luiza',
      completedCourses: 8,
      ranking: 'Top 5%',
      isPremium: true,
      isConnected: false,
      connectionStatus: 'none',
      mutualConnections: 3,
      recentCourse: 'Gestão de Vendas no Varejo'
    },
    {
      id: 2,
      name: 'Carlos Eduardo Lima',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      title: 'Visual Merchandiser',
      location: 'Rio de Janeiro, RJ',
      company: 'Lojas Americanas',
      completedCourses: 12,
      ranking: 'Top 3%',
      isPremium: true,
      isConnected: false,
      connectionStatus: 'none',
      mutualConnections: 5,
      recentCourse: 'Visual Merchandising'
    },
    {
      id: 3,
      name: 'Marina Oliveira',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      title: 'Coordenadora de E-commerce',
      location: 'Belo Horizonte, MG',
      company: 'Via Varejo',
      completedCourses: 6,
      ranking: isPremium ? 'Top 15%' : 'Top 10-20%',
      isPremium: false,
      isConnected: false,
      connectionStatus: 'none',
      mutualConnections: 2,
      recentCourse: 'E-commerce e Omnichannel'
    },
    {
      id: 4,
      name: 'Pedro Henrique',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      title: 'Analista de Category Management',
      location: 'Porto Alegre, RS',
      company: 'Carrefour',
      completedCourses: 15,
      ranking: 'Top 1%',
      isPremium: true,
      isConnected: false,
      connectionStatus: 'none',
      mutualConnections: 7,
      recentCourse: 'Gestão de Vendas no Varejo'
    },
    {
      id: 5,
      name: 'Juliana Costa',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      title: 'Supervisora de Loja',
      location: 'Curitiba, PR',
      company: 'Renner',
      completedCourses: 4,
      ranking: isPremium ? 'Top 25%' : 'Top 20-30%',
      isPremium: false,
      isConnected: false,
      connectionStatus: 'none',
      mutualConnections: 1,
      recentCourse: 'Visual Merchandising'
    }
  ]);

  const [connections, setConnections] = useState<User[]>([
    {
      id: 6,
      name: 'Roberto Silva',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      title: 'Coordenador de Trade Marketing',
      location: 'Brasília, DF',
      company: 'Coca-Cola',
      completedCourses: 9,
      ranking: 'Top 8%',
      isPremium: false,
      isConnected: true,
      connectionStatus: 'connected',
      mutualConnections: 4,
      recentCourse: 'Gestão de Vendas no Varejo'
    }
  ]);

  const handleConnect = (userId: number) => {
    setSuggestedUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, connectionStatus: 'pending' }
        : user
    ));
  };

  const handleMessage = (userId: number) => {
    // Implementar funcionalidade de mensagem
    alert('Funcionalidade de mensagens será implementada em breve!');
  };

  const filteredUsers = suggestedUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'premium') return matchesSearch && user.isPremium;
    if (selectedFilter === 'same-course') return matchesSearch && user.recentCourse === 'Gestão de Vendas no Varejo';
    
    return matchesSearch;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Conexões Profissionais</span>
          </DialogTitle>
          <DialogDescription>
            Conecte-se com outros profissionais e expanda sua rede
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discover">Descobrir</TabsTrigger>
            <TabsTrigger value="connections">
              Minhas Conexões ({connections.length})
            </TabsTrigger>
            <TabsTrigger value="requests">Solicitações</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, cargo ou empresa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                >
                  Todos
                </Button>
                <Button
                  variant={selectedFilter === 'premium' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('premium')}
                >
                  <Crown className="w-4 h-4 mr-1" />
                  Premium
                </Button>
                <Button
                  variant={selectedFilter === 'same-course' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('same-course')}
                >
                  <Trophy className="w-4 h-4 mr-1" />
                  Mesmo Curso
                </Button>
              </div>
            </div>

            {/* User Cards */}
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          {user.isPremium && (
                            <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm text-foreground">{user.name}</h4>
                            {user.isPremium && (
                              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-xs">
                                Premium
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.title}</p>
                          <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Briefcase className="w-3 h-3" />
                              <span>{user.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{user.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              <Trophy className="w-3 h-3 mr-1" />
                              {user.completedCourses} cursos
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              {user.ranking}
                            </Badge>
                            {user.mutualConnections > 0 && (
                              <span className="text-xs text-blue-600 dark:text-blue-400">
                                {user.mutualConnections} conexões em comum
                              </span>
                            )}
                          </div>
                          {user.recentCourse && (
                            <div className="mt-2">
                              <span className="text-xs text-muted-foreground">
                                Último curso: <span className="text-blue-600 dark:text-blue-400">{user.recentCourse}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {user.connectionStatus === 'none' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleConnect(user.id)}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                          >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Conectar
                          </Button>
                        )}
                        {user.connectionStatus === 'pending' && (
                          <Button size="sm" variant="outline" disabled>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Pendente
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleMessage(user.id)}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Mensagem
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg text-foreground mb-2">Nenhum usuário encontrado</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar seus filtros ou termo de busca
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="connections" className="space-y-4">
            {connections.length > 0 ? (
              <div className="space-y-4">
                {connections.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm text-foreground">{user.name}</h4>
                              <UserCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-sm text-muted-foreground">{user.title} • {user.company}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleMessage(user.id)}>
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Mensagem
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg text-foreground mb-2">Nenhuma conexão ainda</h3>
                  <p className="text-muted-foreground mb-4">
                    Comece a se conectar com outros profissionais
                  </p>
                  <Button onClick={() => setActiveTab('discover')}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Descobrir Pessoas
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg text-foreground mb-2">Nenhuma solicitação pendente</h3>
                <p className="text-muted-foreground">
                  Quando alguém enviar uma solicitação de conexão, ela aparecerá aqui
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          {!isPremium && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-2">
                Usuários Premium veem posições exatas no ranking
              </p>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Premium
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}