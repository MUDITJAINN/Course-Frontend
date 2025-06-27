import React from 'react';

const RefundAndCancellation = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Refund & Cancellation Policy</h1>
      <p className="mb-4">
        All payments made for classes at <strong>Programming with Mudit</strong> are final. We do not offer any refunds or accept cancellations once a payment has been successfully processed.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>No cancellations will be entertained after payment is completed.</li>
        <li>No refunds will be issued under any circumstances.</li>
        <li>By enrolling, you agree to this no refund, no cancellation policy.</li>
        <li>Ensure you review the course details carefully before making payment.</li>
      </ul>
    </div>
  );
};

export default RefundAndCancellation;
