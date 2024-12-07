import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem, IonButton, IonInput, IonList, IonIcon } from '@ionic/angular/standalone';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonInput, IonButton, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProdutosPage implements OnInit {

  public produto: { nome: string, preco: number } = { nome: '', preco: 0 };
  public produtos: { id: string, title: string, price: number }[] = [];

  private toast = inject(ToastController)
  private service = inject(ProdutoService);

  ngOnInit(): void {
    this.carregarProdutos();
  }

  public async salvarProduto() {
    this.service.create(this.produto).subscribe({
      next: async () => {
        const toast = await this.toast.create({
          message: 'Produto salvo com sucesso!',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.produto = { nome: '', preco: 0 };
      },
      error: async () => {
        const toast = await this.toast.create({
          message: 'Erro ao salvar produto!',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }});
  }

  public async carregarProdutos() {
    this.service.read().subscribe({
      next: (data) => this.produtos = data.products,
      error: async () => {
        const toast = await this.toast.create({
          message: 'Erro ao carregar produtos!',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }});
  }

}
