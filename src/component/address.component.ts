// import { Address } from './address.interface';

export class CapivaraAddress {
    public $constants;
    public $functions;
    public $bindings;
    private pessoas;
    private address: Object;

    constructor(){
    }
    
GetFromApi(url){
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", url, false);
    httpReq.send();
    console.log("resposta: " + httpReq.responseText)
    return httpReq.responseText;
}

    buscaCep(address){
        if(address && address.cep){

            this.autoFill(this.GetFromApi('http://45.33.100.20/services-api/public/busca-cep/' + address.cep) )//TODO utilizar uma constante para a url
            
        }
     
    };
    autoFill(addressFound){
        this.address = addressFound;
        console.log(addressFound)
    }
}