import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { Message, SocketService } from '../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  newMessage: string = '';
  roomId: string = Math.random().toString(36).substring(7)+'-'+Math.random().toString(36).substring(7)+'-'+Math.random().toString(36).substring(7);
  roomIdInput: string = '';
  showModal:boolean = false;
  showModalName:boolean = false;
  name: string = '';

  constructor(public chatService: SocketService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let params:any = this.route.snapshot.params;
    if (params?.admin) {
      this.showModal = true;
      return;
    }
    this.showModalName = true;
    this.chatService.setupSocketListeners(this.roomId, this.name)
  }

  setup(){
    this.showModal = false;
    this.roomId = this.roomIdInput;
    this.chatService.setupSocketListeners(this.roomIdInput, this.name)
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: Message = {
        text: this.newMessage,
        isSent: true,
        name: this.name
      };
      this.chatService.sendMessage(this.roomId, message);
      this.newMessage = '';
    }
  }

  async copyRoomId() {
    try {
      await navigator.clipboard.writeText(this.roomId||this.roomIdInput);
      alert('ID de sala copiado al portapapeles');
    } catch (err) {
      alert('Error al copiar el ID de sala, intenta nuevamente');
    }
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }
}
function useEffect(arg0: () => () => void) {
  throw new Error('Function not implemented.');
}

