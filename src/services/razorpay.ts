const RAZORPAY_KEY_ID = 'rzp_live_Wh4xEHePkQXqRO';

export const openRazorpayCheckout = async (userData: {
  name: string;
  email: string;
  phone: string;
  amount: number;
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create order in the backend
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4242';
      const response = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: userData.amount,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to connect to payment server');
      }

      const orderData = await response.json();

      if (!orderData.id) {
        throw new Error('Failed to create order ID');
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Avada Design',
        description: 'The Complete Design System',
        order_id: orderData.id,
        handler: function (response: any) {
          console.log('Payment Success:', response);
          resolve(response);
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },
        modal: {
          ondismiss: function () {
            reject(new Error('Payment cancelled by user'));
          }
        },
        theme: { color: '#f97316' }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay Error:', error);
      alert('Payment initialization failed. Please try again.');
      reject(error);
    }
  });
};
