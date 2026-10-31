"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import OrderReceipt from "../components/order/order-receipt"
import path from "../constant/path"
import { useTranslation } from 'react-i18next';

const OrderConfirmation = () => {
  const { t } = useTranslation();

  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // In a real app, you would fetch this from an API
    // For now, we'll get it from localStorage
    try {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = orders.find((o) => o.orderId === orderId)

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        setError("Order not found")
      }
    } catch (err) {
      setError("Error loading order")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || "Order not found"}</h1>
        <p className="text-gray-600 mb-8">{t('order.we_couldnt_find_the')}</p>
        <Link to={path.home} className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700">
          Return to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('remaining.thank_you_for_your_order')}</h1>
        <p className="text-gray-600">{t('order.your_order_has_been')}</p>
      </div>

      <OrderReceipt order={order} />

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => window.print()}
          className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
              clipRule="evenodd"
            />
          </svg>
          Print Receipt
        </button>
        <Link to={path.home} className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation

// Updated: 2025-10-12T16:06:22.712Z

// Updated: 2025-10-12T16:09:10.295Z
