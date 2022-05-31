import { Component, OnInit } from '@angular/core';
import { SocketService as SocketService } from '../service/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  status = false;
  messages: Array<string> = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.openConnection();
  }

  protected openConnection(): void {
    this.socketService.open();
    this.status = true;
    this.listen();
  }

  protected listen(): void {
    this.socketService
        .listen()
        .subscribe(m => {
          this.messages.push(m);
        });
  }

  protected sendMessage(message: string): void {
    this.socketService.sendMessage(message);
  }

}
