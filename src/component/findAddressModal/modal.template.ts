import '../../index.scss';

export class ModalFindAddressController {

    private nome: string;
    private params;

    constructor(scope) {
    }

    test() {
        console.log("é nois")
    }

    modalParams(params) {
        this.params = params;
        console.log(params)
    }

    $onViewInit(){

    }

}