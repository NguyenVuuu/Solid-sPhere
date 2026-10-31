import React, { useState } from 'react';
import { FaUserShield, FaPlus, FaEdit, FaTrash, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const PermissionsPage = () => {
  const { t } = useTranslation();

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full system access",
      userCount: 5,
      permissions: ["create", "read", "update", "delete", "manage_users", "manage_products", "view_reports"]
    },
    {
      id: 2,
      name: "Manager",
      description: "Store management access",
      userCount: 12,
      permissions: ["create", "read", "update", "manage_products", "view_reports"]
    },
    {
      id: 3,
      name: "Staff",
      description: "Basic staff access",
      userCount: 45,
      permissions: ["read", "update"]
    },
    {
      id: 4,
      name: "Customer",
      description: "Customer access",
      userCount: 1250,
      permissions: ["read"]
    }
  ]);

  const allPermissions = [
    { id: "create", name: "Create", description: "Create new records" },
    { id: "read", name: "Read", description: "View records" },
    { id: "update", name: "Update", description: "Edit existing records" },
    { id: "delete", name: "Delete", description: "Remove records" },
    { id: "manage_users", name: "Manage Users", description: "User management" },
    { id: "manage_products", name: "Manage Products", description: "Product management" },
    { id: "view_reports", name: "View Reports", description: "Access to reports" },
    { id: "manage_orders", name: "Manage Orders", description: "Order management" },
  ];

  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getRoleColor = (roleName) => {
    switch (roleName.toLowerCase()) {
      case 'admin':
        return 'from-red-600 to-pink-600';
      case 'manager':
        return 'from-purple-600 to-blue-600';
      case 'staff':
        return 'from-blue-600 to-cyan-600';
      case 'customer':
        return 'from-green-600 to-teal-600';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{t('common.roles_permissions')}</h1>
              <p className="text-purple-200">{t('common.manage_user_roles_and')}</p>
            </div>
            <button
              onClick={() => {
                setSelectedRole(null);
                setIsModalOpen(true);
              }}
              className="px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaPlus />
              Create Role
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.total_roles')}</p>
                <p className="text-3xl font-bold text-gray-900">{roles.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaUserShield className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.total_users')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {roles.reduce((sum, r) => sum + r.userCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUserShield className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.permissions')}</p>
                <p className="text-3xl font-bold text-gray-900">{allPermissions.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheck className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.admin_roles')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {roles.filter(r => r.name.toLowerCase() === 'admin').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FaUserShield className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search_roles')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRoles.map((role) => (
            <div key={role.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className={`bg-gradient-to-r ${getRoleColor(role.name)} p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaUserShield className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xl">{role.name}</h3>
                      <p className="text-white/80 text-sm">{role.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full font-semibold">
                    {role.userCount} users
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full font-semibold">
                    {role.permissions.length} permissions
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">{t('remaining.permissions')}</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-1"
                    >
                      <FaCheck className="text-xs" />
                      {perm.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <FaEdit />{t('account.edit')}</button>
                  <button className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRoles.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserShield className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('common.no_roles_found')}</h3>
            <p className="text-gray-600">{t('common.try_adjusting_your_search')}</p>
          </div>
        )}

        {/* Edit/Create Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-28">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold">
                  {selectedRole ? 'Edit Role' : 'Create New Role'}
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('common.role_name')}</label>
                    <input
                      type="text"
                      placeholder={t('common.eg_manager')}
                      defaultValue={selectedRole?.name || ''}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('remaining.description')}</label>
                    <textarea
                      placeholder={t('common.describe_the_role')}
                      defaultValue={selectedRole?.description || ''}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">{t('common.permissions')}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {allPermissions.map((perm) => (
                        <label
                          key={perm.id}
                          className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-purple-400 cursor-pointer transition-all"
                        >
                          <input
                            type="checkbox"
                            defaultChecked={selectedRole?.permissions.includes(perm.id)}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{perm.name}</p>
                            <p className="text-xs text-gray-600">{perm.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all">
                    {selectedRole ? 'Update Role' : 'Create Role'}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionsPage;

// Updated: 2025-10-12T16:06:46.691Z

// Updated: 2025-10-12T16:08:59.117Z
