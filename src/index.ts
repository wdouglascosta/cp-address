/* 
    Component created by capivara-cli https://capivarajs.github.io/
*/
import capivara from 'capivarajs';
import template from './component/address.template.html';
import style from './index.scss';
import { CapivaraAddress } from './component/address.component';

const Component = {
    /**
     * @name template
     * @description Applies the visual part of the component
     */
    template: template,
    /**
     * @name style
     * @description Import component style
     */
    style: style,
    /**
     * @name constants
     * @description Declares the constants that will be accepted by component. See https://capivarajs.github.io/components.html#constants
     */
    constants: [
        'lang',
        'hiddenZip',
        'requiredZip',
        'hiddenCountry',
        'requiredCountry',
        'hiddenStreet',
        'requiredStreet',
        'hiddenInformation',
        'requiredInformation',
        'hiddenNumber',
        'requiredNumber',
        'hiddenNeighborhood',
        'requiredNeighborhood',
        'hiddenCity',
        'requiredCity',
        'hiddenUf',
        'requiredUf',
        'hiddenCityCode',
        'requiredCityCode',
        'hiddenStateCode',
        'requiredStateCode',
        'hiddenCoordinates',
        'requiredCoordinates'
    ],
    /**
     * @name functions
     * @description Declares the functions that will be accepted by component. See https://capivarajs.github.io/components.html#functions
     */
    functions: [],
    /**
     * @name bindings
     * @description Declares the variables that will be accepted by component. See https://capivarajs.github.io/components.html#bindings
     */
    bindings: ['cpModel'],
    /**
     * @name controller
     * @description Sets the scope of the component
     */
    controller: CapivaraAddress
};

export default capivara.component('cp-address', Component);