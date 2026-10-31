import { useState } from "react";
import { useTranslation } from 'react-i18next';

function DiscountModal({ isOpen, onClose, vouchers, onSelectVoucher, enteredCode, setEnteredCode }) {
  const { t } = useTranslation();

  const [manualApplyError, setManualApplyError] = useState("");
  const [checkingVoucher, setCheckingVoucher] = useState(false);
  const [foundVoucher, setFoundVoucher] = useState(null);
  const [isExpiredVoucher, setIsExpiredVoucher] = useState(false);

  if (!isOpen) return null;

  const handleApplyManual = async () => {
    if (!enteredCode) {
      setManualApplyError("Please apply voucher.");
      setFoundVoucher(null);
      setIsExpiredVoucher(false);
      return;
    }
    setManualApplyError("");
    setCheckingVoucher(true);
    setFoundVoucher(null);
    setIsExpiredVoucher(false);

    try {
      // Import mock voucher service
      const { checkVoucher } = await import('../mockData/vouchers');
      const data = await checkVoucher(enteredCode);

      if (data && data.EC === 1 && data.DT) {
        setFoundVoucher(data.DT);
        // Mock vouchers don't have expiration date in this simple version
        setIsExpiredVoucher(false);
      } else {
        setManualApplyError(data?.EM || "Invalid voucher code.");
        setFoundVoucher(data?.DT || null);
        setIsExpiredVoucher(false);
      }
    } catch (error) {
      console.error("Error checking voucher:", error);
      setManualApplyError(t('common.error'));
      setFoundVoucher(null);
      setIsExpiredVoucher(false);
    } finally {
      setCheckingVoucher(false);
    }
  };

  const handleSelectFoundVoucher = () => {
    if (foundVoucher && !isExpiredVoucher) {
      onSelectVoucher(foundVoucher.code);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4" style={{ maxHeight: "85vh", height: "600px" }}>
        {/* Header với nút Close rõ ràng */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{t('common.discount_vouchers')}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={t('account.close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nội dung modal với scroll */}
        <div className="h-[calc(100%-50px)] flex flex-col">
          {/* Manual Voucher Input */}
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder={t('common.enter_voucher_code')}
                className="flex-1 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                disabled={checkingVoucher}
              />
              <button
                onClick={handleApplyManual}
                className={`px-4 py-2 rounded-md ${checkingVoucher ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition-colors`}
                disabled={checkingVoucher}
              >
                {checkingVoucher ? "Checking..." : "Apply"}
              </button>
            </div>
            
            {manualApplyError && (
              <p className="text-red-500 text-sm mt-1">{manualApplyError}</p>
            )}
            
            {foundVoucher && (
              <div className={`mt-3 p-3 border rounded-md ${isExpiredVoucher ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-semibold ${isExpiredVoucher ? 'text-red-700' : 'text-green-700'}`}>
                      {foundVoucher.code}
                    </p>
                    <p className={`text-sm ${isExpiredVoucher ? 'text-red-600' : 'text-green-600'}`}>
                      Discount: {foundVoucher.discount}% • Expires: {new Date(foundVoucher.expirationDate).toLocaleDateString()}
                    </p>
                  </div>
                  {isExpiredVoucher ? (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">{t('common.expired')}</span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{t('common.valid')}</span>
                  )}
                </div>
                
                {isExpiredVoucher ? (
                  <p className="text-red-500 text-sm mt-2">{t('common.this_voucher_has_expired')}</p>
                ) : (
                  <button
                    onClick={handleSelectFoundVoucher}
                    className="w-full mt-3 py-2 px-4 rounded-md text-sm bg-green-600 hover:bg-green-700 text-white transition-colors"
                  >{t('common.use_this_voucher')}</button>
                )}
              </div>
            )}
          </div>

          {/* Available Vouchers */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('common.available_vouchers')}</h3>
            
            {vouchers.length === 0 ? (
              <p className="text-gray-500 py-4 text-center">{t('common.no_vouchers_available')}</p>
            ) : (
              <div className="space-y-3 pr-2">
                {vouchers.map((voucher) => {
                  const isExpired = new Date(voucher.expirationDate) < new Date();
                  return (
                    <div 
                      key={voucher.voucherId}
                      className={`border rounded-md p-3 ${isExpired ? 'opacity-70' : 'hover:bg-gray-50 cursor-pointer'}`}
                      onClick={!isExpired ? () => onSelectVoucher(voucher.code) : undefined}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-semibold ${isExpired ? 'text-gray-500' : 'text-indigo-600'}`}>
                            {voucher.code}
                          </p>
                          <p className={`text-sm ${isExpired ? 'text-gray-400' : 'text-gray-600'}`}>
                            {voucher.discount}% discount • Expires: {new Date(voucher.expirationDate).toLocaleDateString()}
                          </p>
                        </div>
                        {isExpired ? (
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{t('common.expired')}</span>
                        ) : (
                          <button 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1 px-3 rounded-md transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectVoucher(voucher.code);
                            }}
                          >
                            Apply
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Nút Close lớn hơn ở dưới cùng */}
          <div className="pt-4 mt-auto">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
            >{t('account.close')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscountModal;
// Updated: 2025-10-12T16:06:25.976Z

// Updated: 2025-10-12T16:08:49.791Z
