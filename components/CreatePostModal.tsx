import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Trophy, 
  Image as ImageIcon, 
  Video, 
  Link,
  Hash,
  Send,
  X
} from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: any) => void;
}

export function CreatePostModal({ isOpen, onClose, onCreatePost }: CreatePostModalProps) {
  const [postData, setPostData] = useState({
    content: '',
    type: 'achievement',
    course: '',
    tags: [] as string[],
    privacy: 'public'
  });

  const courses = [
    'React Avançado',
    'Design System',
    'Node.js Expert',
    'Machine Learning Fundamentals',
    'UX/UI Design',
    'Python para Data Science'
  ];

  const suggestedTags = [
    '#react', '#javascript', '#frontend', '#backend', '#design', 
    '#ux', '#ui', '#nodejs', '#python', '#machinelearning'
  ];

  const handleSubmit = () => {
    if (!postData.content.trim()) return;

    const newPost = {
      id: Date.now(),
      author: 'João Silva',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      time: 'agora',
      content: postData.content,
      course: postData.course,
      type: postData.type,
      likes: 0,
      comments: 0,
      shares: 0,
      tags: postData.tags
    };

    onCreatePost(newPost);
    setPostData({
      content: '',
      type: 'achievement',
      course: '',
      tags: [],
      privacy: 'public'
    });
    onClose();
  };

  const addTag = (tag: string) => {
    if (!postData.tags.includes(tag)) {
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tag: string) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar nova publicação</DialogTitle>
          <DialogDescription>
            Compartilhe suas conquistas e conecte-se com outros profissionais
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm">João Silva</div>
              <Select value={postData.privacy} onValueChange={(value) => 
                setPostData(prev => ({ ...prev, privacy: value }))
              }>
                <SelectTrigger className="w-32 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">🌍 Público</SelectItem>
                  <SelectItem value="connections">👥 Conexões</SelectItem>
                  <SelectItem value="private">🔒 Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Post Type */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Tipo de publicação</label>
            <Select value={postData.type} onValueChange={(value) => 
              setPostData(prev => ({ ...prev, type: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="achievement">🏆 Conquista de curso</SelectItem>
                <SelectItem value="insight">💡 Insight profissional</SelectItem>
                <SelectItem value="project">🚀 Projeto pessoal</SelectItem>
                <SelectItem value="general">💬 Publicação geral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course Selection (if achievement) */}
          {postData.type === 'achievement' && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Curso concluído</label>
              <Select value={postData.course} onValueChange={(value) => 
                setPostData(prev => ({ ...prev, course: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Conteúdo da publicação</label>
            <Textarea
              placeholder={
                postData.type === 'achievement' 
                  ? "Compartilhe o que você aprendeu e como foi sua experiência..."
                  : "O que você gostaria de compartilhar?"
              }
              value={postData.content}
              onChange={(e) => setPostData(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
            />
            <div className="text-right text-xs text-muted-foreground">
              {postData.content.length}/500 caracteres
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {postData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.filter(tag => !postData.tags.includes(tag)).slice(0, 6).map(tag => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-2 py-1 rounded"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Media Options */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Adicionar mídia (em breve)</label>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" disabled className="justify-start">
                <ImageIcon className="w-4 h-4 mr-2" />
                Imagem
              </Button>
              <Button variant="outline" size="sm" disabled className="justify-start">
                <Video className="w-4 h-4 mr-2" />
                Vídeo
              </Button>
              <Button variant="outline" size="sm" disabled className="justify-start">
                <Link className="w-4 h-4 mr-2" />
                Link
              </Button>
            </div>
          </div>

          {/* Preview */}
          {postData.content && (
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-muted-foreground">Preview da publicação:</div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm text-foreground">João Silva</div>
                    <div className="text-xs text-muted-foreground">agora</div>
                  </div>
                  {postData.course && (
                    <Badge variant="outline" className="text-xs ml-auto">
                      <Trophy className="w-3 h-3 mr-1" />
                      {postData.course}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground">{postData.content}</p>
                {postData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {postData.tags.map(tag => (
                      <span key={tag} className="text-xs text-blue-600 dark:text-blue-400">{tag}</span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!postData.content.trim()}
          >
            <Send className="w-4 h-4 mr-2" />
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}