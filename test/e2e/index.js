module.exports = {
    'cp-address': function (browser) {
        browser.url('http://localhost:1111')
            .pause(2000)
            .setValue('input[cp-model="$ctrl.address.cep"]', '87210028')
            .keys("\uE004")
            .pause(3000)
            .assert.valueContains('input[cp-model="$ctrl.address.streetType"]', 'AVENIDA')
            .assert.valueContains('input[cp-model="$ctrl.address.street"]', 'Mato Grosso ')
            .assert.valueContains('input[cp-model="$ctrl.address.neighborhood"]', 'Zona 04')
            .assert.valueContains('input[cp-model="$ctrl.address.city"]', 'Cianorte')
            .assert.valueContains('select[cp-model="$ctrl.address.uf"]', 'PR')
            .assert.valueContains('input[cp-model="$ctrl.address.ibgecode"]', '4105508')
            .assert.valueContains('input[cp-model="$ctrl.address.ufCode"]', '41')
            .assert.valueContains('input[cp-model="$ctrl.address.latitude"]', '-23.6573409')
            .assert.valueContains('input[cp-model="$ctrl.address.longitude"]', '-52.6004492')
            .setValue('input[cp-model="$ctrl.address.number"]', '2024')
            .keys("\uE004")
            .pause(2000)
            .assert.valueContains('input[cp-model="$ctrl.address.latitude"]', '-23.6573551')
            .assert.valueContains('input[cp-model="$ctrl.address.longitude"]', '-52.60045909999999')
            .end()
    }
}