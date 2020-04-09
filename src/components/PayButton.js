import React from "react";
import {API, graphqlOperation} from 'aws-amplify';
import StripeCheckout from 'react-stripe-checkout';
import { Notification, Message } from "element-react";
import { getUser } from "../graphql/queries";
import {createOrder} from '../graphql/mutations';
import {history} from '../App';

const stripeConfig = {
  publishableAPIKey: 'pk_test_GTPLqQHtT2mlBbReMgAk16ig00BpX7b6gi',
  currency: "USD",
};

const PayButton = ({product, user, userAttributes}) => {
  const getOwnerEmail = async ownerId =>{
    try {
      const input = {id: ownerId};
      const result = await API.graphql(graphqlOperation(getUser,input))
      console.log('getresult',{result})
      return result.data.getUser.email;
      
    } catch (error) {
      console.error(`Error fetching product owner's email`,error);
    }
  }
  const createShippingAddress = source =>({
    city: source.address_city,
    country: source.address_country,
    address_line1: source.address_line1,
    adress_state: source.address_state,
    address_zip: source.address_zip,
  })

  const handleCharge = async (token)=>{
    try {
      console.log({productOwner : product.owner})
      debugger;
      const ownerEmail = await getOwnerEmail(product.owner);
      console.log({ownerEmail});
      const result = await API.post('orderlambda','/charge',{
        body: {
          token,
          charge: {
            currency: stripeConfig.currency,
            amount: product.price,
            description: product.description,
          },
          email: {
            customerEmail: userAttributes.email,
            ownerEmail,
            shipped: product.shipped
          }
        }
      });
      console.log({result});
      if(result.charge.status === 'succeeded') {
        let shippingAddress = null;
        if(product.shipped) {
          shippingAddress = createShippingAddress(result.charge.source);
        }
        const input = {
          orderUserId: userAttributes.sub,
          orderProductId: product.id,
          shippingAddress
        };

        const order = await API.graphql(graphqlOperation(createOrder,{input}));
        console.log({order})

        Notification({
          title:"Success",
          message: `${result.message}`,
          type: 'success',
          duration: 3000,
        })
        setTimeout(()=>{
          history.push('/');
          Message({
            type:'info',
            message: 'Check your verified email for order details',
            duration: 5000,
            showClose: true,
          })
        },3000);
      }
    } catch (error) {
      console.log(error);
      Notification.error({
        title: "Error",
        message: `${error.message || 'Error processing order'}`
      });
    }
  }

  return <StripeCheckout
    token={handleCharge}
    email={userAttributes.email}
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
