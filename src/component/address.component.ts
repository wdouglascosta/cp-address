import { Address } from './address.interface';
import { constants } from 'fs';
import { Masked } from './docs/masks'
import translate from './address.translate';

export class CapivaraAddress {
    public $constants;
    public $functions;
    public $bindings;

    private pessoas;
    private address: Address;
    private element;
    private labels;
    private ativo;

    constructor(scope) {
        this.element = scope.element;
    }

    $onViewInit() {
        Masked.maskerField(this.element.querySelector('input.cp-address-cep'));
    }

    $onInit() {
        this.address = this.address || {};
        this.$constants.hiddenCodes = this.$constants.hiddenStateCode && this.$constants.hiddenCityCode;
        this.labels = translate[this.$constants.lang] || translate['pt-br'];
    }

    getFromApi(url) {
        var httpReq = new XMLHttpRequest();
        httpReq.open("GET", url, false);
        httpReq.send();
        return httpReq.responseText;
    }

    buscaCep($event) {
        this.address.cep = $event.target.value;
        if (this.address && this.address.cep && this.address.cep.length == 9) {
            this.autoFill(this.getFromApi('http://45.33.100.20/services-api/public/busca-cep/' + this.address.cep))//TODO utilizar uma constante para a url
        } else {
            delete this.address.cep;
        }
    }

    autoFill(addressFound) {
        let parsed = JSON.parse(addressFound);
        if (parsed.resultado == "0") {
            this.element.querySelector('input.cp-address-cep').classList.add('cp-field-error')
        } else {
            this.element.querySelector('input.cp-address-cep').classList.remove('cp-field-error')
            this.address.city = parsed.cidade || this.address.city;
            this.address.uf = parsed.uf || this.address.uf;
            this.address.ufCode = parsed.ibge_cod_uf || this.address.ufCode;
            this.address.ibgecode = parsed.ibge_cod_cidade || this.address.ibgecode;
            this.address.latitude = parsed.latitude || this.address.latitude;
            this.address.longitude = parsed.longitude || this.address.longitude;
            this.address.streetType = parsed.tipo_logradouro || this.address.streetType;
            this.address.street = parsed.logradouro || this.address.street;
            this.address.neighborhood = parsed.bairro || this.address.neighborhood;
        }

    }

}