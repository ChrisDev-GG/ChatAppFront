import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

export interface Message {
  text: string;
  isSent: boolean;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private apiUrl = environment.apiUrl;
  private lastMessageTime: number = 0;

  messagesSignal = signal<Message[]>([]);

  constructor(private http: HttpClient) {
    this.socket = io(environment.apiUrl);
  }

  setupSocketListeners(roomId: string, name: string): void {
    this.joinRoom(roomId);

    // Manejar mensajes previos
    this.socket.on('chat messages', (messages: { text: string, name: string }[]) => {
      const formattedMessages = messages.map(msg => ({
        text: msg.text,
        name: msg.name,
        isSent: msg.name === name
      }));
      this.messagesSignal.set(formattedMessages);
    });

    // Manejar nuevos mensajes
    this.socket.on('chat message', (message: string, senderName: string) => {
      // Verificar que no sea un mensaje duplicado
      const isDuplicate = this.messagesSignal().some(m =>
        m.text === message &&
        m.name === senderName &&
        Date.now() - this.lastMessageTime < 1000
      );

      if (!isDuplicate) {
        this.messagesSignal.update(messages => [...messages, {
          text: message,
          isSent: senderName === name,
          name: senderName
        }]);
      }
    });
  }


  sendMessage(roomId: string, message: Message): void {
    this.lastMessageTime = Date.now();

    // Añadir mensaje localmente
    this.messagesSignal.update(messages => [...messages, {
      ...message,
      isSent: true
    }]);

    // Enviar al servidor
    this.socket.emit('chat message', roomId, message.text, message.name);
  }

  joinRoom(roomId: string): void {
    this.socket.emit('join room', roomId);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
