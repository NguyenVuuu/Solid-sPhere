import { useState } from 'react';
import { FaUserTie, FaUsers, FaUserShield, FaEdit, FaTrash, FaPlus, FaSearch, FaEnvelope, FaPhone, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const StaffManagement = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const staff = [
    {
      id: 'STAFF-001',
      name: 'Nguyễn Văn Admin',
      email: 'admin@techstore.com',
      phone: '0901111111',
      role: 'Manager',
      department: t('admin.management'),
      salary: 25000000,
      joinDate: '2022-01-15',
      status: 'active',
      avatar: 'NVA'
    },
    {
      id: 'STAFF-002',
      name: 'Trần Thị Sales',
      email: 'sales1@techstore.com',
      phone: '0902222222',
      role: 'Sales',
      department: 'Sales',
      salary: 15000000,
      joinDate: '2023-03-20',
      status: 'active',
      avatar: 'TTS'
    },
    {
      id: 'STAFF-003',
      name: 'Lê Văn Tech',
      email: 'tech1@techstore.com',
      phone: '0903333333',
      role: 'Technician',
      department: 'Technical Support',
      salary: 18000000,
      joinDate: '2023-06-10',
      status: 'active',
      avatar: 'LVT'
    },
    {
      id: 'STAFF-004',
      name: 'Phạm Thị Warehouse',
      email: 'warehouse1@techstore.com',
      phone: '0904444444',
      role: 'Warehouse',
      department: 'Logistics',
      salary: 12000000,
      joinDate: '2023-09-05',
      status: 'active',
      avatar: 'PTW'
    },
    {
      id: 'STAFF-005',
      name: 'Hoàng Văn Sales',
      email: 'sales2@techstore.com',
      phone: '0905555555',
      role: 'Sales',
      department: 'Sales',
      salary: 16000000,
      joinDate: '2024-01-12',
      status: 'active',
      avatar: 'HVS'
    },
    {
      id: 'STAFF-006',
      name: 'Vũ Thị Marketing',
      email: 'marketing@techstore.com',
      phone: '0906666666',
      role: 'Marketing',
      department: 'Marketing',
      salary: 17000000,
      joinDate: '2024-02-20',
      status: 'active',
      avatar: 'VTM'
    }
  ];

  const roles = [
    { id: 'all', name: 'All Staff', icon: FaUsers, color: 'gray' },
    { id: 'Manager', name: 'Managers', icon: FaUserShield, color: 'purple' },
    { id: 'Sales', name: 'Sales', icon: FaBriefcase, color: 'blue' },
    { id: 'Technician', name: 'Technicians', icon: FaUserTie, color: 'green' },
    { id: 'Warehouse', name: 'Warehouse', icon: FaUsers, color: 'orange' },
    { id: 'Marketing', name: 'Marketing', icon: FaUsers, color: 'pink' }
  ];

  const filteredStaff = staff.filter(member => {
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const getRoleBadge = (role) => {
    const colors = {
      Manager: 'bg-gradient-to-r from-purple-900 to-purple-950 text-white',
      Sales: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      Technician: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
      Warehouse: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
      Marketing: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
    };

    return (
      <span className={`px-4 py-1 rounded-full text-xs font-bold ${colors[role]}`}>
        {role}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { label: t('common.active'), color: 'bg-green-100 text-green-800 border-green-300' },
      inactive: { label: t('common.inactive'), color: 'bg-red-100 text-red-800 border-red-300' },
      onleave: { label: 'On Leave', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' }
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${config[status].color}`}>
        {config[status].label}
      </span>
    );
  };

  const totalSalary = staff.reduce((sum, s) => sum + s.salary, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <FaUserTie className="text-6xl mb-4 text-purple-400" />
              <h1 className="text-5xl font-bold mb-3">{t('common.staff_management')}</h1>
              <p className="text-xl text-purple-300">{t('common.manage_your_team_members')}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-purple-300 text-sm mb-1">{t('common.total_staff')}</p>
                <p className="text-4xl font-bold">{staff.length}</p>
              </div>
              <button className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2 h-fit self-end">
                <FaPlus />
                Add Staff
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-3 mb-6">
            {roles.map(role => {
              const Icon = role.icon;
              const count = role.id === 'all' ? staff.length : staff.filter(s => s.role === role.id).length;
              return (
                <button
                  key={role.id}
                  onClick={() => setFilterRole(role.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    filterRole === role.id
                      ? 'bg-gradient-to-r from-purple-900 to-purple-950 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-600'
                  }`}
                >
                  <Icon />
                  {role.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search_by_name_email')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Staff Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map(member => (
            <div 
              key={member.id}
              className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-900 to-purple-950 text-white p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-purple-900 font-bold text-2xl mx-auto mb-3 shadow-lg">
                    {member.avatar}
                  </div>
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-sm text-purple-200 mb-2">{member.id}</p>
                  {getRoleBadge(member.role)}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Status */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  {getStatusBadge(member.status)}
                  <span className="text-sm text-gray-600">{member.department}</span>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaEnvelope className="text-purple-600" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaPhone className="text-purple-600" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaCalendarAlt className="text-purple-600" />
                    <span>Joined {new Date(member.joinDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                {/* Salary */}
                <div className="bg-purple-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-600 mb-1">{t('common.monthly_salary')}</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {member.salary.toLocaleString('vi-VN')}₫
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                    <FaEdit />{t('account.edit')}</button>
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                    <FaTrash />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <FaUserTie className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('common.no_staff_members_found')}</h3>
            <p className="text-gray-600">{t('customer.try_adjusting_your_filters')}</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <FaUserShield className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{staff.filter(s => s.role === 'Manager').length}</p>
            <p className="text-purple-100">{t('common.managers')}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <FaBriefcase className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{staff.filter(s => s.role === 'Sales').length}</p>
            <p className="text-blue-100">{t('common.sales_team')}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <FaUserTie className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{staff.filter(s => s.role === 'Technician').length}</p>
            <p className="text-green-100">{t('common.technicians')}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
            <FaBriefcase className="text-4xl mb-3" />
            <p className="text-3xl font-bold">{totalSalary.toLocaleString('vi-VN')}₫</p>
            <p className="text-orange-100">{t('common.total_payroll')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
