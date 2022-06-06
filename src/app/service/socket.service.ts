import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import * as SocketIOServer from 'socket.io';
import * as SocketIOClient from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socketId: string;
  private socketClient: SocketIOClient.Socket;
  constructor() {}

  open(): void {
    this.socketClient = SocketIOClient.io(environment.wsUrl);
    this.setSocketId(this.socketClient.id);
  }

  listen(eventName): Observable<any> {
    return new Observable(o => {
      this.socketClient.on(eventName, (data) => {
        console.log('Received message from Websocket Server');
        o.next(data);
      });
    });
  }

  sendMessage(message: string): void {
    this.socketClient.emit('message', message);
  }

  sendTimePlayer(time: number, socketId): void {
    this.socketClient.emit('timePlayer', {time, socketId});
  }

  sendRequestTimeSync(): void {
    this.socketClient.emit('requestedTimeVideoSync');
  }

  getSocketid(): string {
    return this.socketId;
  }

  private setSocketId(socketId: string): void {
    this.socketId = socketId;
  }

}
