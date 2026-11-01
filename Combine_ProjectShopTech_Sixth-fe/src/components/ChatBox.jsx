import React, { useState, useEffect, useRef, memo, useContext } from "react";
import { UserContext } from "../context/UserContext";

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || "http://localhost:5000";

const ChatBox = () => {
  const { isCustomerService, isAdmin } = useContext(UserContext);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // ── Tất cả hooks phải khai báo trước mọi conditional return ──
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [colorTheme, setColorTheme] = useState("gradient");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesContainerRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputRefMultiple = useRef(null);
  const [sessionId] = useState(() => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });

  // Lắng nghe thay đổi URL
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Lắng nghe popstate (back/forward browser)
    window.addEventListener('popstate', handleLocationChange);
    
    // Lắng nghe pushState/replaceState (React Router navigation)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      handleLocationChange();
    };
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  // ── Conditional returns SAU khi đã khai báo hết hooks ──

  // Ẩn ChatBox nếu user là nhân viên chăm sóc khách hàng
  // Keep this hook before the role/path early returns so hook order remains
  // stable when logging in or out as admin/customer service.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isCustomerService) {
    return null;
  }

  // Ẩn ChatBox trên trang admin, employee và customer-service
  if (currentPath.startsWith('/admin') || 
      currentPath.startsWith('/employee') || 
      currentPath.startsWith('/customer-service')) {
    return null;
  }

  // Ẩn ChatBox nếu user là admin
  if (isAdmin) {
    return null;
  }

  // Enhanced theme configuration with modern 2025 aesthetics
  const themes = {
    messenger: {
      bgPrimary: "bg-gradient-to-r from-blue-500 to-blue-600",
      bgSecondary: "bg-gradient-to-br from-blue-50 via-white to-indigo-50",
      textPrimary: "text-white",
      textSecondary: "text-blue-600",
      hoverBg: "hover:bg-blue-100/80",
      hoverText: "hover:text-blue-800",
      borderColor: "border-blue-200/60",
      buttonBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      buttonHover: "hover:from-blue-600 hover:to-blue-700 hover:scale-105",
      animateColor: "bg-blue-500",
      glowColor: "shadow-blue-500/25",
      accentGlow: "shadow-lg shadow-blue-500/30"
    },
    crimson: {
      bgPrimary: "bg-gradient-to-r from-red-500 to-rose-600",
      bgSecondary: "bg-gradient-to-br from-rose-50 via-white to-red-50",
      textPrimary: "text-white",
      textSecondary: "text-red-600",
      hoverBg: "hover:bg-red-100/80",
      hoverText: "hover:text-red-800",
      borderColor: "border-red-200/60",
      buttonBg: "bg-gradient-to-r from-red-500 to-rose-600",
      buttonHover: "hover:from-red-600 hover:to-rose-700 hover:scale-105",
      animateColor: "bg-red-500",
      glowColor: "shadow-red-500/25",
      accentGlow: "shadow-lg shadow-red-500/30"
    },
    emerald: {
      bgPrimary: "bg-gradient-to-r from-emerald-500 to-teal-600",
      bgSecondary: "bg-gradient-to-br from-emerald-50 via-white to-teal-50",
      textPrimary: "text-white",
      textSecondary: "text-emerald-600",
      hoverBg: "hover:bg-emerald-100/80",
      hoverText: "hover:text-emerald-800",
      borderColor: "border-emerald-200/60",
      buttonBg: "bg-gradient-to-r from-emerald-500 to-teal-600",
      buttonHover: "hover:from-emerald-600 hover:to-teal-700 hover:scale-105",
      animateColor: "bg-emerald-500",
      glowColor: "shadow-emerald-500/25",
      accentGlow: "shadow-lg shadow-emerald-500/30"
    },
    amber: {
      bgPrimary: "bg-gradient-to-r from-amber-400 to-orange-500",
      bgSecondary: "bg-gradient-to-br from-amber-50 via-white to-orange-50",
      textPrimary: "text-white",
      textSecondary: "text-amber-600",
      hoverBg: "hover:bg-amber-100/80",
      hoverText: "hover:text-amber-800",
      borderColor: "border-amber-200/60",
      buttonBg: "bg-gradient-to-r from-amber-400 to-orange-500",
      buttonHover: "hover:from-amber-500 hover:to-orange-600 hover:scale-105",
      animateColor: "bg-amber-500",
      glowColor: "shadow-amber-500/25",
      accentGlow: "shadow-lg shadow-amber-500/30"
    },
    violet: {
      bgPrimary: "bg-gradient-to-r from-violet-500 to-purple-600",
      bgSecondary: "bg-gradient-to-br from-violet-50 via-white to-purple-50",
      textPrimary: "text-white",
      textSecondary: "text-violet-600",
      hoverBg: "hover:bg-violet-100/80",
      hoverText: "hover:text-violet-800",
      borderColor: "border-violet-200/60",
      buttonBg: "bg-gradient-to-r from-violet-500 to-purple-600",
      buttonHover: "hover:from-violet-600 hover:to-purple-700 hover:scale-105",
      animateColor: "bg-violet-500",
      glowColor: "shadow-violet-500/25",
      accentGlow: "shadow-lg shadow-violet-500/30"
    },
    rose: {
      bgPrimary: "bg-gradient-to-r from-rose-400 to-pink-600",
      bgSecondary: "bg-gradient-to-br from-rose-50 via-white to-pink-50",
      textPrimary: "text-white",
      textSecondary: "text-rose-600",
      hoverBg: "hover:bg-rose-100/80",
      hoverText: "hover:text-rose-800",
      borderColor: "border-rose-200/60",
      buttonBg: "bg-gradient-to-r from-rose-400 to-pink-600",
      buttonHover: "hover:from-rose-500 hover:to-pink-700 hover:scale-105",
      animateColor: "bg-rose-500",
      glowColor: "shadow-rose-500/25",
      accentGlow: "shadow-lg shadow-rose-500/30"
    },
    teal: {
      bgPrimary: "bg-gradient-to-r from-teal-400 to-cyan-600",
      bgSecondary: "bg-gradient-to-br from-teal-50 via-white to-cyan-50",
      textPrimary: "text-white",
      textSecondary: "text-teal-600",
      hoverBg: "hover:bg-teal-100/80",
      hoverText: "hover:text-teal-800",
      borderColor: "border-teal-200/60",
      buttonBg: "bg-gradient-to-r from-teal-400 to-cyan-600",
      buttonHover: "hover:from-teal-500 hover:to-cyan-700 hover:scale-105",
      animateColor: "bg-teal-500",
      glowColor: "shadow-teal-500/25",
      accentGlow: "shadow-lg shadow-teal-500/30"
    },
    gradient: {
      bgPrimary: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      bgSecondary: "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50",
      textPrimary: "text-white",
      textSecondary: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent",
      hoverBg: "hover:bg-gradient-to-r hover:from-indigo-100 hover:to-pink-100",
      hoverText: "hover:text-indigo-800",
      borderColor: "border-indigo-200/60",
      buttonBg: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      buttonHover: "hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:scale-105",
      animateColor: "bg-gradient-to-r from-indigo-500 to-pink-500",
      glowColor: "shadow-indigo-500/25",
      accentGlow: "shadow-xl shadow-purple-500/30"
    },
    dark: {
      bgPrimary: "bg-gradient-to-r from-gray-800 to-gray-900",
      bgSecondary: "bg-gradient-to-br from-gray-50 via-white to-slate-50",
      textPrimary: "text-white",
      textSecondary: "text-gray-800",
      hoverBg: "hover:bg-gray-200/80",
      hoverText: "hover:text-black",
      borderColor: "border-gray-300/60",
      buttonBg: "bg-gradient-to-r from-gray-800 to-gray-900",
      buttonHover: "hover:from-gray-900 hover:to-black hover:scale-105",
      animateColor: "bg-gray-700",
      glowColor: "shadow-gray-500/25",
      accentGlow: "shadow-lg shadow-gray-500/30"
    }
  };
const bubbles = [
  { top: 'top-2', left: 'left-4', size: 'w-1 h-1', delay: '0s', opacity: 'bg-white/30' },
  { top: 'top-6', right: 'right-8', size: 'w-2 h-2', delay: '1s', opacity: 'bg-white/20' },
  { bottom: 'bottom-3', left: 'left-12', size: 'w-1.5 h-1.5', delay: '2s', opacity: 'bg-white/25' },
  { top: 'top-10', left: 'left-6', size: 'w-1.5 h-1.5', delay: '1.2s', opacity: 'bg-white/30' },
  { bottom: 'bottom-6', right: 'right-10', size: 'w-2 h-2', delay: '1.6s', opacity: 'bg-white/20' },
  { top: 'top-4', right: 'right-20', size: 'w-1 h-1', delay: '2.4s', opacity: 'bg-white/15' },
  { bottom: 'bottom-10', left: 'left-8', size: 'w-1.5 h-1.5', delay: '3s', opacity: 'bg-white/20' },
  { top: 'top-8', right: 'right-4', size: 'w-2 h-2', delay: '0.8s', opacity: 'bg-white/10' },
   // Thêm nhiều bubbles hơn
  { top: 'top-3', left: 'left-10', size: 'w-1 h-1', delay: '3.5s', opacity: 'bg-white/25' },
  { bottom: 'bottom-8', right: 'right-14', size: 'w-1.5 h-1.5', delay: '4s', opacity: 'bg-white/30' },
  { top: 'top-12', left: 'left-2', size: 'w-2 h-2', delay: '2.2s', opacity: 'bg-white/20' },
  { bottom: 'bottom-5', right: 'right-6', size: 'w-1 h-1', delay: '1.8s', opacity: 'bg-white/15' },
  { top: 'top-7', left: 'left-14', size: 'w-1.5 h-1.5', delay: '2.8s', opacity: 'bg-white/10' },
  { bottom: 'bottom-12', right: 'right-2', size: 'w-2 h-2', delay: '3.2s', opacity: 'bg-white/20' },
  { top: 'top-1', right: 'right-12', size: 'w-1 h-1', delay: '0.5s', opacity: 'bg-white/30' },
  { bottom: 'bottom-4', left: 'left-6', size: 'w-1.5 h-1.5', delay: '4.5s', opacity: 'bg-white/15' },
   {
    top: 'top-[50%]',
    left: 'left-[50%]',
    size: 'w-2 h-2',
    delay: '2.5s',
    opacity: 'bg-white/30',
    extraClasses: 'transform -translate-x-1/2 -translate-y-1/2',
  },
  {
    top: 'top-[48%]',
    left: 'left-[55%]',
    size: 'w-1.5 h-1.5',
    delay: '3s',
    opacity: 'bg-white/25',
    extraClasses: 'transform -translate-x-1/2 -translate-y-1/2',
  },
  {
    top: 'top-[52%]',
    left: 'left-[42%]',
    size: 'w-1 h-1',
    delay: '3.2s',
    opacity: 'bg-white/20',
    extraClasses: 'transform -translate-x-1/2 -translate-y-1/2',
  },
  {
  top: 'top-[52%]',
  left: 'left-[58%]',
  size: 'w-2 h-2',
  delay: '2.7s',
  opacity: 'bg-white/30',
  extraClasses: 'transform -translate-x-1/2 -translate-y-1/2',
},
{
  top: 'top-[43%]',
  left: 'left-[48%]',
  size: 'w-1 h-1',
  delay: '3.5s',
  opacity: 'bg-white/15',
  extraClasses: 'transform -translate-x-1/2 -translate-y-1/2',
},
{
  top: 'top-[51%]',
  left: 'left-[59%]',
  size: 'w-1.5 h-1.5',
  delay: '3.7s',
  opacity: 'bg-white/20',
  extraClasses: 'transform -translate-x-1/2 -translate-y-1/2',
},
{
  top: 'top-[41%]',
  left: 'left-[44%]',
  size: 'w-1 h-1',
  delay: '3.9s',
  opacity: 'bg-white/10',
  extraClasses: 'transform -translate-x-1/2 -translate-y-1/2',
},
];
  const theme = themes[colorTheme];

  // Function to cycle through themes
  const cycleTheme = () => {
    const themeOptions = Object.keys(themes);
    const currentIndex = themeOptions.indexOf(colorTheme);
    const nextIndex = (currentIndex + 1) % themeOptions.length;
    setColorTheme(themeOptions[nextIndex]);
  };

  // Simulate typing indicator
  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  // Send message simulation
    const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
  setMessages((prev) => [
  ...prev,
  { sender: "user", text: input, type: "text" }
]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${CHAT_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, sessionId }),
      });
      const data = await response.json();

      // Process response
      let botMessage;
      if (!data.success) {
        botMessage = (
          <div className="text-red-600">
            {data.message || "Đã có lỗi xảy ra. Vui lòng thử lại!"}
          </div>
        );
      } else if (data.data && data.data.length > 0) {
        // Display product list with images
      botMessage = (
  <div className="space-y-4">
    <div
      className="prose prose-sm max-w-none rounded-2xl px-4 py-3 bg-gradient-to-r from-indigo-50 via-white to-pink-50 border border-gray-200 shadow-md"
      dangerouslySetInnerHTML={{ __html: data.answer }}
    />

    {data.data && data.data.length > 0 && (
      <div className="space-y-4 mt-2">
        {data.data.map((product, idx) => (
       <div
 key={idx} 
  className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
>
  <h3 className="font-semibold text-gray-800 text-base text-center">
    {product.name}
  </h3>

  {product.image && (
    <img
      src={product.image}
      alt={product.name}
      className="w-28 h-28 object-cover rounded-xl my-3 border border-gray-200"
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/80";
      }}
    />
  )}

  <p className="text-sm text-gray-600 text-center line-clamp-3">
    {product.description}
  </p>

  <p className="text-sm font-medium text-emerald-600 mt-3">
    Giá: {product.price.toLocaleString()}đ
  </p>
</div>
        ))}
      </div>
    )}

    {data.totalPrice && (
      <p className="mt-4 font-bold text-lg text-red-600 bg-red-50 px-4 py-2 rounded-xl inline-block shadow-sm">
        Tổng chi phí: {data.totalPrice.toLocaleString()}đ
      </p>
    )}
  </div>
);
      } else {
        // Display text response (fallback or vector)
        botMessage = <p>{data.answer}</p>;
      }

      setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: (
            <div className="text-red-600">
              Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại!
            </div>
          ),
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle single image upload
const handleImageUpload = async (file) => {
  if (!file) return;
  
  setIsUploading(true);
  const formData = new FormData();
  formData.append('image', file);
  formData.append('sessionId', sessionId);
  formData.append('message', 'Phân tích sản phẩm từ ảnh này');

  try {
    const response = await fetch(`${CHAT_API_URL}/api/chat`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    // Add user message with image
    setMessages((prev) => [
      ...prev,
      { 
        sender: "user", 
        text: "Đã gửi ảnh sản phẩm",
        type: "image",
        image: URL.createObjectURL(file)
      }
    ]);

    // Add bot response
    let botMessage;
    if (data.success) {
      if (data.data && data.data.length > 0) {
        botMessage = (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none rounded-2xl px-4 py-3 bg-gradient-to-r from-indigo-50 via-white to-pink-50 border border-gray-200 shadow-md"
                 dangerouslySetInnerHTML={{ __html: data.answer }} />
            <div className="space-y-4 mt-2">
              {data.data.map((product, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-base text-center">{product.name}</h3>
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-28 h-28 object-cover rounded-xl my-3 border border-gray-200" />
                  )}
                  <p className="text-sm text-gray-600 text-center">{product.description}</p>
                  <p className="text-sm font-medium text-emerald-600 mt-3">Giá: {product.price.toLocaleString()}đ</p>
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        botMessage = <p>{data.answer}</p>;
      }
    } else {
      botMessage = <div className="text-red-600">{data.message}</div>;
    }

    setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
  } catch (error) {
    console.error("Lỗi upload ảnh:", error);
    setMessages((prev) => [
      ...prev,
      { text: <div className="text-red-600">Lỗi xử lý ảnh. Vui lòng thử lại!</div>, sender: "bot" }
    ]);
  } finally {
    setIsUploading(false);
  }
};

// Handle compare images
const handleCompareImages = async (images) => {
  // ✅ VALIDATION chặt chẽ hơn
  if (!images || images.length === 0) {
    console.log("❌ No images provided for comparison");
    alert("Vui lòng chọn ảnh để so sánh!");
    return;
  }

  if (images.length !== 2) {
    console.log("❌ Invalid number of images:", images.length);
    alert("Vui lòng chọn đúng 2 ảnh để so sánh!");
    return;
  }

  // ✅ KIỂM TRA file validity
  const validImages = images.filter(img => img instanceof File && img.type.startsWith('image/'));
  if (validImages.length !== 2) {
    console.log("❌ Invalid image files");
    alert("Vui lòng chọn file ảnh hợp lệ!");
    return;
  }

  console.log("✅ Starting comparison with 2 valid images");
  setIsUploading(true);
  
  const formData = new FormData();
  validImages.forEach(image => formData.append('images', image));

  try {
    const response = await fetch(`${CHAT_API_URL}/api/chat/compare-images`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    // Add user message
    setMessages((prev) => [
      ...prev,
      { 
        sender: "user", 
        text: "So sánh 2 sản phẩm",
        type: "compare",
        images: validImages.map(img => URL.createObjectURL(img))
      }
    ]);

    // Add bot response
    let botMessage;
    if (data.success) {
      botMessage = (
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none rounded-2xl px-4 py-3 bg-gradient-to-r from-green-50 via-white to-blue-50 border border-gray-200 shadow-md"
               dangerouslySetInnerHTML={{ __html: data.comparison }} />
          
          {data.products && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {data.products.map((product, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                  <h3 className="font-semibold text-center text-sm">{product.productName}</h3>
                  <p className="text-xs text-center text-emerald-600 mt-2">
                    {product.price?.toLocaleString()}đ
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else {
      botMessage = <div className="text-red-600">{data.message}</div>;
    }

    setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
    
    console.log("✅ Comparison completed successfully");
  } catch (error) {
    console.error("❌ Comparison error:", error);
    setMessages((prev) => [
      ...prev,
      { text: <div className="text-red-600">Lỗi so sánh ảnh. Vui lòng thử lại!</div>, sender: "bot" }
    ]);
  } finally {
    // ✅ CLEANUP state sau khi hoàn thành (thành công hoặc lỗi)
    setIsUploading(false);
    setSelectedImages([]);
    setShowImagePreview(false);
    setCompareMode(false);
    console.log("🧹 Cleanup completed");
  }
};

// Handle file selection
const handleFileSelect = (e, multiple = false) => {
  const files = Array.from(e.target.files);
  
  // ✅ KIỂM TRA files có tồn tại không
  if (files.length === 0) {
    console.log("No files selected");
    return; // ✅ RETURN sớm nếu không có file
  }
  
  if (multiple) {
    if (files.length > 2) {
      alert("Chỉ được chọn tối đa 2 ảnh để so sánh!");
      return;
    }
    
    // ✅ CHỈ set selected images nếu có file
    if (files.length > 0) {
      setSelectedImages(files);
      setShowImagePreview(true);
      setCompareMode(true); // ✅ Đảm bảo compare mode được bật
    }
  } else {
    if (files[0]) {
      handleImageUpload(files[0]);
    }
  }
  
  // Reset input
  e.target.value = '';
};
  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-3">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      </div>
      <span className="text-xs text-gray-500 ml-2">AI đang soạn tin...</span>
    </div>
  );

  // Enhanced Chat button component with modern effects
  const ChatButton = ({ icon, onClick }) => (
    <div className="relative group">
      {/* Floating animation rings */}
      <div className={`absolute -inset-2 rounded-full ${theme.animateColor} opacity-20 animate-ping`}></div>
      <div className={`absolute -inset-1 rounded-full ${theme.animateColor} opacity-30 animate-pulse delay-200`}></div>
      
      {/* Unread badge */}
      {unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce z-20">
          {unreadCount > 9 ? '9+' : unreadCount}
        </div>
      )}
      
      {/* Main button with glassmorphism effect */}
      <button
        onClick={() => {
          onClick();
          setUnreadCount(0);
        }}
        className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${theme.buttonBg} ${theme.textPrimary} ${theme.buttonHover} ${theme.accentGlow} backdrop-blur-sm border border-white/20 focus:outline-none transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className={theme.buttonBg + ' absolute inset-0 rounded-full -z-10'}></div>
        <div className="transform group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
      </button>
    </div>
  );

  // Thay thế MessageBubble component hiện tại

  const MessageBubble = memo(({ message, isUser }) => (
    <div className={`group mb-6 ${isUser ? "text-right" : "text-left"} animate-fadeIn`}>
      <div className="flex items-start space-x-2">
        {!isUser && (
          <div className={`w-8 h-8 rounded-full ${theme.buttonBg} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
            AI
          </div>
        )}
        <div className="flex-1">
          <div
            className={`inline-block p-4 rounded-2xl max-w-[80%] shadow-lg backdrop-blur-sm border transition-all duration-200 hover:scale-[1.02] ${
              isUser
                ? `${theme.buttonBg} ${theme.textPrimary} ml-auto rounded-br-md border-white/20`
                : `bg-white/80 text-gray-800 border-gray-200/60 rounded-bl-md`
            }`}
            style={isUser ? {
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
              backdropFilter: 'blur(10px)',
            } : {}}
          >
            {isUser && <div className={theme.buttonBg + ' absolute inset-0 rounded-2xl rounded-br-md -z-10'}></div>}
            
            <div className="relative z-10">
              {/* Display image for user messages */}
              {message.type === "image" && message.image && (
                <div className="mb-2">
                  <img 
                    src={message.image} 
                    alt="Uploaded" 
                    className="max-w-[200px] rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              )}
              
              {/* Display multiple images for compare */}
              {message.type === "compare" && message.images && (
                <div className="mb-2 grid grid-cols-2 gap-2">
                  {message.images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`Compare ${idx + 1}`} 
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                  ))}
                </div>
              )}
              
              {message.text}
            </div>
          </div>
          <div className={`text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp?.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        {isUser && (
          <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
            You
          </div>
        )}
      </div>
    </div>
  ));

  // Thêm component này trước return statement

// THAY THẾ ImagePreviewModal component:

const ImagePreviewModal = () => (
  showImagePreview && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]" onClick={() => setShowImagePreview(false)}>
      <div className="bg-white rounded-2xl p-6 max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-4 text-center">Xác nhận so sánh</h3>
        
        {/* ✅ KIỂM TRA selectedImages có tồn tại */}
        {selectedImages && selectedImages.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {selectedImages.map((image, idx) => (
                <div key={idx} className="text-center">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ảnh {idx + 1}</p>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  console.log("🚫 User cancelled comparison");
                  setShowImagePreview(false);
                  setSelectedImages([]);
                  setCompareMode(false); // ✅ Reset compare mode
                }}
                className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  console.log("✅ User confirmed comparison with", selectedImages.length, "images");
                  handleCompareImages(selectedImages);
                }}
                className={`flex-1 py-2 ${theme.buttonBg} ${theme.textPrimary} rounded-lg ${theme.buttonHover} transition-all`}
                disabled={isUploading}
              >
                {isUploading ? "Đang xử lý..." : "So sánh"}
              </button>
            </div>
          </>
        ) : (
          // ✅ FALLBACK khi không có ảnh
          <div className="text-center">
            <p className="text-gray-500 mb-4">Không có ảnh nào được chọn</p>
            <button
              onClick={() => {
                setShowImagePreview(false);
                setSelectedImages([]);
                setCompareMode(false);
              }}
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  )
);

  return (
    <div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        /* Glassmorphism input */
        .glass-input {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        /* Floating particles animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat toggle button */}
        {!open && (
          <ChatButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            }
            onClick={() => setOpen(true)}
          />
        )}

        {/* Enhanced Chat window with glassmorphism */}
        {open && (
          <div className="fixed bottom-4 right-4 w-[380px] h-[550px] flex flex-col rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/20"
               style={{
                 background: 'rgba(255, 255, 255, 0.95)',
                 backdropFilter: 'blur(20px)',
               }}>
            
            {/* Enhanced Header with floating particles */}
            <div className={`relative px-6 py-5 ${theme.bgPrimary} ${theme.textPrimary} ${theme.accentGlow}`}>
              {/* Floating particles */}
              {/* <div className="absolute top-2 left-4 w-1 h-1 bg-white/30 rounded-full float-animation"></div>
              <div className="absolute top-6 right-8 w-2 h-2 bg-white/20 rounded-full float-animation" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-3 left-12 w-1.5 h-1.5 bg-white/25 rounded-full float-animation" style={{animationDelay: '2s'}}></div> */}
              {/* Extra floating particles */}
{/* <div className="absolute top-10 left-6 w-1.5 h-1.5 bg-white/30 rounded-full float-animation" style={{animationDelay: '1.2s'}}></div>
<div className="absolute bottom-6 right-10 w-2 h-2 bg-white/20 rounded-full float-animation" style={{animationDelay: '1.6s'}}></div>
<div className="absolute top-4 right-20 w-1 h-1 bg-white/15 rounded-full float-animation" style={{animationDelay: '2.4s'}}></div>
<div className="absolute bottom-10 left-8 w-1.5 h-1.5 bg-white/20 rounded-full float-animation" style={{animationDelay: '3s'}}></div>
<div className="absolute top-8 right-4 w-2 h-2 bg-white/10 rounded-full float-animation" style={{animationDelay: '0.8s'}}></div> */}
{bubbles.map((b, idx) => (
  <div
    key={idx}
    className={`absolute ${b.top || ''} ${b.bottom || ''} ${b.left || ''} ${b.right || ''} ${b.size} ${b.opacity} rounded-full float-animation`}
    style={{ animationDelay: b.delay }}
  ></div>
))}

              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
<div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
  <img
    src="https://cdn-icons-png.flaticon.com/512/14958/14958350.png"
    alt="AI Assistant"
    className="w-8 h-8 object-contain"
  />
</div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Chat Bot AI</h2>
                    <p className="text-xs opacity-80">Luôn sẵn sàng hỗ trợ bạn</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={cycleTheme}
                    className="text-xs opacity-70 bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                    title="Thay đổi giao diện"
                  >
                    🎨
                  </button>
                  <button 
                    onClick={() => setOpen(false)} 
                    className="focus:outline-none p-1 rounded-full hover:bg-white/10 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Chat content */}
            <div className={`flex-1 p-6 overflow-y-auto custom-scrollbar ${theme.bgSecondary}`} ref={messagesEndRef} >
              {messages.length === 0 && (
                <div className="bg-white/80 backdrop-blur-sm text-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200/60 text-center animate-fadeIn">
                  <div className="mb-4">
                    <span className="text-4xl">👋</span>
                  </div>
                  <p className="mb-3 font-semibold text-lg">Chào mừng bạn!</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Tôi là Chat Bot AI  của website <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> chàng Taro</span>. 
                    <br />Hãy hỏi về sản phẩm hoặc gõ <span className={`font-bold ${theme.textSecondary}`}>đặt lịch</span> để đặt lịch hẹn.
                  </p>
                </div>
              )}
              
              {messages.map((msg, index) => (
                <MessageBubble key={index} message={msg} isUser={msg.sender === 'user'} />
              ))}
              
              {isTyping && (
                <div className="text-left mb-4">
                  <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl rounded-bl-md border border-gray-200/60 shadow-lg">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input section with glassmorphism and image upload */}
            <div className="p-4 border-t border-gray-200/60 bg-white/50 backdrop-blur-sm">
  <div className="flex items-center space-x-3">
    <div className="flex-1 relative">
      <input
        type="text"
        className="glass-input w-full rounded-full px-5 py-3 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 placeholder-gray-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập tin nhắn của bạn..."
        disabled={loading || isUploading}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !loading && !isUploading) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      
      {/* Image upload buttons */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
        {/* Single image upload */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-blue-50"
          disabled={loading || isUploading}
          title="Upload ảnh sản phẩm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Compare images upload */}
        <button 
          onClick={() => {
            setCompareMode(true);
            fileInputRefMultiple.current?.click();
          }}
          className="text-gray-400 hover:text-green-500 transition-colors p-1 rounded-full hover:bg-green-50"
          disabled={loading || isUploading}
          title="So sánh 2 ảnh sản phẩm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    
    <button
      className={`${theme.buttonBg} ${theme.textPrimary} rounded-full w-12 h-12 flex items-center justify-center focus:outline-none disabled:opacity-50 transition-all duration-200 ${theme.buttonHover} ${theme.accentGlow} backdrop-blur-sm border border-white/20 hover:rotate-12 hover:scale-110`}
      onClick={sendMessage}
      disabled={loading || isUploading}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className={theme.buttonBg + ' absolute inset-0 rounded-full -z-10'}></div>
      {(loading || isUploading) ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      )}
    </button>
  </div>
  
  {/* Quick action buttons - updated */}
  <div className="flex space-x-2 mt-3 justify-center">
    <button 
      onClick={() => fileInputRef.current?.click()}
      className="text-xs bg-blue-100/80 hover:bg-blue-200/80 px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm border border-blue-200/60"
      disabled={loading || isUploading}
    >
      📷 Tìm sản phẩm
    </button>
    <button 
      onClick={() => fileInputRefMultiple.current?.click()}
      className="text-xs bg-green-100/80 hover:bg-green-200/80 px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm border border-green-200/60"
      disabled={loading || isUploading}
    >
      🔄 So sánh SP = ảnh
    </button>
   
  </div>
  
  {/* Hidden file inputs */}
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={(e) => handleFileSelect(e, false)}
    className="hidden"
  />
  <input
    ref={fileInputRefMultiple}
    type="file"
    accept="image/*"
    multiple
    onChange={(e) => handleFileSelect(e, true)}
    className="hidden"
  />
</div>

{/* Image Preview Modal */}
<ImagePreviewModal />
          </div>
     )}
      </div>
    </div>
  );
};

export default ChatBox;
