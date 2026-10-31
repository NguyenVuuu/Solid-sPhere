import { useTranslation } from 'react-i18next';

const I18nDemo = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {t('common.success')} 🌍
          </h1>
          <p className="text-gray-600 text-lg">
            Internationalization Demo - 3 Languages Support
          </p>
        </div>

        {/* Navigation Demo */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>🧭</span> Navigation Menu
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <p className="font-semibold text-purple-700">{t('nav.home')}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <p className="font-semibold text-purple-700">{t('nav.products')}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <p className="font-semibold text-purple-700">{t('nav.brands')}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <p className="font-semibold text-purple-700">{t('nav.deals')}</p>
            </div>
          </div>
        </div>

        {/* Product Demo */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>🛍️</span> Product Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="bg-gray-100 h-40 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">💻</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">MacBook Pro M3</h3>
              <p className="text-sm text-gray-600 mb-4">{t('product.description')}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 text-white rounded-lg py-2 font-semibold hover:bg-purple-700 transition-colors">
                  {t('product.addToCart')}
                </button>
                <button className="flex-1 bg-green-600 text-white rounded-lg py-2 font-semibold hover:bg-green-700 transition-colors">
                  {t('product.buyNow')}
                </button>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="bg-gray-100 h-40 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">🖥️</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Gaming PC RTX 4090</h3>
              <p className="text-sm text-gray-600 mb-4">{t('product.description')}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 text-white rounded-lg py-2 font-semibold hover:bg-purple-700 transition-colors">
                  {t('product.addToCart')}
                </button>
                <button className="flex-1 bg-green-600 text-white rounded-lg py-2 font-semibold hover:bg-green-700 transition-colors">
                  {t('product.buyNow')}
                </button>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="bg-gray-100 h-40 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">⌨️</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Mechanical Keyboard</h3>
              <p className="text-sm text-gray-600 mb-4">{t('product.description')}</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 text-white rounded-lg py-2 font-semibold hover:bg-purple-700 transition-colors">
                  {t('product.addToCart')}
                </button>
                <button className="flex-1 bg-green-600 text-white rounded-lg py-2 font-semibold hover:bg-green-700 transition-colors">
                  {t('product.buyNow')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Demo */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>🛒</span> {t('cart.title')}
          </h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t('cart.subtotal')}:</span>
              <span className="font-bold text-gray-800">$2,999.00</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">{t('cart.shipping')}:</span>
              <span className="font-bold text-gray-800">$50.00</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-purple-100 rounded-lg border-2 border-purple-300">
              <span className="font-semibold text-purple-800">{t('cart.total')}:</span>
              <span className="font-bold text-2xl text-purple-800">$3,049.00</span>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl py-4 font-bold text-lg hover:shadow-xl transition-all">
            {t('cart.checkout')} 🚀
          </button>
        </div>

        {/* Common Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>⚡</span> Common Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-blue-500 text-white rounded-lg py-3 px-4 font-semibold hover:bg-blue-600 transition-colors">
              {t('common.save')}
            </button>
            <button className="bg-green-500 text-white rounded-lg py-3 px-4 font-semibold hover:bg-green-600 transition-colors">
              {t('common.confirm')}
            </button>
            <button className="bg-amber-500 text-white rounded-lg py-3 px-4 font-semibold hover:bg-amber-600 transition-colors">
              {t('common.edit')}
            </button>
            <button className="bg-red-500 text-white rounded-lg py-3 px-4 font-semibold hover:bg-red-600 transition-colors">
              {t('common.delete')}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 border-2 border-purple-300">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <span>💡</span> How to Use
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">1.</span>
              <span>Look at the <strong>top-right corner</strong> of the Header</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">2.</span>
              <span>Click the <strong>Language Switcher</strong> (🇻🇳 / 🇺🇸 / 🇯🇵)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">3.</span>
              <span>Select your preferred language</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">4.</span>
              <span>Watch all text change instantly! ✨</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default I18nDemo;
