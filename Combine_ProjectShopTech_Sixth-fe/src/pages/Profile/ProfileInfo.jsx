import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from 'react-i18next';
import { getUserInfo } from "../../apis/userApi";

function ProfileInfo() {
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                // Call API to get full user info from database
                const response = await getUserInfo(user?.id);
                setUserInfo(response);
                setError(null);
            } catch (err) {
                console.error("Error fetching user info:", err);
                setError("Failed to load user information");
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchUserInfo();
        }
    }, [user?.id]);

    if (loading) {
        return <div className="text-center py-12"><p className="text-gray-600">Loading...</p></div>;
    }

    if (error) {
        return <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>;
    }

    const info = userInfo || user;

    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 mb-2">Full Name</p>
                        <p className="text-lg text-gray-900 font-medium">{info?.fullName || '—'}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 mb-2">Email</p>
                        <p className="text-lg text-gray-900 font-medium">{info?.email || '—'}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 mb-2">Phone Number</p>
                        <p className="text-lg text-gray-900 font-medium">{info?.phoneNumber || '—'}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 mb-2">Date of Birth</p>
                        <p className="text-lg text-gray-900 font-medium">{info?.dateOfBirth || '—'}</p>
                    </div>
                </div>
            </div>

            {/* Contact & Address */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Contact & Address</h2>
                
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 mb-2">Address</p>
                        <p className="text-lg text-gray-900 font-medium">{info?.address || '—'}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 mb-2">City</p>
                        <p className="text-lg text-gray-900 font-medium">{info?.city || '—'}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 mb-2">State/Province</p>
                        <p className="text-lg text-gray-900 font-medium">{info?.state || '—'}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 mb-2">Postal Code</p>
                        <p className="text-lg text-gray-900 font-medium">{info?.postalCode || '—'}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-600 mb-2">Country</p>
                        <p className="text-lg text-gray-900 font-medium">{info?.country || '—'}</p>
                    </div>
                </div>
            </div>

            {/* Account Statistics */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Account Statistics</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border-l-4 border-gray-900 pl-4 py-2">
                        <p className="text-sm text-gray-600">Total Points</p>
                        <p className="text-2xl font-semibold text-gray-900">{info?.point || 0}</p>
                    </div>
                    <div className="border-l-4 border-gray-900 pl-4 py-2">
                        <p className="text-sm text-gray-600">Games Played</p>
                        <p className="text-2xl font-semibold text-gray-900">{info?.numberOfGamesPlayed || 0}</p>
                    </div>
                    <div className="border-l-4 border-gray-900 pl-4 py-2">
                        <p className="text-sm text-gray-600">Plays Allowed</p>
                        <p className="text-2xl font-semibold text-gray-900">{info?.numberOfPlaysAllowed || 0}</p>
                    </div>
                    <div className="border-l-4 border-gray-900 pl-4 py-2">
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-semibold text-gray-900">{info?.totalOrders || 0}</p>
                    </div>
                    <div className="border-l-4 border-gray-900 pl-4 py-2">
                        <p className="text-sm text-gray-600">Total Spent</p>
                        <p className="text-2xl font-semibold text-gray-900">${info?.totalSpent || 0}</p>
                    </div>
                    <div className="border-l-4 border-gray-900 pl-4 py-2">
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="text-sm font-semibold text-gray-900">{info?.createdAt ? new Date(info.createdAt).toLocaleDateString() : '—'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
