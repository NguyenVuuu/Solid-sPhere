import Support from "../../components/Support/Support";
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import path from "../../constant/path";
import { useTranslation } from 'react-i18next';

function ProfileLayout() {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-gray-200">
                <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                        <Link to={path.home} className="hover:text-gray-900 transition">{t('product.home')}</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">My Dashboard</span>
                    </div>
                    <h1 className="text-4xl font-light text-gray-900">
                        My Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Manage your account and preferences</p>
                </div>
            </div>

            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Minimal Design */}
                    <aside className="lg:col-span-1">
                        <nav className="space-y-1">
                            <Link
                                to={path.profile}
                                className={`block px-4 py-3 rounded-lg transition ${
                                    location.pathname === path.profile
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-sm font-medium">Account Dashboard</span>
                            </Link>
                            <Link
                                to={`${path.profile}/info`}
                                className={`block px-4 py-3 rounded-lg transition ${
                                    location.pathname === `${path.profile}/info`
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-sm font-medium">{t('account.account_information')}</span>
                            </Link>
                            <Link
                                to={`${path.profile}/my-orders`}
                                className={`block px-4 py-3 rounded-lg transition ${
                                    location.pathname === `${path.profile}/my-orders`
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-sm font-medium">{t('account.my_orders')}</span>
                            </Link>
                            <Link
                                to={`${path.profile}/my-favourite`}
                                className={`block px-4 py-3 rounded-lg transition ${
                                    location.pathname === `${path.profile}/my-favourite`
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-sm font-medium">My Favourite</span>
                            </Link>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3 space-y-6">
                        <Outlet />
                    </main>
                </div>
            </div>

            <Support></Support>
        </div>
    );
}

export default ProfileLayout;
