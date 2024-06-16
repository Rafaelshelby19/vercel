import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface NodeResponse {
  message: string;
  data: any;
}

@Component({
  selector: 'app-frutas',
  templateUrl: './frutas.component.html',
  styleUrls: ['./frutas.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule]  // Corrigido para incluir HttpClientModule corretamente
})
export class FrutasComponent implements OnInit {
  nodeForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.nodeForm = this.fb.group({
      nodeData: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.nodeForm.valid) {
      this.isLoading = true;
      this.http.post<NodeResponse>('https://banco-de-dados-phi.vercel.app/api/nodes', this.nodeForm.value).subscribe({
        next: (response) => {
          console.log('Node data submitted', response);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro:', error);
          this.isLoading = false;
        }
      });
    }
  }
}
