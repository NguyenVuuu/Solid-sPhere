import React from "react";
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();

  const SupportCard = ({ icon, title, description }) => {
    return (
      <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto">
        <div className="mb-4 p-3 bg-blue-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  const supportItems = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: t('faq.product_support'),
      description: t('faq.product_support_desc'),
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: t('faq.personal_account'),
      description: t('faq.personal_account_desc'),
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t('faq.amazing_savings'),
      description: t('faq.amazing_savings_desc'),
    },
  ];

  return (
    <>
      {" "}
      <div className="max-w-4xl mx-auto px-4 py-8 font-sans grid grid-cols-12 gap-x-10">
        <div className="col-span-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b border-gray-200 pb-4 mb-6">
{t('faq.shop_terms_conditions')}
          </h1>

          <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
{t('faq.general_terms_conditions')}
          </h2>

          <h3 className="text-xl font-medium text-gray-600 mt-6 mb-3">{t('faq.definitions_interpretation')}</h3>
          <p className="mb-4 text-gray-700">
            In the following Terms and Conditions of sale, unless the context
            requires otherwise:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>
              <span className="font-medium">{t('faq.a')}</span> 'Shop' means Shop Pty Ltd
              ABH II 222 333 444;
            </li>
            <li>
              <span className="font-medium">{t('faq.b')}</span> 'Customer' means the
              person or corporation placing an order for the purchase of goods
              or services from Shop;
            </li>
            <li>
              <span className="font-medium">{t('faq.c')}</span> t('product.product') means any
              goods, materials, equipment or services provided to the Customer
              by shop;
            </li>
            <li>
              <span className="font-medium">{t('faq.d')}</span> The Customer complies
              three than one person, each of these persons liable by light and
              severed;
            </li>
            <li>
              <span className="font-medium">{t('faq.e')}</span> references to a party or
              a person includes any form of entity and their respective
              successors, assigns and representatives;
            </li>
            <li>
              <span className="font-medium">{t('faq.f')}</span> for all periods and times
              specified in clauses 5 and 11, time is of the essence; and
            </li>
            <li>
              <span className="font-medium">{t('faq.g')}</span> all references to
              currency are references to Australian dollars.
            </li>
          </ul>

          <h3 className="text-xl font-medium text-gray-600 mt-6 mb-3">{t('faq.general')}</h3>
          <p className="mb-4 text-gray-700">
            By ordering the Products and/or accepting delivery of the Products
            from Shop, the Customer agrees that it is bound by these terms and
            conditions of sale. Customer orders, including orders placed via the
            internet, are subject to acceptance by Shop. The acceptance of the
            Customer's order by Shop is expensive, made conditional upon the
            Customer's extent to those terms and Conditions which will prevail
            notwithstanding anything that may be stated to the contrary on the
            Customer's order. Shop reserves the right to vary any of these terms
            at any time and any subsequent orders placed by Shop. Customer will
            constitute an acceptance of the terms as varied. Once a Customer
            order has been placed and accepted by Shop, the Customer agrees that
            the Customer has no right to consist or vary the order at any time,
            unless agreed upon in writing by both parties.
          </p>

          <h3 className="text-xl font-medium text-gray-600 mt-6 mb-3">{t('faq.quotations')}</h3>
          <p className="mb-4 text-gray-700">
            Any quotation by Shop to the Customer will be open for acceptance by
            the Customer within the period stated in the quotation or, where no
            period is stated within seven (7) days from the date of the
            quotation. Thereafter, prices stated in the quotation may be varied
            by Shop without notice to the Customer.
          </p>

          <h3 className="text-xl font-medium text-gray-600 mt-6 mb-3">{t('faq.prices_taxes')}</h3>
          <p className="mb-4 text-gray-700">
            The prices charged by and payable to Shop will be the ruling prices
            applicable at the time of order placement, provided that the
            Products are accepted for delivery with a reasonable time. Prices
            are subject to change without notice. Recommended retail prices are
            provided for the before purposes only and there is no obligation for
            Shop to comply with that recommendation. It is agreed that should
            the Customer take any reason to acquire the quantity of Products
            sold into without using Shop other rights and remedies the unit
            price charged for the goods sold may be amended to take into account
            any variation in the total quantity purchased by the Customers.
            Prices include GST, but do not include any other tax or duty, which
            is in addition to the price and is to be paid by the Customer at the
            time of payment for the Products.
          </p>

          <h3 className="text-xl font-medium text-gray-600 mt-6 mb-3">{t('faq.terms_of_payment')}</h3>
          <p className="mb-3 text-gray-700">
            Credit Card Payments may attract a surcharge, and Shop will inform
            the Customer if this is to be the case before processing the
            transaction.
          </p>
          <p className="mb-3 text-gray-700">
            Unless otherwise agreed in writing by Shop, Where Shop has not
            agreed in writing to provide commercial credit to the Customer, the
            total purchase price for Products supplied will be due for payment
            in cash prior to delivery.
          </p>
          <p className="mb-3 text-gray-700">
            Where Shop has agreed in writing to provide commercial credit to the
            Customer, the Customer must make payments in accordance with the
            payment terms provided by Shop.
          </p>
          <p className="mb-3 text-gray-700">
            Where Shop has approved the provision of a commercial credit
            arrangement with the Customer but has not provided notice of the
            payment terms to the Customer, the Customer must pay the total
            purchase price for Products supplied within seven days of the
            statement date.
          </p>
          <p className="mb-4 text-gray-700">
            Credit Card Payment at an invoice or transaction level may also be
            offered to the Customer as a stand-alone payment method, or in
            conjunction with Credit Card Direct Debit Authorisation.
          </p>

          <h3 className="text-xl font-medium text-gray-600 mt-6 mb-3">{t('faq.credit_accounts')}</h3>
          <p className="mb-4 text-gray-700">
            Any commercial credit arrangements that are provided to the Customer
            by Shop will continue until terminated by Shop at it sole
            discretion. In the event that Shop terminates the Customer's
            commercial credit arrangement, the Customer will be notified in
            writing and termination will take effect upon receipt of that
            notification by the Customer.
          </p>

          <h3 className="text-xl font-medium text-gray-600 mt-6 mb-3">{t('faq.change_of_ownership')}</h3>
          <p className="mb-3 text-gray-700">
            Trading accounts are approved by Shop based on the information
            supplied and the representation made by the Customers. In the event
            that there is a change in ownership of the Customers, whether total
            or partial, the Customer must immediately provide written notice to
            Shop informing Shop of these changes. Until Shop receives written
            notice from the Customer of a change in ownership, the Customer
            (including when it is a company or future), each of the Directors
            (which holds Shop Information against any and all losses, unpaid
            accounts, interest, damages, costs, charges, fees and expenses
            incurred or suffered by Shop in trading with any person, company
            (including the same company but with a different shareholder or
            shareholders) or other entity (including a trust) which may have
            purchased the Customers' business or any interest in the Customers'
            business or any of the shares in the Customer and used the
            Customer's previously approved account for trading.
          </p>
          <p className="mb-4 text-gray-700">
            Where a Customer has been authorised by Shop to make payments
            through Credit Card Direct Debit, the Customer must provide notice
            in writing at least five (3) days prior to any change in ownership
            of the business to allow Shop sufficient time to contact the new
            owner to obtain and confirm new Credit Card information if
            applicable.
          </p>

          <h3 className="text-xl font-medium text-gray-600 mt-6 mb-3">{t('faq.information_on_the_products')}</h3>
          <p className="mb-4 text-gray-700">
            All descriptions specification, illustrations, drawings, data
            dimensions and weights furnished by Shop or otherwise contained in
            catalogue or other advertising material are approximate only and are
            intended to be merely a general description of the goods, are not
            incorporated within this agreement and no not form part of the
            description of the goods sold under this or any other agreement
            unless otherwise agreed to in writing by Shop in which case such
            information will be subject to recognised trade tolerances.
          </p>

          <h3 className="text-xl font-medium text-gray-600 mt-6 mb-3">{t('faq.delivery')}</h3>
          <p className="mb-3 text-gray-700">
            The means of delivering the Products to the Customer will be of Shop
            discretion. Shop reserves the right to deliver Products in part
            deliveries. In the event that Shop incurs additional costs for
            meeting special (i.e., rental) / Northern Territory Delivered/ or
            urgent delivery arrangements, these additional costs may be charged
            to the Customer and may include the cost of infringer where it is
            not the normal method of delivery. The Customer agrees to accept
            delivery of the Products sold at any time during normal business
            hours.
          </p>
          <p className="mb-6 text-gray-700">
            Shop will not be liable for any loss or damage resulting from any
            loss delivery of the Products and use delivery will not entitle the
            Customer to rescind or repudiate the Customer's order for the
            Products.
          </p>
        </div>

        <div className="mt-10 p-6 bg-[#F5F7FF] rounded-lg col-span-4 h-fit">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#definitions" className="text-black hover:underline">{t('faq.definitions_interpretation')}</a>
            </li>
            <li>
              <a href="#general" className="text-black hover:underline">{t('faq.general')}</a>
            </li>
            <li>
              <a href="#quotations" className="text-black hover:underline">{t('faq.quotations')}</a>
            </li>
            <li>
              <a href="#prices" className="text-black hover:underline">{t('faq.prices_taxes')}</a>
            </li>
            <li>
              <a href="#payment" className="text-black hover:underline">{t('faq.terms_of_payment')}</a>
            </li>
            <li>
              <a href="#credit" className="text-black hover:underline">{t('faq.credit_accounts')}</a>
            </li>
            <li>
              <a href="#ownership" className="text-black hover:underline">{t('faq.change_of_ownership')}</a>
            </li>
            <li>
              <a href="#product-info" className="text-black hover:underline">{t('faq.information_on_the_products')}</a>
            </li>
            <li>
              <a href="#delivery" className="text-black hover:underline">{t('faq.delivery')}</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Support */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportItems.map((item, index) => (
              <SupportCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;

// Updated: 2025-10-12T16:06:32.604Z

// Updated: 2025-10-12T16:08:56.800Z
