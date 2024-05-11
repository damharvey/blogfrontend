import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PatientService } from '../../../_service/patient.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'] // Corrected property name to styleUrls
})

export class PatientComponent implements OnInit {
  addpatientForm: FormGroup;
  filterForm: FormGroup;
  data: any; 
  _id: number = 0;

  @Output() filterChanged = new EventEmitter<any>();
  @Output() event = new EventEmitter<{ action: string }>();
  
  constructor(
    private _patientService: PatientService,
    private _fb: FormBuilder 
    
  ) {
    this.addpatientForm = this._fb.group({ 
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      city: [''],
      status: [''],
    });
 
    
      this.filterForm = this._fb.group({
      pageNumber: ['1'],
      pageSize: ['10'],
      filterFirst: [''],
      filterLast: [''],
      filterActive: [true],
      filterCity: [''],
    });
  }

  isEditMode: boolean = false;

  async ngOnInit(): Promise<void> { 
    this.refreshdata();
  }


  async submitAddPatient() {
    console.log(this.addpatientForm)
    if (this.addpatientForm.invalid) {
      return;
    }
    if (this.isEditMode) {
      await this._patientService.updatePatient(this._id, this.addpatientForm.value);
      this.refreshdata();
    } else {
      await this._patientService.addPatient(this.addpatientForm.value);
      this.event.emit({ action: 'add' });
      this.refreshdata();
    }
    this.addpatientForm.patchValue({
      firstname: '',
      lastname: '',
      city: '',
      status: true
    });
  }


  async deletePatient(id:number) {
    await this._patientService.deletePatient(id);
    this.refreshdata();
  }

  async applyFilter() {
    this.filterChanged.emit(this.filterForm.value);
    this.data = await this._patientService.getPagePatient(this.filterForm.value)
  }

 async refreshdata() {
   this.data = await this._patientService.getAll();
   this.isEditMode = false;
  }

  editPatient(patient: any) {
    this.isEditMode = true;
    
    this._id = Number(patient.id);
    this.addpatientForm.patchValue({
      firstname: patient.firstName,
      lastname: patient.lastName,
      city: patient.city,
      status: true
    });
    this.event.emit({ action: 'update' });
  }
}
