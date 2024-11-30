import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  public async adicionarImagem(dados: any) {
    const imagensResponse = await Preferences.get({key: 'galeria'})
    const imagens = JSON.parse(imagensResponse.value || '[]') as any[];

    imagens.push(dados);

    await Preferences.set({key: 'galeria', value: JSON.stringify(imagens)});
  }

  public async removerImagem(dado: any) {
    const imagensResponse = await Preferences.get({key: 'galeria'})
    const imagens = JSON.parse(imagensResponse.value || '[]') as any[];
    const imagensAtualizados = imagens.filter((item) => item.nomeImagem != dado.nomeImagem);

    await Preferences.set({key: 'galeria', value: JSON.stringify(imagensAtualizados)});
  }

  public async obterImagens(): Promise<[]> {
    const imagensResponse = await Preferences.get({key: 'galeria'})
    return JSON.parse(imagensResponse.value || '[]') as [];
  }
}
