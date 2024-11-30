Este é um projeto de galeria de fotos desenvolvido com Ionic, Angular e Capacitor. O aplicativo permite capturar, salvar e visualizar imagens em uma galeria.

## Demonstração

https://github.com/user-attachments/assets/f35b5a2a-1f9e-4e97-9f35-8785c8b6c28b



## Dependências

- @capacitor/camera
- @capacitor/filesystem
- @capacitor/preferences

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/galeria-fotos.git
    cd galeria-fotos
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Instale as dependências do Capacitor:
    ```sh
    npm install @capacitor/camera @capacitor/filesystem @capacitor/preferences
    ```

4. Adicione as permissões necessárias no `AndroidManifest.xml`

    ```xml
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    ```

5. Sincronize o projeto com o Android:
    ```sh
    npx cap sync
    ```

## Executando o Projeto

Para executar o projeto em um servidor de desenvolvimento, use:
```sh
npx ionic serve
```

Ou para execução em emulador Android
```sh
npx ionic capacitor run android --external --livereload
```

## Estrutura de Arquivos Importantes

- `home.page.ts`: Implementação da página principal da galeria.
- `captura-imagem.page.ts`: Implementação da página de captura de imagem.
- `galeria.service.ts`: Serviço para gerenciar as imagens da galeria.
- `AndroidManifest.xml`: Configurações do Android, incluindo permissões.

## Notas

- Antes de testar, lembre-se de realizar o sync com o Capacitor:
```sh
npx cap sync
```
