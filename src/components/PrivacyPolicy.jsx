import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This policy outlines how we collect, use, and protect your data.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>We collect minimal personal information necessary for account creation and communication.</li>
        <li>Your data is never sold or shared with third parties without consent.</li>
        <li>All transactions are secured with industry-standard encryption.</li>
        <li>You can request deletion of your data at any time.</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
