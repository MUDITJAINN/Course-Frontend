import React from 'react';
import SiteFooter from "./SiteFooter";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-6">Last updated: April 29, 2026</p>

        <p className="mb-4">
          This Privacy Policy explains how <strong>Programming With Mudit</strong> (“we”, “us”, “our”)
          collects, uses, and shares information when you visit the website, create an account, or purchase
          digital products (courses/notes).
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Information we collect</h2>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          <li>
            <strong>Account details</strong>: name, email, and authentication/session data.
          </li>
          <li>
            <strong>Purchase information</strong>: items purchased and payment status/reference IDs returned
            by our payment provider.
          </li>
          <li>
            <strong>Device/usage data</strong>: IP address, browser type, and basic logs for security and
            troubleshooting.
          </li>
          <li>
            <strong>Support messages</strong>: if you email us or submit a request, we keep the message so
            we can respond.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">How we use information</h2>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          <li>To create and manage your account</li>
          <li>To deliver purchased content and show your purchases</li>
          <li>To verify payments and prevent fraud/abuse</li>
          <li>To respond to support requests</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Sharing</h2>
        <p className="mb-4">
          We share data only when needed to run the service, for example with:
        </p>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          <li>Payment providers (to process/verify payments)</li>
          <li>Email/service providers (to send support responses or service requests)</li>
          <li>Hosting and security providers (to keep the site running securely)</li>
          <li>Authorities (only if required by law)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4">
          We may use cookies or similar technologies to keep you logged in and to help secure the platform.
          You can control cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Third-party links</h2>
        <p className="mb-4">
          Our site may link to third-party websites (for example, social profiles). Their privacy practices
          are governed by their own policies.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Children’s privacy</h2>
        <p className="mb-4">
          The site is not intended for children under 13. We do not knowingly collect personal data from
          children. If you believe a child has provided data, contact us to delete it.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Security & retention</h2>
        <p className="mb-4">
          We use reasonable security measures, but no system is 100% secure. We retain information only as
          long as necessary for providing the service, meeting legal obligations, and resolving disputes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Your choices</h2>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          <li>Request account deletion or data export by contacting us</li>
          <li>Update your profile information in Settings (if available)</li>
          <li>Disable cookies in your browser (may affect login)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Contact</h2>
        <p className="mb-4">
          For privacy questions, email us at{" "}
          <a className="text-blue-600 hover:underline" href="mailto:jainmuditt@gmail.com">
            jainmuditt@gmail.com
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Changes</h2>
        <p className="mb-4">
          We may update this policy over time. Any changes will be posted here with a new “Last updated”
          date.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
};

export default PrivacyPolicy;
