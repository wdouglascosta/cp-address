import * as Masker from 'maskerjs'

export namespace Masked {

    const cepMask = new Masker([
        '_____-___'
    ],
        /^[0-9]$/ //allowed chars
    );
/**
 * @method return element
 * put the mask in the element received
 * the mask is the format of brazilian zip code
 * @param element object (field) to add the cep mask
 */
    export function maskerField(element) {
        return cepMask.mask(element);
    }

}