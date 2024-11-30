import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButton, IonIcon, ModalController, IonTextarea, IonItem } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { GaleriaService } from 'src/app/services/galeria.service';

@Component({
  selector: 'app-captura-imagem',
  templateUrl: './captura-imagem.page.html',
  styleUrls: ['./captura-imagem.page.scss'],
  standalone: true,
  imports: [IonItem, IonTextarea, IonIcon, IonButton, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CapturaImagemPage implements AfterViewInit {
  
  private galeria = inject(GaleriaService);
  private modalController = inject(ModalController);

  public texto: string = '';
  public foto: Photo | null = null;

  ngAfterViewInit(): void {
    this.realizarCaptura();
  }

  public async realizarCaptura() {
    if (await this.isPermissaoConcedida()) {
      const foto = await Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 90,
        resultType: CameraResultType.Base64,
      });

      this.foto = foto;
    } else {
      await Camera.requestPermissions({permissions: ["camera", "photos"]});
      if (await this.isPermissaoConcedida()) {
        this.realizarCaptura();
      }
    }
  }

  public async salvarImagem() {
    if (this.foto && this.foto.base64String) {
      const nomeArquivo = new Date().getTime() + '.jpeg';
      try {
        const salvo = await Filesystem.writeFile({
          directory: Directory.Data,
          path: nomeArquivo,
          data: this.foto.base64String,
        })
  
        if (salvo) {
          this.galeria.adicionarImagem({
            nomeImagem: nomeArquivo,
            texto: this.texto,
            dataHora: new Date().toISOString(),
            pasta: Directory.Data,
          });
        }
      } catch(err) {
        alert('Erro ao salvar imagem: ' + err);
      }
    }
    this.modalController.dismiss();
  }

  private async isPermissaoConcedida() {
    const permissao = await Camera.checkPermissions();
    return permissao.camera == 'granted' || permissao.photos == 'granted';
  }

}
