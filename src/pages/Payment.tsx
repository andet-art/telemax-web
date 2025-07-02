import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import visaLogo from "../assets/visa.jpg";
import mastercardLogo from "../assets/mastercard.jpg";
import paypalLogo from "../assets/paypal.png";
import amexLogo from "../assets/amex.jpg";
import applePayLogo from "../assets/apple-pay.png";
import cashLogo from "../assets/cash.png";

// Define the payment options and their logos
const paymentMethods = [
  { id: "visa", label: "VISA", logo: visaLogo },
  { id: "mastercard", label: "Mastercard", logo: mastercardLogo },
  { id: "paypal", label: "Paypal", logo: paypalLogo },
  { id: "amex", label: "AMEX", logo: amexLogo },
  { id: "apple", label: "Apple Pay", logo: applePayLogo },
  { id: "cash", label: "Cash", logo: cashLogo },
];



const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  const [selectedMethod, setSelectedMethod] = useState(null);

  if (!orderData) {
    return (
      <main className="pt-32 min-h-screen bg-stone-950 text-white w-full flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-semibold">No order data found.</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          Go Home
        </button>
      </main>
    );
  }

  const renderPaymentFields = () => {
    switch (selectedMethod) {
      case "visa":
      case "mastercard":
      case "amex":
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-4 py-2 rounded bg-stone-700 text-white"
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full px-4 py-2 rounded bg-stone-700 text-white"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="flex-1 px-4 py-2 rounded bg-stone-700 text-white"
              />
              <input
                type="text"
                placeholder="CVV"
                className="flex-1 px-4 py-2 rounded bg-stone-700 text-white"
              />
            </div>
          </div>
        );
      case "paypal":
        return (
          <p className="text-sm text-stone-300">
            You will be redirected to PayPal to complete your payment.
          </p>
        );
      case "apple":
        return (
          <p className="text-sm text-stone-300">
            Use your Apple device to confirm the payment with Apple Pay.
          </p>
        );
      case "cash":
        return (
          <p className="text-sm text-stone-300">
            You chose to pay with cash on delivery.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <main className="pt-32 min-h-screen bg-stone-950 text-white w-full">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
        💳 Payment
      </h1>

      <div className="bg-stone-800 p-6 rounded-lg space-y-4 border border-stone-700 w-full">
        <p>
          <strong>Name:</strong> {orderData.name}
        </p>
        <p>
          <strong>Email:</strong> {orderData.email}
        </p>
        <p>
          <strong>Address:</strong> {orderData.address}
        </p>
        <p className="text-xl font-bold">
          <strong>Total:</strong>{" "}
          <span className="text-amber-400">${orderData.total.toFixed(2)}</span>
        </p>

        <div className="pt-4">
          <h2 className="text-lg font-semibold mb-2">Select a payment method</h2>
          <div className="grid grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`border rounded-lg p-3 flex items-center justify-center bg-stone-900 hover:border-amber-500 transition ${
                  selectedMethod === method.id
                    ? "border-amber-500 ring-2 ring-amber-500"
                    : "border-stone-700"
                }`}
              >
                <img
                  src={method.logo}
                  alt={method.label}
                  className="h-6 max-h-8 object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {selectedMethod && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Enter Payment Details</h3>
            {renderPaymentFields()}
          </div>
        )}

        {selectedMethod && (
          <button
            onClick={() => alert("Payment completed successfully!")}
            className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-lg font-bold shadow-lg transition"
          >
            Confirm Payment
          </button>
        )}
      </div>
    </main>
  );
};

export default Payment;
