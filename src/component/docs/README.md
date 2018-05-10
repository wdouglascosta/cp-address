
# Introdução

O capivara-address é um componente CapivaraJS.
É um componente que contém um form de endereço padrão brasileiro.
Possui integração com uma API para busca de endereço por CEP, bem como pesquisa de CEP por logradouro.

---

# Instalação

## \# CDN
Recomendamos vincular a um número de versão específico que você possa atualizar manualmente, porém no exemplo iremos utilizar a ultima versão disponível.

```html
<!-- Stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/ .min.css">

<!-- Component -->
<script src="https://unpkg.com/ .min.js"></script>
```
Certifique-se de ler sobre as diferentes construções e use a produção, substituindo os arquivos .js por .min.js. Esta é uma compilação otimizada para velocidade em vez de experiência de desenvolvimento.

## NPM

O NPM é o método de instalação recomendado ao criar aplicativos de grande escala. Ele combina muito bem com bundlers de módulo, como Webpack ou Browserify.

```shell
$ npm install cp-address --save
```

Após a instalação, precisamos importar o componente no projeto, o componente é feito utilizando **typescript** então é necessário configurar o **ts-loader** no arquivo do configuração do seu **webpack**. Exemplo:

```javascript
module.exports = {
  ...
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}
```

# Instância do componente

Se chegamos até aqui, provavelmente a instalação foi finalizada êxito, isso significa que já podemos utilizar o cp-address.
Vamos agora criar uma nova instância do componente, primeiro faça a declaração no HTML dando um **alias** para essa instância no exemplo usaremos o alias **exampleAddress**.

```html
<div class="col-md-6">
    <cp-address cp-model="$ctrl.address.endereco"></cp-address>
</div>
```

Depois de declarar o componente no HTML precisamos inicializa-lo, nesse momento é possível passar alguns parâmetros caso julgarmos necessário.
Na inicialização do componente, precisar informar o contexto que será aplicado o valor. Exemplo:
```javascript
class MyController {
    constructor() {
      this.address = {
        endereco: {}, algumacoisa: 'bacon';
      }
    }
}

capivara.controller(document.body, MyController);
```

Exemplo em CapivaraJS - [Jsfiddle](https://jsfiddle.net/t0b8xxfj/6/).

Exemplo em Angular.js - [Jsfiddle](https://jsfiddle.net/t0b8xxfj/8/).

Exemplo em Angular - [Jsfiddle](https://jsfiddle.net/1hk7knwq/3584/).

Exemplo em Vue.js - [Jsfiddle](http://jsfiddle.net/td4v7qqd/61/).

Exemplo em React - [Jsfiddle](http://jsfiddle.net/td4v7qqd/62/).



------
# Configuração

O componente aceita algumas constantes que permitem parametrizar os campos. Podemos ocultar campos e torná-los obrigatórios individualmente.

Você pode ver esse exemplo no [Jsfiddle](https://jsfiddle.net/xfnkp3no/15/)

```javascript
class MyController {
  constructor() {
    this.pessoa = {
      foto: 'https://goo.gl/SYn4yp'
    }
  }

  $onInit() {
    const config = {
      crop: {
        viewport: {
          width: 50,
          height: 250
        }
      }
    };
    capivara.componentBuilder('exampleCrop').then((instance) => {
      instance.constants(config).build();
    });
  }

}

capivara.controller(document.body, MyController);

```
## Objeto de config
| Atributo              | Tipo    | Descrição                                  |
|-----------------------|---------|--------------------------------------------|
| lang                  | string  | Linguagem (padrão: pt-br)                  |
| hidden-zip            | boolean | Ocultar campo CEP                          |
| required-zip          | boolean | CEP não pode ser vazio                     |
| hidden-country        | boolean | Ocultar campo País                         |
| required-country      | boolean | País não pode ser vazio                    |
| hidden-street         | boolean | Ocultar campo Logradouro                   |
| required-street       | boolean | Logradouro não pode ser vazio              |
| hidden-information    | boolean | Ocultar campo Complemento                  |
| required-information  | boolean | Complemento não pode ser vazio             |
| hidden-number         | boolean | Ocultar campo Número                       |
| required-number       | boolean | Número não pode ser vazio                  |
| hidden-neighborhood   | boolean | Ocultar campo Bairro                       |
| required-neighborhood | boolean | Bairro não pode ser vazio                  |
| hidden-city           | boolean | Ocultar campo Cidade                       |
| required-city         | boolean | Cidade não pode ser vazio                  |
| hidden-uf             | boolean | Ocultar campo Estado                       |
| required-uf           | boolean | Estado não pode ser vazio                  |
| hidden-city-code      | boolean | Ocultar campo Cód. Municipal IBGE          |
| required-city-code    | boolean | Cód. Municipal IBGE não pode ser vazio     |
| hidden-state-code     | boolean | Ocultar campo Cód. Estadual IBGE           |
| required-state-code   | boolean | Cód. Estadual IBGE não pode ser vazio      |
| hidden-coordinates    | boolean | Ocultar campos de Coordenadas              |
| required-coordinates  | boolean | Campos de Coordenadas não podem ser vazios |

## CropConfig

Veja esse exemplo no [Jsfiddle](https://jsfiddle.net/xfnkp3no/20/) que demostramos como deixar o resize livre e o zoom infinito.

| Atributo: Default      | Tipo          | Descrição |
| ------------- |:-------------:| -----:|
| customClass: ''   | string | Uma classe de sua escolha para adicionar ao contêiner para adicionar estilos personalizados. |
| enableOrientation: false      | boolean | Ativar ou desativar o suporte a orientação personalizada.  |
| enableResize: false      | boolean | Ativar ou desativar o suporte para redimensionar a área da janela de visualização. |
| enableZoom: true      | boolean | Ative a funcionalidade de zoom. Se definido como falso, a rolagem não aumentariam. |
| enforceBoundary: true      | boolean | Restringe o zoom, de modo que a imagem não pode ser menor que a viewport. |
| showZoomer: true      | boolean | Ocultar ou Mostrar o controle deslizante de zoom. |
| viewport: object      | ViewPortConfig | Configuração da parte visível da imagem. |

## ViewPortConfig
| Atributo: Default      | Tipo          | Descrição |
| ------------- |:-------------:| -----:|
| width: 170px      | string | Define a largura da área de recorte. |
| height: 170px      | string | Define a altura da área de recorte. |
| type: square/circle      | string | Define a a imagem será recortada em circulo ou quadrado. |

## DriveConfig
| Atributo      | Tipo          | Descrição |
| ------------- |:-------------:| -----:|
| apiKey      | string | Define a chave da api do google. |
| clientId      | string | Define o id do cliente google. |

------
# Integração com google drive

Você pode permitir que seu usuário sincronize as imagens do google drive com o componente, permitindo que ele faça troca das imagens com mais praticidade. Caso você queira utilizar essa funcionalidade, siga as instruções abaixo: 

* 1 - Acesse [Google console](https://console.developers.google.com/apis/api/drive.googleapis.com?project=_) e selecione ou crie seu projeto. 
* 2 - Após selecionar seu projeto, clique em Ativar na tela de consentimento. 
* 3 - Com o serviço Google Drive API ativo, vá até a guia Credenciais e crie uma credencial do tipo **Chave de API** e **ID do cliente OAuth**. 

Obs: Quando estiver criando o **ID do cliente OAuth** certifique-se de colocar as URL de origens permitidas.

Veja no [Jsfiddle](https://jsfiddle.net/xfnkp3no/26/) como informar suas chaves.
