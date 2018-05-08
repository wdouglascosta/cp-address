/**
 * This component create a standard form to Brazilian Address
 * previse the search by the zip code
 *  @author Gumga IT
 */
import capivara from 'capivarajs';
import { Address } from './address.interface';
import { constants } from 'fs';
import { Masked } from './docs/masks'
import translate from './address.translate';
import { TIMEOUT } from 'dns';
import modalFindAddressTemplate from './findAddressModal/modal.template.html';
import { ModalFindAddressController } from './findAddressModal/modal.template';

export class CapivaraAddress {
    public $constants;
    public $functions;
    public $bindings;
    private address: Address;
    private element;
    private labels;
    private enableMaps = true;
    private buttonTitle;

    private modal = document.getElementsByClassName("cp-address-modal")

    constructor(scope) {
        this.element = scope.element;
        this.$constants = this.$constants || {};
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
        this.verifyEnableMaps();
    }

    verifyEnableMaps() {
        if (this.address &&
            this.address.streetType &&
            this.address.street &&
            this.address.neighborhood &&
            this.address.city) {
            this.enableMaps = false;
            this.buttonTitle = this.$constants.openMaps;
        } else {
            this.enableMaps = true;
            this.buttonTitle = this.$constants.btnFillAnAddress;
        }
    }

    /**
     * @method void verify if the form is valid, considering 
     * the invalid data and required fields empty
     */
    verifyValidForm() {
        if (this.element.querySelectorAll('input.cp-input.cp-invalid-required, select.cp-input.cp-invalid-required, input.cp-field-error').length > 0) {
            this.element.classList.add('cp-invalid')
        } else {
            this.element.classList.remove('cp-invalid')
        }
    }
    /**
     * 
     * @method return Promisse with the answer from a HTTP request
     * This method is asynchronous
     * resp: contains the JSON with the response text of the request
     * rej: contains the JSON with the status text of the request
     * @param url 
     */
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

    /**
     * @method void
     * Makes the search of the zip code in a external API;
     * Verify if the lenght data corresponds with a brazilian zip code;
     * @param   
     */
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

    private formatAddress() {
        var formattedAddress = 'empty';

        return formattedAddress;
    }

    /**
     * @method void
     * The address retourned by zip code contains a generic geografic coordinates, without
     * consider the number, this method makes one more request looking for more accurated coordinates
     * considering the number.
     * If the search returns a valid data, the fields of coordinates are updated
     * 
     */
    searchAccuratedCoords() {
        var formattedAddress = '';
        if (this.address &&
            this.address.streetType &&
            this.address.street &&
            this.address.neighborhood &&
            this.address.uf) {
            if (!this.address.number) {
                this.address.number = '';
            }
            formattedAddress = `${this.address.streetType} ${this.address.street}, ${this.address.number} ${this.address.neighborhood} ${this.address.city}`;
        }
        if (formattedAddress != '') {
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
     * @method void 
     * Fill the address data with the object found 
     * @param addressFound string - Object found from the search by zip code
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
    /**
     * @method void
     * this method get all inputs and look for the first empty
     * Give the focus to it
     * It's called after the auto fill of data from zip code search
     * and always that some input have focus and the key "Enter" is pressionated 
     */
    focusFirstInputEmpty() {
        const inputToFocus: any = Array.from(this.element.querySelectorAll('input.cp-input')).filter((input: any) => input.value == '')[0];
        if (inputToFocus) {
            inputToFocus.focus();
        }
    }

    openMaps() {
        if (!this.enableMaps) {

            var formattedAddress = `${this.address.streetType} ${this.address.street}${this.address.number}, ${this.address.city}`
            var maps = 'https://www.google.com.br/maps/place/' + formattedAddress;
            window.open(maps);
        }
    }


    createModal(config) {
        const ModalInstance = function (instanceConfig) {
            const modal = document.createElement('div');
            modal.innerHTML = modalFindAddressTemplate;
            modal.classList.add('cp-address-modal');
            document.body.appendChild(modal);

            const close = (...args) => {
                window.removeEventListener('keyup', onKeyPress);
                document.body.removeChild(modal);
                if (this.onClose) {
                    this.onClose(...args);
                }
            }

            const ok = (...args) => {
                close(...args);
                if (this.onOK) {
                    this.onOK(...args);
                }
            };

            const onKeyPress = (evt) => {
                if (evt.keyCode === 27) {
                    close();
                }
            };

            if (config.keyboard) {
                window.addEventListener('keyup', onKeyPress);
            };


            capivara.controller(modal, ModalFindAddressController);

            if (modal['$scope'].scope.$ctrl.modalParams) {
                config.params.modalInstance = this;
                modal['$scope'].scope.$ctrl.modalParams(config.params);
            }


            this.close = close;
            this.ok = ok;

        };
        return new ModalInstance(config);
    }

    openModal(){
        const modalInstance = this.createModal({
            keyboard: true,
            params: Object.assign(this.$constants, this.labels)
        })
    }
}