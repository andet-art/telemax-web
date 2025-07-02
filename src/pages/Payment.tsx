import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import visaLogo from "../assets/visa.jpg";
import mastercardLogo from "../assets/mastercard.jpg";
import paypalLogo from "../assets/paypal.png";
import amexLogo from "../assets/amex.jpg";
import applePayLogo from "../assets/apple-pay.png";
import cashLogo from "../assets/cash.png";

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
      <main className="pt-32 min-h-screen bg-[#1a120b] text-white font-serif w-full flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-white drop-shadow">
          No order data found.
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-[#c9a36a] hover:bg-[#b68d58] text-[#1a120b] px-6 py-3 rounded-full font-semibold shadow-lg transition"
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
              className="w-full px-4 py-3 rounded bg-[#2a1d13] text-white placeholder-stone-400 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full px-4 py-3 rounded bg-[#2a1d13] text-white placeholder-stone-400 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="flex-1 px-4 py-3 rounded bg-[#2a1d13] text-white placeholder-stone-400 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
              />
              <input
                type="text"
                placeholder="CVV"
                className="flex-1 px-4 py-3 rounded bg-[#2a1d13] text-white placeholder-stone-400 border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
              />
            </div>
          </div>
        );
      case "paypal":
        return (
          <p className="text-base text-stone-300 italic">
            You will be redirected to PayPal to complete your payment.
          </p>
        );
      case "apple":
        return (
          <p className="text-base text-stone-300 italic">
            Use your Apple device to confirm the payment with Apple Pay.
          </p>
        );
      case "cash":
        return (
          <p className="text-base text-stone-300 italic">
            You chose to pay with cash on delivery.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <main className="pt-32 min-h-screen bg-[#1a120b] text-white font-serif w-full px-4 sm:px-6 md:px-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-[#c9a36a] mb-12">
        💳 Payment
      </h1>

      <div className="bg-[#2a1d13] p-8 rounded-2xl shadow-xl border border-stone-800 max-w-3xl mx-auto space-y-6">
        <div className="space-y-2 text-stone-200">
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
            <span className="text-[#c9a36a]">${orderData.total.toFixed(2)}</span>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Select a payment method</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`rounded-xl p-3 bg-[#1e130a] border-2 transition flex items-center justify-center shadow-inner hover:border-[#c9a36a] ${
                  selectedMethod === method.id
                    ? "border-[#c9a36a] ring-2 ring-[#c9a36a]"
                    : "border-stone-700"
                }`}
              >
                <img
                  src={method.logo}
                  alt={method.label}
                  className="h-6 sm:h-8 object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {selectedMethod && (
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Enter Payment Details</h3>
            {renderPaymentFields()}
          </div>
        )}

        {selectedMethod && (
          <button
            onClick={() => alert("Payment completed successfully!")}
            className="w-full mt-6 bg-[#c9a36a] hover:bg-[#b68d58] text-[#1a120b] font-bold py-3 rounded-full shadow-lg transition"
          >
            Confirm Payment
          </button>
        )}
      </div>
    </main>
  );
};

export default Payment;
