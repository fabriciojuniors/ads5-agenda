import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {cameraOutline, saveOutline} from 'ionicons/icons';
import { ModalController, ActionSheetController } from '@ionic/angular/standalone';
import { CapturaImagemPage } from '../components/captura-imagem/captura-imagem.page';
import { GaleriaService } from '../services/galeria.service';
import { DatePipe } from '@angular/common';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonImg, IonItem, IonList, IonIcon, IonFabButton, IonFab, IonHeader, IonToolbar, IonTitle, IonContent, DatePipe],
})
export class HomePage implements OnInit {

  private modalController = inject(ModalController);
  private actionController = inject(ActionSheetController);
  private galeria = inject(GaleriaService);

  public galeriaImagens: any[] = [];

  constructor() {
    addIcons({cameraOutline, saveOutline});
  }

  ngOnInit(): void {
    this.obterImagens()
  }

  public async openCaptura() {
    const modal = await this.modalController.create({
      component: CapturaImagemPage,      
      initialBreakpoint: 0.95,
      breakpoints: [0.95, 1]
    });

    modal.onDidDismiss().then(() => {
      this.obterImagens();
    })

    modal.present();
  }

  public async obterImagens() {
    const dados = await this.galeria.obterImagens();
    const imagens: any[] = [];
    
    dados.forEach(async (item: any) => {
      const foto = await Filesystem.readFile({
        path: item.nomeImagem,
        directory: Directory.Data,
      })

      imagens.push({
        ...item,
        imagem: `data:image/png;base64,${foto.data}`,
      })
    })

    this.galeriaImagens = imagens;
  }

  public async lerImagem(imagem: any) {
    const foto = await Filesystem.readFile({
      path: imagem.nomeImagem as string,
      directory: Directory.Data,
    })

    return foto.data
  }

  public async abrirAcoes(dado: any) {
    const action = await this.actionController.create({
      header: 'Opções',
      buttons: [{text: 'Excluir momento', handler: () => {this.excluirImagem(dado)}},
        {text: 'Cancelar', role: 'cancel'}
      ]
    })

    action.present();
  }

  private async excluirImagem(dado: any) {
    await Filesystem.deleteFile({
      path: dado.nomeImagem,
      directory: Directory.Data,
    })

    delete dado.imagem;

    this.galeria.removerImagem(dado);
    this.obterImagens();
  }
}
