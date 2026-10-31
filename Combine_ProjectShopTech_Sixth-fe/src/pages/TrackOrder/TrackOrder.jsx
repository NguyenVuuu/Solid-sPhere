import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaPhoneAlt, FaClock, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const TrackOrder = () => {
  const { t } = useTranslation();

  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingResult({
        orderNumber: orderNumber,
        status: 'In Transit',
        estimatedDelivery: 'Oct 15, 2025',
        currentLocation: 'Distribution Center - Los Angeles',
        timeline: [
          { status: 'Order Placed', date: 'Oct 10, 2025 14:30', completed: true, icon: '📝' },
          { status: 'Payment Confirmed', date: 'Oct 10, 2025 14:35', completed: true, icon: '💳' },
          { status: 'Processing', date: 'Oct 11, 2025 09:00', completed: true, icon: '📦' },
          { status: 'Shipped', date: 'Oct 12, 2025 11:20', completed: true, icon: '🚚' },
          { status: 'In Transit', date: 'Oct 13, 2025 08:15', completed: true, icon: '🛫', current: true },
          { status: 'Out for Delivery', date: 'Expected: Oct 15, 2025', completed: false, icon: '🚗' },
          { status: 'Delivered', date: 'Expected: Oct 15, 2025', completed: false, icon: '✅' }
        ],
        items: [
          { name: 'MSI Gaming Laptop', qty: 1, image: '/src/assets/images/products/laptop1.jpg' },
          { name: 'Wireless Gaming Mouse', qty: 1, image: '/src/assets/images/products/mouse1.jpg' }
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">{t('order.unknown')}</div>
            <h1 className="text-6xl font-bold mb-4">{t('order.track_your_order')}</h1>
            <p className="text-xl text-purple-300">
              Enter your order details to track your shipment in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Tracking Form */}
      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8">
          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">{t('order.order_number')}</label>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder={t('order.eg_ord2025123456')}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-600 text-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">{t('cart.email_address')}</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('common.youremailcom')}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-600 text-lg"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-900 to-purple-950 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Tracking...
                </span>
              ) : (
                t('track.title')
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Tracking Results */}
      {trackingResult && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Order Status Card */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Order #{trackingResult.orderNumber}
                </h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-600" />
                    <span>{trackingResult.currentLocation}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-900 to-purple-950 text-white rounded-xl font-bold text-lg mb-2">
                  {trackingResult.status}
                </div>
                <div className="text-gray-600 flex items-center gap-2 justify-end">
                  <FaClock />
                  <span>Est. Delivery: {trackingResult.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {trackingResult.timeline.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                      step.completed 
                        ? step.current 
                          ? 'bg-gradient-to-r from-purple-900 to-purple-950 shadow-lg ring-4 ring-purple-300' 
                          : 'bg-green-500'
                        : 'bg-gray-200'
                    }`}>
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className={`font-bold text-lg ${
                        step.completed ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.status}
                      </div>
                      <div className={`text-sm ${
                        step.completed ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.date}
                      </div>
                    </div>

                    {/* Status Badge */}
                    {step.current && (
                      <div className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg font-semibold">
                        Current Status
                      </div>
                    )}
                  </div>

                  {/* Connector Line */}
                  {index < trackingResult.timeline.length - 1 && (
                    <div className={`ml-8 w-0.5 h-8 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('order.order_items')}</h3>
            <div className="space-y-4">
              {trackingResult.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100?text=Product';
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{item.name}</div>
                    <div className="text-gray-600">Quantity: {item.qty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">{t('order.call_us')}</h3>
            <p className="text-gray-600 mb-4">{t('order.monfri_9am_6pm')}</p>
            <a href="tel:1800123456" className="text-purple-600 font-bold hover:underline">{t('order.1800123456')}</a>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">{t('order.live_chat')}</h3>
            <p className="text-gray-600 mb-4">{t('order.get_instant_support')}</p>
            <button className="text-purple-600 font-bold hover:underline">{t('order.start_chat')}</button>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">✉️</div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">{t('order.email_us')}</h3>
            <p className="text-gray-600 mb-4">{t('order.well_reply_within_24h')}</p>
            <a href="mailto:support@store.com" className="text-purple-600 font-bold hover:underline">{t('order.supportstorecom')}</a>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{t('order.need_help_with_your')}</h2>
          <p className="text-xl text-purple-300 mb-8">
            Our support team is here to help you 24/7
          </p>
          <button className="px-12 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">{t('order.contact_support')}</button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
