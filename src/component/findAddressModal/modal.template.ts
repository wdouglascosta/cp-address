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

    constructor(scope) {
    }

    searchCity(newValue) {
        console.log(newValue)
        AddressService.getFromApi('http://45.33.100.20/services-api/public/buscar-cidades?uf=' + newValue).then((resp) => {
            this.cities = resp; //TODO utilizar uma constante para a url
            // this.city = resp[0]
        });
    }

    // searchStreet(newValue) {
    //     AddressService.getFromApi('http://45.33.100.20/services-api/public/buscar-logradouros?uf=' + this.uf + '&cidade=' + newValue).then((resp) => {
            
    //         console.log(this.streets)
    //     })
    // }

    searchFullAddress(newValue){
        AddressService.getFromApi('http://45.33.100.20/services-api/public/buscar-endereco-completo?uf='+this.uf+'&cidade='+this.city+'&logradouro='+newValue)
        .then((resp) => {
            this.streets = resp;
            console.log(resp);
        })
    }

    private inputSearch(evt) {
        if (this.debounce) {
            clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(() => this.searchFullAddress(evt.target.value), 1000);
    }

    select(cep){
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