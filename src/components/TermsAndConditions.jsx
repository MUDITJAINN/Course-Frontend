import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">
        By accessing or using Programming with Mudit, you agree to be bound by these terms. Please read them carefully.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>All content is for educational purposes only.</li>
        <li>You may not reproduce or share course materials without permission.</li>
        <li>Use of our services must comply with all applicable laws.</li>
        <li>We reserve the right to change these terms at any time.</li>
      </ul>
    </div>
  );
};

export default TermsAndConditions;
