// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

module.exports = function generateotp(phone){

    const accountSid = process.env.accountsid;
    const authToken = process.env.authToken;
    const client = require('twilio')(accountSid, authToken);
    
    client.verify.v2.services('VA8d161e6ba7e6fc55818c599008d5fc2a')
                    .verifications
                    .create({to: `+91${phone}`, channel: 'sms'})
                    .then(verification => console.log(verification.status));
}

