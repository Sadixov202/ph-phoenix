import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../services/app/app.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-quest-form',
  templateUrl: './quest-form.component.html',
  styleUrls: ['./quest-form.component.scss']
})
export class QuestFormComponent implements OnInit {

  @ViewChild(LottieComponent) lottie: LottieComponent | undefined;
  animationItem: AnimationItem | undefined; // Animasyonu kontrol etmek için değişken
  isPlaying: boolean = false; // Animasyonun oynayıp oynamadığını takip etmek için

  questForm!: FormGroup;
  videoURl = '';
  options: AnimationOptions = {
    path: 'assets/final-hand.json',
    autoplay: false // Otomatik başlamayı devre dışı bırak
  };

  constructor(
    private fb: FormBuilder,
    private appServices: AppService
  ) { }

  ngOnInit() {
    this.videoURl = 'https://customer-jo5phtbhu7hihx5u.cloudflarestream.com/a7c6c1da328c3556e1acfd7ef0ed1688/downloads/default.mp4'
    this.createLoginForm();
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem; // AnimationItem değişkenini kaydet
    this.animationItem.stop(); // İlk açılışta durdur
  }

  toggleAnimation() {
    this.isPlaying = true;
    
    if (this.animationItem) {
      this.animationItem.play();
  
      setTimeout(() => {
        this.submit();
        this.animationItem?.stop();
      }, 2000);

    }

  }

  get formControls() {
    return this.questForm.controls;
  }

  createLoginForm() {
    this.questForm = this.fb.group({
      name: ['Cavid', Validators.required],
      surname: ['Sadixov', [Validators.required]],
    });
  }

  submit() {
    if (this.questForm.valid) {
      this.appServices.addQuest(this.questForm.value).subscribe(response => {
        this.isPlaying = false;
        Swal.fire({
          title: 'Əməliyyat uğurla tamamlandı!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'BAĞLA',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'form-button theme-dark'
          },
        })
      });
    }
  }




}

document.addEventListener("gesturestart", function (event) {
  event.preventDefault();
});

document.addEventListener("wheel", function (event) {
  if (event.ctrlKey) {
    event.preventDefault();
  }
}, { passive: false });