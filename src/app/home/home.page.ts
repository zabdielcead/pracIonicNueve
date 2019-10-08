import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  matches: string[];
  isRecording = false;
  constructor( private plt: Platform, private speechRecognition: SpeechRecognition,
               private cd: ChangeDetectorRef) {}

  isIos() {
    return this.plt.is('ios');
  }


  getPermission() {
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if (!hasPermission) {
          this.speechRecognition.requestPermission();
      }
    });
  }

  startListening() {
    const options = {
      language: 'es-MX'
     };
    this.speechRecognition.startListening(options).subscribe( matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  stopListening() {
    this.speechRecognition.stopListening().then( ( ) => {
        this.isRecording = false;
    });
  }

}
