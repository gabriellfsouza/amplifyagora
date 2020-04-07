import React from "react";
import {API} from 'aws-amplify';
import StripeCheckout from 'react-stripe-checkout';
// import { Notification, Message } from "element-react";

const stripeConfig = {
  publishableAPIKey: 'pk_test_GTPLqQHtT2mlBbReMgAk16ig00BpX7b6gi',
  currency: "USD",
};

const PayButton = ({product,user}) => {
  const handleCharge = async (token)=>{
    try {
      const result = await API.post('orderlambda','/charge',{
        body: {
          token,
          charge: {
            currency: stripeConfig.currency,
            amount: product.price,
            description: product.description
          }
        }
      });
      console.log({result});
    } catch (error) {
      console.log(error);
    }
  }

  return <StripeCheckout
    token={handleCharge}
    email={user.attributes.email}
    name={product.description}
    amount={product.price}
    currency={stripeConfig.currency}
    stripeKey={stripeConfig.publishableAPIKey}
    shippingAddress={product.shipped}
    billingAddress={product.shipped}
    locale='auto'
    allowRememberMe={false}
  />;
};

export default PayButton;
