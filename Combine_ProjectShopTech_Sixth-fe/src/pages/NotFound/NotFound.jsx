import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="pt-40 min-h-screen bg-white">
        {/* Header-style typography on white background */}
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-6 py-14 text-center">
            <h1
              className="text-6xl md:text-7xl font-extrabold tracking-tight mx-auto"
              style={{
                background:
                  "linear-gradient(90deg, #000000 0%, #111827 15%, #4c1d95 60%, #7c3aed 85%, #4c1d95 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              404
            </h1>
            <p
              className="mt-3 text-xl font-semibold"
              style={{
                background:
                  "linear-gradient(90deg, #4c1d95 0%, #7c3aed 40%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              {t("notfound.title") || "Trang không tìm thấy"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {t("notfound.message") || "Đường dẫn bạn truy cập có thể không tồn tại hoặc bạn không có quyền."}
            </p>
          </div>
        </section>

        {/* Nội dung tối giản */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
            <p className="text-gray-600 text-base md:text-lg">
              {t("notfound.submessage") || "Bạn có thể quay lại trang trước hoặc tiếp tục khám phá cửa hàng."}
            </p>
            <div className="mt-8 flex items-center justify-center">
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-black via-gray-900 to-purple-950 hover:opacity-90 transition-opacity"
              >
                {t("notfound.go_back") || "Quay lại"}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;

