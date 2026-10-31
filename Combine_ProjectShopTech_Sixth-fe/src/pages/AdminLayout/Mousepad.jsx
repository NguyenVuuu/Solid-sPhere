import React, { memo, useState, useEffect } from 'react';
import { Loader2, AlertCircle, ImageOff, Search, Pencil, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Ánh xạ categoryID với tên hãng cho danh mục Mousepads
const CATEGORY_BRAND_MAPPING = {
11: 'Daeru',
  12: 'ASUS',
  13: 'Razer',
};

// Form component for adding/editing Mousepads
const MousepadForm = ({
  mousepad = {},
  onSave,
  onCancel,
  formTitle,
  theme,
  validCategoryIds = [11, 12, 13],
  images = [],
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: mousepad?.name || '',
    description: mousepad?.description || '',
    unitPrice: mousepad?.unitPrice || '',
    quantity: mousepad?.quantity || '',
    categoryId: mousepad?.categoryId || '',
    imageUrl: mousepad?.imageUrl || '', // Store image URL
    isLoading: false,
    error: null,
  });

  const [imageSearchTerm, setImageSearchTerm] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    if (formData.error) {
      const timer = setTimeout(() => {
        setFormData((prev) => ({ ...prev, error: null }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formData.error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'unitPrice' || name === 'quantity'
          ? parseFloat(value) || value
          : name === 'categoryId'
          ? value === '' ? '' : parseInt(value)
          : value,
    }));
  };

  const handleImageSelect = (image) => {
    setFormData((prev) => ({
      ...prev,
      image: image.url, // Store the selected image's URL
    }));
    setShowImagePicker(false);
    setImageSearchTerm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      if (!formData.categoryId || !validCategoryIds.includes(parseInt(formData.categoryId))) {
        throw new Error('Vui lòng chọn một hãng hợp lệ');
      }
      if (isNaN(parseFloat(formData.unitPrice)) || parseFloat(formData.unitPrice) < 0) {
        throw new Error('Giá phải là số dương');
      }
      if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) < 0) {
        throw new Error('Số lượng tồn kho phải là số không âm');
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        unitPrice: parseFloat(formData.unitPrice),
        quantity: parseInt(formData.quantity),
        categoryId: parseInt(formData.categoryId),
        imageUrl: formData.imageUrl || null, // Include image URL (or null if not selected)
      };

      await onSave(productData);
      setFormData((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Error saving mousepad:', error);
      setFormData((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Không thể lưu bàn di chuột',
      }));
    }
  };

  const filteredImages = imageSearchTerm.trim() === ''
    ? images
    : images.filter((image) =>
        (image.url || '').toLowerCase().includes(imageSearchTerm.toLowerCase())
      );

  const currentTheme = {
    dark: {
      container: 'bg-gray-800 text-gray-200',
      input: 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md',
      buttonSecondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-md',
      error: 'text-red-400',
      imagePicker: 'bg-gray-700 border-gray-600',
    },
    light: {
      container: 'bg-white text-gray-800',
      input: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400',
      buttonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md',
      buttonSecondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800 shadow-md',
      error: 'text-red-600',
      imagePicker: 'bg-gray-100 border-gray-300',
    },
  }[theme || 'dark'];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className={`${currentTheme.container} rounded-lg shadow-xl p-6 w-full max-w-lg relative`}>
        <h3 className="text-xl font-semibold mb-4">{formTitle}</h3>

        {formData.error && (
          <div className={`${currentTheme.error} mb-4 flex items-center`}>
            <AlertCircle size={20} className="mr-2" />
            {formData.error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">{t('admin.tn_sn_phm')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
                required
              />
            </div>

            <div>
              <label className="block mb-1">{t('admin.m_t')}</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">{t('admin.gi_vnd')}</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">{t('admin.tn_kho')}</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">{t('admin.hng')}</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
                required
              >
                <option value="">{t('admin.chn_hng')}</option>
                {validCategoryIds.map((id) => (
                  <option key={id} value={id}>
                    {CATEGORY_BRAND_MAPPING[id] || `Danh mục ${id}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">{t('admin.hnh_nh')}</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.imageUrl || 'Chọn hình ảnh'}
                  onClick={() => setShowImagePicker(true)}
                  onChange={handleChange}
                  name="imageUrl"
                  className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input} cursor-pointer`}
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt={t('admin.selected')}
                      className="h-20 w-20 object-cover rounded-lg shadow-sm"
                      onError={(e) => (e.target.src = '')}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {showImagePicker && (
            <div className={`absolute top-0 left-0 w-full h-full ${currentTheme.imagePicker} rounded-lg p-4 overflow-y-auto z-10`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">{t('admin.chn_hnh_nh')}</h4>
                <button
                  type="button"
                  onClick={() => setShowImagePicker(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder={t('admin.tm_kim_hnh_nh')}
                  value={imageSearchTerm}
                  onChange={(e) => setImageSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${currentTheme.input}`}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {filteredImages.length > 0 ? (
                  filteredImages.map((image) => (
                    <div
                      key={image.url}
                      onClick={() => handleImageSelect(image)}
                      className={`cursor-pointer p-1 rounded-lg hover:bg-gray-600 ${formData.image === image.url ? 'border-2 border-blue-500' : ''}`}
                    >
                      <img
                        src={image.url}
                        alt={image.url}
                        className="h-20 w-full object-cover rounded-lg"
                      />
                      <p className="text-xs truncate mt-1">{image.url.split('/').pop()}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-400">
                    Không tìm thấy hình ảnh
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className={`px-4 py-2 rounded-lg transition-colors ${currentTheme.buttonSecondary}`}
              disabled={formData.isLoading}
            >{t('common.cancel')}</button>
            <button
              type="submit"
              disabled={formData.isLoading}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${currentTheme.buttonPrimary}`}
            >
              {formData.isLoading && <Loader2 size={18} className="animate-spin mr-2" />}
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Mousepads component
const Mousepads = memo(
  ({
    activeMenu,
    mousepads = [],
    theme = 'dark',
    createProduct,
    updateProduct,
    getProductById,
    loading,
    validCategoryIds = [11, 12, 13],
    images = [],
  }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formState, setFormState] = useState({
      isOpen: false,
      formType: null, // 'add' or 'edit'
      currentMousepad: null,
    });
    const [localMousepads, setLocalMousepads] = useState(mousepads);
    const [isSynced, setIsSynced] = useState(true);
console.log(getProductById);

    useEffect(() => {
      if (isSynced) {
        setLocalMousepads(mousepads);
      }
    }, [mousepads, isSynced]);

    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => {
          setError(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [error]);

    if (activeMenu !== 'Mousepad') return null;

    const formatPrice = (price) => {
      if (price === undefined || price === null) return 'N/A';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    };

    const filteredMousepads = searchTerm.trim() === ''
      ? localMousepads
      : localMousepads.filter((item) =>
          (item?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

    const themeClasses = {
      dark: {
        container: 'bg-gray-900 text-gray-200',
        table: 'bg-gray-800 border-gray-700',
        tableHeader: 'bg-gray-900 text-gray-300',
        tableRow: 'hover:bg-gray-700 text-gray-200',
        secondaryText: 'text-gray-400',
        input: 'bg-gray-800 border-gray-600 text-gray-200 focus:ring-blue-500',
        emptyState: 'text-gray-400',
        buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md',
        buttonIcon: 'text-gray-400 hover:text-gray-200 bg-gray-700 hover:bg-gray-600 p-2 rounded-full shadow-sm',
      },
      light: {
        container: 'bg-white text-gray-800',
        table: 'bg-white border-gray-300',
        tableHeader: 'bg-gray-200 text-gray-700',
        tableRow: 'hover:bg-gray-200 text-gray-800',
        secondaryText: 'text-gray-600',
        input: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400',
        emptyState: 'text-gray-500',
        buttonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md',
        buttonIcon: 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-sm',
      },
    };

    const currentTheme = themeClasses[theme] || themeClasses.dark;

    const handleAdd = () => {
      setFormState({
        isOpen: true,
        formType: 'add',
        currentMousepad: null,
      });
    };

    const handleEdit = (mousepad) => {
      setFormState({
        isOpen: true,
        formType: 'edit',
        currentMousepad: mousepad,
      });
    };

    const handleSave = async (productData) => {
      try {
        setIsLoading(true);
        setIsSynced(false);
        if (formState.formType === 'add') {
          const newProduct = await createProduct(productData);
          if (!newProduct.id && !newProduct.productID) {
            throw new Error('API không trả về ID sản phẩm');
          }
          setLocalMousepads((prev) => [
            ...prev,
            {
              ...productData,
              id: newProduct.id || newProduct.productID,
            },
          ]);
        } else {
          const productId = formState.currentMousepad?.id || formState.currentMousepad?.productID;
          if (!productId) {
            throw new Error(t('remaining.no_product_id'));
          }
          await updateProduct(productId, productData);
          setLocalMousepads((prev) =>
            prev.map((item) =>
              (item.id || item.productID) === productId
                ? { ...item, ...productData }
                : item
            )
          );
        }
        setFormState((prev) => ({ ...prev, isOpen: false }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error saving mousepad:', error);
        setError(error.message || 'Không thể lưu bàn di chuột');
        setIsLoading(false);
        throw error;
      }
    };

    return (
      <div className={`p-6 ${currentTheme.container}`}>
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
            <button
              className="ml-auto text-white hover:text-gray-200"
              onClick={() => setError(null)}
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{t('admin.danh_sch_bn_di')}</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAdd}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentTheme.buttonPrimary}`}
            >
              <Plus size={18} />
              <span>{t('admin.thm')}</span>
            </button>
            <div className="relative w-64">
              <input
                type="text"
                placeholder={t('admin.tm_kim_bn_di')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${currentTheme.input}`}
              />
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.secondaryText}`}
                size={20}
              />
            </div>
          </div>
        </div>

        {(loading || isLoading) && localMousepads.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.secondaryText}`}>
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>{t('admin.ang_ti_d_liu')}</span>
          </div>
        )}

        {!loading && !isLoading && localMousepads.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
            <ImageOff className="mr-2" size={24} />
            <span>{t('remaining.no_mousepad_found')}</span>
          </div>
        )}

        {!loading && !isLoading && localMousepads.length > 0 && filteredMousepads.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
            <ImageOff className="mr-2" size={24} />
            <span>{t('remaining.no_mousepad_match')}</span>
          </div>
        )}

        {localMousepads.length > 0 && filteredMousepads.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className={`min-w-full border ${currentTheme.table}`}>
              <thead className={currentTheme.tableHeader}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.hnh_nh')}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.tn_sn_phm')}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.m_t')}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('product.price')}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.tn_kho')}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('admin.hng')}</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-300'}`}>
                {filteredMousepads.map((mousepad, index) => (
                  <tr
                    key={mousepad.id || mousepad.productID || `mousepad-${index}`}
                    className={`transition-colors duration-150 ${currentTheme.tableRow}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-12 bg-gray-700 rounded-lg flex items-center justify-center">
                        {mousepad.imageUrl ? (
                          <img
                            src={mousepad.imageUrl}
                            alt={mousepad.name || 'Mousepad'}
                            className="h-12 w-12 object-cover rounded-lg shadow-sm"
                            onError={(e) => (e.target.src = '')}
                          />
                        ) : (
                          <ImageOff
                            className={currentTheme.secondaryText}
                            size={24}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {mousepad.name || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}>
                      <div className="max-w-xs truncate">{mousepad.description || 'Không có mô tả'}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                        {formatPrice(mousepad.unitPrice)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                        {mousepad.quantity !== undefined ? mousepad.quantity : 'N/A'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                        {CATEGORY_BRAND_MAPPING[mousepad.categoryId] || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEdit(mousepad)}
                        className={`transition-colors ${currentTheme.buttonIcon}`}
                        title={t('admin.chnh_sa')}
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {formState.isOpen && (
          <MousepadForm
            mousepad={formState.currentMousepad}
            onSave={handleSave}
            onCancel={() => setFormState((prev) => ({ ...prev, isOpen: false }))}
            formTitle={formState.formType === 'add' ? 'Thêm bàn di chuột mới' : 'Chỉnh sửa bàn di chuột'}
            theme={theme}
            validCategoryIds={validCategoryIds}
            images={images}
          />
        )}
      </div>
    );
  }
);

export default Mousepads;
// Updated: 2025-10-12T16:06:37.800Z

// Updated: 2025-10-12T16:09:11.543Z
