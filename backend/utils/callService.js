const twilio = require('twilio');

// ===============================
// TWILIO CONFIG
// ===============================

const client = twilio(
  'ACd5becb860669372f09140da645ab4193',
  '67959f3e781c251ed0027c0f5d78a33d'
);

// ===============================
// AUTO CALL FUNCTION
// ===============================

const makeAutoCall = async (
  phone,
  name
) => {

  try {

    let cleanPhone = phone.replace(/\D/g, '');

    // If it's a 10-digit number, prepend 91 (India)
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }

    const call =
      await client.calls.create({

      twiml: `
<Response>

<Say voice="alice">

Hello ${name}.

Welcome to Velvorax.

Your registration was successful.

Our team will contact you shortly.

</Say>

</Response>
        `,

        // USER NUMBER
        to: `+${cleanPhone}`,

        // YOUR TWILIO NUMBER
        from: '+19015573417'

      });

    console.log(
      '✅ Call Success:',
      call.sid
    );

    return true;

  } catch (err) {

    console.log(
      '❌ Call Error:',
      err.message
    );

    return false;
  }
};

// ===============================
// REGISTRATION CALL
// ===============================

const sendRegistrationCall =
  async (user) => {

  return await makeAutoCall(
    user.phone,
    user.name
  );
};

// ===============================
// APPROVAL CALL
// ===============================

const sendApprovalCall =
  async (user) => {

  try {

    let cleanPhone = user.phone.replace(/\D/g, '');

    // If it's a 10-digit number, prepend 91 (India)
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }

    const call =
      await client.calls.create({

      twiml: `
<Response>

<Say voice="alice">

Hello ${user.name}.

Congratulations.

Your Velvorax account
has been approved.

You can now login
and access your dashboard.

</Say>

</Response>
        `,

        to: `+${cleanPhone}`,

        from: '+19015573417'

      });

    console.log(
      '✅ Approval Call Success:',
      call.sid
    );

    return true;

  } catch (err) {

    console.log(
      '❌ Approval Call Error:',
      err.message
    );

    return false;
  }
};

module.exports = {
  makeAutoCall,
  sendRegistrationCall,
  sendApprovalCall
};