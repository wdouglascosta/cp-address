import '../../index.scss';
import { AddressService } from '../address.service';

export class ModalFindAddressController {

    private nome: string;
    private params;
    private cities;
    private uf = "";
    private city = "";
    private streets = "";
    private street = "";
    private debounce;
    private lookingForAddress = false;
    private emptyResult = false

    constructor(scope) {
    }

    searchCity(newValue) {
        AddressService.getFromApi('http://45.33.100.20/services-api/public/buscar-cidades?uf=' + newValue).then((resp) => {
            this.cities = resp;
        });
    }

    searchFullAddress(newValue) {
        this.emptyResult = false;
        this.lookingForAddress = true;
        AddressService.getFromApi('http://45.33.100.20/services-api/public/buscar-endereco-completo?uf=' + this.uf + '&cidade=' + this.city + '&logradouro=' + newValue)
            .then((resp) => {
                this.streets = resp;
                this.lookingForAddress = false;
                if (this.streets.length == 0) {
                    this.emptyResult = true;
                }
            });
    }

    private inputSearch(evt) {
        if (this.debounce) {
            clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(() => this.searchFullAddress(evt.target.value), 1000);
    }

    select(cep) {
        this.params.modalInstance.close(cep);
    }

    modalParams(params) {
        this.params = params;
    }

    $onViewInit() {

    }

    $onChanges() {
    }

}