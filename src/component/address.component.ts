import { Address } from './address.interface';
import { constants } from 'fs';

export class CapivaraAddress {
    public $constants;
    public $functions;
    public $bindings;

    private pessoas;
    private address: Address;

    constructor() {
    }
    
    $onInit() {
        console.log(this.$constants.hiddenCep)
    }

    getFromApi(url) {
        var httpReq = new XMLHttpRequest();
        httpReq.open("GET", url, false);
        httpReq.send();
        return httpReq.responseText;
    }

    buscaCep(address) {
        if (address && address.cep) {
            this.autoFill(this.getFromApi('http://45.33.100.20/services-api/public/busca-cep/' + address.cep))//TODO utilizar uma constante para a url
        }
    }

    autoFill(addressFound) {
        let parsed = JSON.parse(addressFound);
        console.log(parsed)
        this.address = {
            uf: parsed.uf,
            street: parsed.logradouro,
            cep: this.address.cep,
            ufCode: parsed.ibge_cod_uf,
            city: parsed.cidade,
            ibgecode: parsed.ibge_cod_cidade,
            neighborhood: parsed.bairro,
            streetType: parsed.tipo_logradouro,
            number: null,
            information: null,
            latitude: parsed.latitude,
            longitude: parsed.longitude
        };
    }

}