import React from 'react';

const RefundAndCancellation = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Refund & Cancellation Policy</h1>
      <p className="mb-4">
        At Programming with Mudit, we strive to provide the best learning experience. Please read our refund and cancellation policy below.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Refunds are only applicable within 7 days of course purchase.</li>
        <li>No refunds will be granted if the course has been more than 50% completed.</li>
        <li>To request a refund, please contact support with your order details.</li>
        <li>We reserve the right to refuse refunds in cases of abuse or fraud.</li>
      </ul>
    </div>
  );
};

export default RefundAndCancellation;
