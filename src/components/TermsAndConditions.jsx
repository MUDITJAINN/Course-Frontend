import React from 'react';
import SiteFooter from "./SiteFooter";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

      <p className="mb-4">
        Last updated: April 29, 2026
      </p>

      <p className="mb-4">
        Welcome to <strong>Programming With Mudit</strong>. By using this website and purchasing any digital
        products (courses/notes), you agree to these Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Access and Account</h2>
      <p className="mb-4">
        By using the Services, you confirm you are the age of majority in your jurisdiction. You are responsible for your account information and credentials.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Our Products</h2>
      <p className="mb-4">
        Digital products may include videos, PDFs, notes, downloads, and other learning materials. We may
        update products over time and may discontinue listings at our discretion.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Orders</h2>
      <p className="mb-4">
        Placing an order is an offer to purchase. We reserve the right to accept, reject or cancel orders at our discretion.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Prices and Billing</h2>
      <p className="mb-4">
        Prices are subject to change. Taxes and shipping are extra unless stated. You agree to provide accurate payment information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Shipping and Delivery</h2>
      <p className="mb-4">
        Products are digital; access is typically granted after successful payment verification. If access
        fails, contact support.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Intellectual Property</h2>
      <p className="mb-4">
        All materials and trademarks belong to MUDIT JAIN or its partners. No content may be copied or reproduced without permission.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Optional Tools</h2>
      <p className="mb-4">
        Third-party tools may be available as-is. Use them at your own risk. We are not liable for those services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Third-Party Links</h2>
      <p className="mb-4">
        Links to other websites are provided for convenience. We are not responsible for their content or data practices.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Privacy Policy</h2>
      <p className="mb-4">
        All personal information is governed by our Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">10. Feedback</h2>
      <p className="mb-4">
        Feedback you provide grants us a royalty-free, global license to use it. You confirm you own the rights to the feedback.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">12. Errors, Inaccuracies and Omissions</h2>
      <p className="mb-4">
        We reserve the right to correct errors or cancel orders where necessary.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">13. Prohibited Uses</h2>
      <p className="mb-4">
        Do not misuse the Services including spreading malware, harvesting data, or engaging in illegal activity. Violators may be banned.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">14. Termination</h2>
      <p className="mb-4">
        We may terminate access to Services at our discretion. Certain sections survive termination.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">15. Disclaimer of Warranties</h2>
      <p className="mb-4">
        The Services are provided “as is” without warranties. Use at your own risk.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">16. Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for indirect, incidental, or consequential damages from your use of the Services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">17. Indemnification</h2>
      <p className="mb-4">
        You agree to indemnify MUDIT JAIN and React for any damages resulting from your violation of the Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">18. Severability</h2>
      <p className="mb-4">
        If any section is unenforceable, the rest of the Terms remain valid.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">19. Waiver; Entire Agreement</h2>
      <p className="mb-4">
        These Terms are the complete agreement. Any failure to enforce a right doesn’t waive it.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">20. Assignment</h2>
      <p className="mb-4">
        You may not assign your rights. We may assign ours without notice.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">21. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by Indian law, specifically under the jurisdiction where MUDIT JAIN is headquartered.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">22. Headings</h2>
      <p className="mb-4">
        Headings are for reference only and do not affect meaning.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">23. Changes to Terms of Service</h2>
      <p className="mb-4">
        We may update these Terms at any time. Continued use of the Services constitutes acceptance of the changes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">24. Contact Information</h2>
      <p className="mb-4">
        For any questions, contact us at:<br />
        <strong>Email:</strong>{" "}
        <a className="text-blue-600 hover:underline" href="mailto:jainmuditt@gmail.com">
          jainmuditt@gmail.com
        </a>
      </p>
      </div>
      <SiteFooter />
    </div>
  );
};

export default TermsAndConditions;
