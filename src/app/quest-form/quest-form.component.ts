import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../services/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quest-form',
  templateUrl: './quest-form.component.html',
  styleUrls: ['./quest-form.component.scss']
})
export class QuestFormComponent implements OnInit {

  questForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appServices: AppService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  get formControls() {
    return this.questForm.controls;
  }

  createLoginForm() {
    this.questForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.questForm.valid) {
      this.appServices.addQuest(this.questForm.value).subscribe(response => {
        this.questForm.reset();
        Swal.fire({
          title: 'Əməliyyat uğurla tamamlandı!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Bağla',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-medium btn-primary btn-width-small'
        },
        })
      });
    }
  }

}
