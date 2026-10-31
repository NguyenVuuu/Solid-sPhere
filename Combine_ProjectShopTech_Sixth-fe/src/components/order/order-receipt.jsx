import React from "react";
import { format } from "date-fns";
import { useTranslation } from 'react-i18next';

const OrderReceipt = ({ order }) => {
  const { t } = useTranslation();

  const {
    orderId,
    orderDate,
    customer,
    items,
    subtotal,
    tax,
    shippingCost,
    discount,
    total,
    paymentMethod,
    shippingMethod,
  } = order;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto my-8 print:shadow-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{t('order.order_receipt')}</h1>
            <p className="text-indigo-200">{t('order.thank_you_for_your')}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold">#{orderId}</p>
            <p className="text-indigo-200">
              {format(new Date(orderDate), "dd MMM yyyy, HH:mm")}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Customer and Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
{t('order.customer_information')}
            </h2>
            <p className="font-medium text-gray-700">
              {customer.firstName} {customer.lastName}
            </p>
            <p className="text-gray-600">{customer.email}</p>
            <p className="text-gray-600">{customer.phoneNumber}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">{t('cart.shipping_address')}</h2>
            <p className="font-medium text-gray-700">
              {customer.firstName} {customer.lastName}
            </p>
            <p className="text-gray-600">{customer.streetAddress}</p>
            <p className="text-gray-600">
              {customer.city}
              {customer.stateProvince ? `, ${customer.stateProvince}` : ""}
              {customer.zipPostalCode ? ` ${customer.zipPostalCode}` : ""}
            </p>
            <p className="text-gray-600">{customer.country}</p>
          </div>
        </div>

        {/* Order Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
{t('order.order_details')}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('admin.product')}</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
{t('product.quantity')}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('common.price')}</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
{t('common.total')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.productID} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 mr-4">
                          {item.image && item.image.length > 0 ? (
                            <img
                              src={item.image[0] || "/placeholder.svg"}
                              alt={item.productName}
                              className="h-12 w-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.productName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">{t('order.subtotal')}</span>
            <span className="text-gray-800 font-medium">
              {formatCurrency(subtotal)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">{t('cart.tax_10')}</span>
            <span className="text-gray-800 font-medium">{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">{t('order.shipping')}</span>
            <span className="text-gray-800 font-medium">
              {formatCurrency(shippingCost)}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{t('order.discount')}</span>
              <span className="text-green-600 font-medium">
                -{formatCurrency(discount)}
              </span>
            </div>
          )}
          <div className="flex justify-between mt-4 pt-4 border-t">
            <span className="text-lg font-bold text-gray-800">{t('order.total')}</span>
            <span className="text-lg font-bold text-indigo-600">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* Payment and Shipping Method */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
{t('order.payment_method')}
            </h2>
            <p className="text-gray-600">{paymentMethod}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
{t('order.shipping_method')}
            </h2>
            <p className="text-gray-600">{shippingMethod}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-6 text-center text-gray-500 text-sm">
        <p>{t('order.if_you_have_any')}</p>
        <p>{t('order.our_customer_support_at')}</p>
      </div>
    </div>
  );
};

export default OrderReceipt;

// Updated: 2025-10-12T16:06:28.915Z

// Updated: 2025-10-12T16:09:06.695Z
