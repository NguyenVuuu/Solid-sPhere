import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from 'react-i18next';
import { updateUserProfile, changePassword } from "../../apis/userApi";
import notify from "../../utils/notify";

function ProfileDashboard() {
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [editAccountInfo, setEditAccountInfo] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: ''
    });
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [editLoading, setEditLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [editError, setEditError] = useState('');
    const [changePasswordError, setChangePasswordError] = useState('');

    const handleEditButtonClick = () => {
        setEditAccountInfo({
            fullName: user?.fullName || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            address: user?.address || ''
        });
        setEditError('');
        setIsEditOpen(true);
    };

    const closeEditForm = () => {
        setIsEditOpen(false);
        setEditError('');
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditAccountInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveAccountInfo = async () => {
        try {
            setEditLoading(true);
            setEditError('');
            await updateUserProfile(user?.id, editAccountInfo);
            notify.success('Thông tin tài khoản đã được cập nhật thành công!');
            setIsEditOpen(false);
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin tài khoản:', error);
            setEditError(error.response?.data?.message || 'Lỗi khi cập nhật thông tin.');
            notify.error(setEditError);
        } finally {
            setEditLoading(false);
        }
    };

    const handleOpenChangePasswordForm = () => {
        setIsChangePasswordOpen(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setChangePasswordError('');
    };

    const handleCloseChangePasswordForm = () => {
        setIsChangePasswordOpen(false);
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'currentPassword') setCurrentPassword(value);
        else if (name === 'newPassword') setNewPassword(value);
        else if (name === 'confirmNewPassword') setConfirmNewPassword(value);
    };

    const handleChangePasswordSubmit = async () => {
        setChangePasswordError('');

        if (newPassword !== confirmNewPassword) {
            setChangePasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        if (newPassword.length < 6) {
            setChangePasswordError('Mật khẩu mới phải có ít nhất 6 ký tự.');
            return;
        }

        try {
            setPasswordLoading(true);
            await changePassword(user?.id, {
                currentPassword,
                newPassword
            });
            notify.success('Đổi mật khẩu thành công!');
            setTimeout(handleCloseChangePasswordForm, 1000);
        } catch (error) {
            console.error('Lỗi khi đổi mật khẩu:', error);
            setChangePasswordError(error.response?.data?.message || 'Lỗi khi đổi mật khẩu.');
            notify.error(setChangePasswordError);
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-light text-gray-900">{t('account.contact_information')}</h2>
                        <p className="text-gray-600 mt-1 text-sm">Update your personal information</p>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="text-sm text-gray-600">Full Name</p>
                            <p className="text-lg text-gray-900 font-medium">{user?.fullName || '—'}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="text-lg text-gray-900 font-medium">{user?.email || '—'}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="text-sm text-gray-600">Phone Number</p>
                            <p className="text-lg text-gray-900 font-medium">{user?.phoneNumber || '—'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleEditButtonClick}
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                    >
                        {t('account.edit')}
                    </button>
                    <button
                        onClick={handleOpenChangePasswordForm}
                        className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition text-sm font-medium"
                    >
                        {t('account.change_password')}
                    </button>
                </div>
            </div>

            {/* Edit Account Info Form - Inline */}
            {isEditOpen && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-2xl font-light text-gray-900 mb-6">{t('account.edit_account_information')}</h2>
                    
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('account.full_name')}</label>
                            <input
                                type="text"
                                name="fullName"
                                value={editAccountInfo.fullName}
                                onChange={handleEditInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('cart.email')}</label>
                            <input
                                type="email"
                                name="email"
                                value={editAccountInfo.email}
                                onChange={handleEditInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('account.phone_number')}</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={editAccountInfo.phoneNumber}
                                onChange={handleEditInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.address')}</label>
                            <textarea
                                name="address"
                                value={editAccountInfo.address}
                                onChange={handleEditInputChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                            />
                        </div>
                    </div>

                    {editError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                            <p className="text-red-700 text-sm">{editError}</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={handleSaveAccountInfo}
                            disabled={editLoading}
                            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {editLoading ? 'Đang lưu...' : t('common.save')}
                        </button>
                        <button
                            onClick={closeEditForm}
                            className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                        >
                            {t('common.close')}
                        </button>
                    </div>
                </div>
            )}

            {/* Change Password Form - Inline */}
            {isChangePasswordOpen && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="text-2xl font-light text-gray-900 mb-6">{t('account.i_mt_khu')}</h2>
                    
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('account.mt_khu_hin_ti')}</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={currentPassword}
                                onChange={handlePasswordInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('account.mt_khu_mi')}</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={handlePasswordInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('account.xc_nhn_mt_khu')}</label>
                            <input
                                type="password"
                                name="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={handlePasswordInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {changePasswordError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                            <p className="text-red-700 text-sm">{changePasswordError}</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={handleChangePasswordSubmit}
                            disabled={passwordLoading}
                            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {passwordLoading ? 'Đang lưu...' : t('account.lu_thay_i')}
                        </button>
                        <button
                            onClick={handleCloseChangePasswordForm}
                            className="px-6 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                        >
                            {t('common.cancel')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDashboard;
