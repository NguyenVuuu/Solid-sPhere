import React, { useState } from 'react';
import { FaComment, FaSearch, FaPaperPlane, FaUser, FaClock, FaCheckDouble } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const MessagesPage = () => {
  const { t } = useTranslation();

  const [conversations, setConversations] = useState([
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      lastMessage: "Cho em hỏi sản phẩm này còn hàng không ạ?",
      timestamp: "10:30 AM",
      unread: 2,
      status: "active"
    },
    {
      id: 2,
      customerName: "Trần Thị B",
      lastMessage: "Cảm ơn shop đã hỗ trợ nhiệt tình!",
      timestamp: "9:15 AM",
      unread: 0,
      status: "closed"
    },
    {
      id: 3,
      customerName: "Lê Văn C",
      lastMessage: "Khi nào giao hàng vậy shop?",
      timestamp: "Yesterday",
      unread: 1,
      status: "active"
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const messages = selectedConversation ? [
    {
      id: 1,
      sender: "customer",
      text: "Xin chào shop, cho em hỏi laptop này có còn hàng không ạ?",
      timestamp: "10:20 AM"
    },
    {
      id: 2,
      sender: "staff",
      text: "Chào bạn! Sản phẩm hiện đang còn hàng. Bạn có muốn đặt hàng không?",
      timestamp: "10:22 AM"
    },
    {
      id: 3,
      sender: "customer",
      text: "Vâng, em muốn đặt hàng. Thanh toán thế nào ạ?",
      timestamp: "10:30 AM"
    }
  ] : [];

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      // Add message logic here
      setMessageInput('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-purple-950 text-white rounded-2xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">{t('common.customer_messages')}</h1>
          <p className="text-purple-200">{t('common.chat_with_customers_in')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.active_chats')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {conversations.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaComment className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.unread_messages')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {conversations.reduce((sum, c) => sum + c.unread, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaCheckDouble className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('common.response_time')}</p>
                <p className="text-3xl font-bold text-gray-900">{t('common.2m')}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaClock className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ height: '600px' }}>
          <div className="grid grid-cols-3 h-full">
            {/* Conversations List */}
            <div className="col-span-1 border-r border-gray-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('common.search_conversations')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-purple-50 transition-colors ${
                      selectedConversation?.id === conv.id ? 'bg-purple-100' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {conv.customerName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {conv.customerName}
                          </h4>
                          {conv.unread > 0 && (
                            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-2 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedConversation.customerName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{selectedConversation.customerName}</h3>
                        <p className="text-sm text-gray-600">
                          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                            selectedConversation.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`}></span>
                          {selectedConversation.status === 'active' ? 'Active' : 'Closed'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-md ${msg.sender === 'staff' ? 'order-2' : 'order-1'}`}>
                          <div className={`px-4 py-3 rounded-2xl ${
                            msg.sender === 'staff'
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'bg-white text-gray-900 shadow-md'
                          }`}>
                            <p>{msg.text}</p>
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${
                            msg.sender === 'staff' ? 'text-right' : 'text-left'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder={t('common.type_your_message')}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
                      >
                        <FaPaperPlane />
                        Send
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaComment className="text-gray-400 text-4xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('common.no_conversation_selected')}</h3>
                    <p className="text-gray-600">{t('common.choose_a_conversation_to')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

// Updated: 2025-10-12T16:06:33.995Z

// Updated: 2025-10-12T16:09:04.065Z
