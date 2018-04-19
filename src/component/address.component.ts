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

    $onChanges() {
        this.verifyValidForm();
    }

    /**
     * @method void 
     */
    verifyValidForm() {
        if (this.element.querySelectorAll('input.cp-input.cp-invalid-required, select.cp-input.cp-invalid-required, input.cp-field-error').length > 0) {
            this.element.classList.add('cp-invalid')
        } else {
            this.element.classList.remove('cp-invalid')
        }
    }

    getFromApi(url): Promise<any> {
        return new Promise((resp, rej) => {
            const httpReq = new XMLHttpRequest();
            httpReq.onload = () => {
                if (httpReq.status === 200) {
                    resp(JSON.parse(httpReq.responseText));
                } else {
                    rej(JSON.parse(httpReq.statusText));
                }
            }
            httpReq.open("GET", url, true);
            httpReq.send();
        });
    }

    searchZipCode($event) {
        this.address.cep = $event.target.value;
        if (this.address && this.address.cep && this.address.cep.length == 9) {
            this.getFromApi('http://45.33.100.20/services-api/public/busca-cep/' + this.address.cep).then((resp) => {
                this.autoFill(resp); //TODO utilizar uma constante para a url
            });
        } else {
            delete this.address.cep;
        }
    }

    searchAccuratedCoords(searchCoordsByNumer) {
        if (this.address.latitude && this.address.longitude) {
            const formattedAddress = `${this.address.streetType} ${this.address.street}, ${this.address.number} ${this.address.neighborhood} - ${this.address.uf} `;
            this.getFromApi('http://maps.google.com/maps/api/geocode/json?address=' + formattedAddress).then((resp) => {
                if ((resp.results.length > 0) && (resp.results[0].geometry.location)) {
                    const coords = resp.results[0].geometry.location;
                    if (coords.lat && coords.lng) {
                        this.address.latitude = coords.lat || this.address.latitude;
                        this.address.longitude = coords.lng || this.address.longitude;
                    }
                } 
            });
        }
    }

    /**
     * @method void Preenche os dados do endereço de acordo com o objeto retorno.
     * @param addressFound string - Objeto que a função de busca retorna 
     */
    autoFill(addressFound) {
        if (addressFound.resultado == "0") {
            this.element.querySelector('input.cp-address-cep').classList.add('cp-field-error')
        } else {
            this.element.querySelector('input.cp-address-cep').classList.remove('cp-field-error')
            this.address.city = addressFound.cidade || this.address.city;
            this.address.uf = addressFound.uf || this.address.uf;
            this.address.ufCode = addressFound.ibge_cod_uf || this.address.ufCode;
            this.address.ibgecode = addressFound.ibge_cod_cidade || this.address.ibgecode;
            this.address.latitude = addressFound.latitude || this.address.latitude;
            this.address.longitude = addressFound.longitude || this.address.longitude;
            this.address.streetType = addressFound.tipo_logradouro || this.address.streetType;
            this.address.street = addressFound.logradouro || this.address.street;
            this.address.neighborhood = addressFound.bairro || this.address.neighborhood;
            setTimeout(() => this.focusFirstInputEmpty(), 50);
        }
    }

    focusFirstInputEmpty() {
        const inputToFocus: any = Array.from(this.element.querySelectorAll('input.cp-input')).filter((input: any) => input.value == '')[0];
        if (inputToFocus) {
            inputToFocus.focus();
        }
    }

}