import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import videojs from 'video.js';
//import currentTime from 'video.js';


@Component({
  selector: 'app-timed-player',
  templateUrl: './timed-player.component.html',
  styleUrls: ['./timed-player.component.scss'],
})
export class TimedPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('target', {static: true}) target: ElementRef;

  @Input() options: {
    fluid: boolean;
    aspectRatio: string;
    autoplay: boolean;
    sources: {
        src: string;
        type: string;
    }[];
  };
  player: videojs.Player;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.player = this.initPlayer();
  }

  // Dispose the player OnDestroy
  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  public setTime(time: number): void {
    this.player.currentTime(time);
  }

  public getTime(): number {
    return this.player.currentTime();
  }

  protected initPlayer(): void {
    return videojs( this.target.nativeElement,
                    this.options,
                    onPlayerReady => {
                      console.log('onPlayerReady', this);
                    });
  }
}
