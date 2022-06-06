import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService as SocketService } from '../service/socket.service';
import { TimedPlayerComponent } from '../timed-player/timed-player.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(TimedPlayerComponent) timedPlayer: TimedPlayerComponent;

  status = false;
  messages: Array<string> = [];

  url = '/assets/video.mp4';

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.openConnection();
  }

  protected openConnection(): void {
    this.socketService.open();
    this.status = true;
    this.listenMessage();
    this.listenTime();
  }

  protected listenTime(): void {
    this.socketService
        .listen('timePlayer')
        .subscribe(tP => {
          console.log('timePlayer: ', tP);
          this.sendTimePlayer();
        });
  }

  protected listenMessage(): void {
    this.socketService
        .listen('message')
        .subscribe(m => {
          this.messages.push(m);
        });
  }

  protected sendMessage(message: string): void {
    this.socketService.sendMessage(message);
  }

  protected sendTimePlayer(): void {
    this.socketService.sendTimePlayer(this.getTimePlayer());
  }

  private getTimePlayer(): number {
    return this.timedPlayer.getTime();
  }

  private syncPlayer(time: number): void {
    this.timedPlayer.setTime(time);
  }

}
