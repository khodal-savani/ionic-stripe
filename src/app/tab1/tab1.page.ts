import { Component } from '@angular/core';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    private cardDetails: any;

    constructor(
        private stripe: Stripe
    ) {
    }

    payWithStripe() {
        this.stripe.setPublishableKey('setPublishableKey');

        this.cardDetails = {
            number: 'number',
            expMonth: 'expMonth',
            expYear: 'expYear',
            cvc: 'cvc'
        }

        let isValidCardNumber = this.stripe.validateCardNumber(this.cardDetails.number);
        let isValidateExpiryDate = this.stripe.validateExpiryDate(this.cardDetails.expMonth, this.cardDetails.expYear);
        let isValidateCVC = this.stripe.validateCVC(this.cardDetails.cvc);

        console.log('isValidCardNumber', isValidCardNumber);
        console.log('isValidateExpiryDate', isValidateExpiryDate);
        console.log('isValidateCVC', isValidateCVC);

        this.stripe.createCardToken(this.cardDetails)
            .then(token => {
                console.log('token', token);
            }).catch((error) => {
                console.error(error)
            });
    }

}
