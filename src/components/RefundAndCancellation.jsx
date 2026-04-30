import React from 'react';
import SiteFooter from "./SiteFooter";

const RefundAndCancellation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Refund & Cancellation Policy</h1>
        <p className="mb-6 text-sm text-gray-600">Last updated: April 29, 2026</p>

        <p className="mb-4">
          We sell <strong>digital</strong> products (downloadable notes and course access). Because digital
          content can be accessed immediately after purchase, refunds are generally not offered.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Refunds</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>No refunds after access is granted</strong>: once a digital product is unlocked for your
            account, we do not offer refunds.
          </li>
          <li>
            <strong>Duplicate/incorrect charges</strong>: if you are charged twice for the same product,
            contact support and we will help resolve it.
          </li>
          <li>
            <strong>Technical issues</strong>: if you paid successfully but cannot access the content, we
            will provide support to restore access.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Cancellations</h2>
        <p className="mb-4">
          Orders for digital products can’t be “cancelled” once payment is completed, because delivery is
          typically immediate.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Contact</h2>
        <p className="mb-4">
          For billing or access issues, email{" "}
          <a className="text-blue-600 hover:underline" href="mailto:jainmuditt@gmail.com">
            jainmuditt@gmail.com
          </a>{" "}
          or use the{" "}
          <a className="text-blue-600 hover:underline" href="/contact">
            Contact
          </a>{" "}
          page.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
};

export default RefundAndCancellation;
