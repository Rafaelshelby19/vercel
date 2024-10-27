import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface NodeResponse {
  message: string;
  data?: any; // Define a resposta esperada do servidor
}

@Component({
  selector: 'app-fruta',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './fruta.component.html',
  styleUrls: ['./fruta.component.css']
})
export class FrutaComponent implements OnInit {
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
      this.http.post<NodeResponse>('https://node.t.vercel.app/api/nodes', this.nodeForm.value).subscribe({
        next: (response) => {
          console.log('Node data submitted', response);
          this.isLoading = false;
          this.nodeForm.reset();
        },
        error: (error) => {
          console.error('Error submitting node data', error);
          this.isLoading = false;
        }
      });
    }
  }
}
