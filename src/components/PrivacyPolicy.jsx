import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6">Last updated: June 18, 2025</p>

      <p className="mb-4">
        MUDIT JAIN operates this store and website, including all related information, content, features,
        tools, products and services, in order to provide you, the customer, with a curated shopping experience
        (the "Services"). MUDIT JAIN is powered by React, which enables us to provide the Services to you. This
        Privacy Policy describes how we collect, use, and disclose your personal information when you visit,
        use, or make a purchase or other transaction using the Services or otherwise communicate with us...
      </p>

      {/* You can wrap large sections into collapsible UI if needed. Keeping it flat here. */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Personal Information We Collect or Process</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Contact details: name, address, email, etc.</li>
        <li>Financial details: card numbers, transaction info, etc.</li>
        <li>Account and transaction history.</li>
        <li>Device and usage data.</li>
        <li>Communications with us.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use Your Personal Information</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>To provide, tailor, and improve our Services</li>
        <li>For marketing and advertising</li>
        <li>To ensure security and prevent fraud</li>
        <li>To communicate with you</li>
        <li>For legal compliance</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">How We Disclose Personal Information</h2>
      <p className="mb-4">We may disclose personal info to:</p>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Vendors and service providers</li>
        <li>Business and marketing partners</li>
        <li>Third parties at your request or with consent</li>
        <li>Our corporate affiliates</li>
        <li>Authorities in legal or regulatory matters</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Relationship with React</h2>
      <p className="mb-4">
        The Services are hosted by React, which collects and processes personal information about your access
        and use of the Services to operate and improve them. Your data may be transmitted across countries.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Third Party Websites and Links</h2>
      <p className="mb-4">
        We are not responsible for the privacy practices of third-party websites linked from our site. You
        should review their policies individually.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Children's Data</h2>
      <p className="mb-4">
        Our Services are not intended for children. We do not knowingly collect data from individuals under the
        legal age of majority.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Security and Retention</h2>
      <p className="mb-4">
        While we implement security best practices, no system is 100% secure. We retain your data as long as
        needed to provide services and meet legal obligations.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Your Rights and Choices</h2>
      <ul className="list-disc ml-6 mb-4 space-y-1">
        <li>Right to access or know the data we hold</li>
        <li>Right to delete or correct your data</li>
        <li>Right to portability of your data</li>
        <li>Right to manage communication preferences</li>
      </ul>
      <p className="mb-4">
        You can exercise these rights via options provided on the Services or by contacting us directly. We
        may need to verify your identity.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Complaints</h2>
      <p className="mb-4">
        If you have complaints regarding your data, contact us using the contact info provided. You may also
        file with a local data protection authority.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may revise this Privacy Policy over time. Any changes will be posted on this page with an updated
        effective date.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
