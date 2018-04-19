import * as Masker from 'maskerjs'

export namespace Masked {

    const cepMask = new Masker([
        '_____-___'
    ],
        /^[0-9]$/ //allowed chars
    );

    export function maskerField(element) {
        return cepMask.mask(element);
    }

}