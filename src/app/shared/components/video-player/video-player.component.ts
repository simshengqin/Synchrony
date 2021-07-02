import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('video') video: ElementRef;
  constructor() { }
  ngOnInit(): void {
  }

  loadVideo(videoInput: ElementRef) {
    const file = videoInput.nativeElement.files.item(0);
    this.video.nativeElement.src = URL.createObjectURL(file);
  }
}
