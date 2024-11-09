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
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.nodeForm = this.fb.group({
      nodeData: ['', Validators.required]  // Chave correta para os dados do formulário
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.nodeForm.valid) {
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;

      // Enviar os dados para a API
      this.http.post<NodeResponse>('https://vercel-luxc.vercel.app/api/nodes', this.nodeForm.value).subscribe({
        next: (response) => {
          console.log('Node data submitted', response);
          this.successMessage = response.message;  // Mensagem de sucesso
          this.isLoading = false;
          this.nodeForm.reset();
        },
        error: (error) => {
          console.error('Error submitting node data', error);
          this.errorMessage = 'Erro ao enviar os dados. Tente novamente mais tarde.';  // Mensagem de erro
          this.isLoading = false;
        }
      }); 
    } else {
      // Caso o formulário não seja válido, adicione uma mensagem de erro
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }
}
