import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiPaypal, SiVisa, SiMastercard, SiDiscover } from "react-icons/si";
import { FaCcAmex } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Vui lòng nhập email");
      return;
    }

    setIsSubmitting(true);
    try {
      // Gửi email đăng ký newsletter
      await axios.post('/api/newsletter/subscribe', {
        email: email,
        source: 'footer'
      });
      
      setMessage("Đăng ký thành công! Bạn sẽ nhận được thông tin sản phẩm mới.");
      setEmail("");
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-purple-950 text-gray-300 py-12 px-4 border-t-2 border-purple-800">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <div className="mb-6">
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              {t('footer.newsletter.title')}
            </h3>
            <p className="mb-6 text-purple-200">
              {t('footer.newsletter.subtitle')}
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex justify-center gap-4 h-12">
            <input
              type="email"
              placeholder={t('footer.newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 w-80 rounded-lg focus:outline-none text-white bg-gray-800 border-2 border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-400"
              required
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 px-6 py-2 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Đang gửi..." : t('footer.newsletter.subscribe')}
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-sm ${message.includes('thành công') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.information.title')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.aboutZip')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.privatePolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.search')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.ordersReturns')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.contactUs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.advancedSearch')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.information.newsletter')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.pcParts.title')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.cpus')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.addOnCards')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.hardDrives')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.graphicCards')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.keyboardsMice')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.casesPowerCooling')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.ram')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.software')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.speakersHeadsets')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.pcParts.motherboards')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.desktopPCs.title')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.cpus')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.customPCs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.servers')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.msiAllInOne')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.hpCompaq')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.asusPCs')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.desktopPCs.tecsPCs')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.laptops.title')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.everydayUse')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.msiWorkstation')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.msiPrestige')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.tabletsPads')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.netbooks')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors duration-200">
                  {t('footer.laptops.infinityGaming')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-purple-400 font-bold mb-4 text-lg">{t('footer.address.title')}</h4>
            <address className="not-italic">
              <p className="mb-2">
                {t('footer.address.street')}
              </p>
              <p className="mb-2">
                {t('footer.address.phone')} <span className="text-purple-400 font-semibold">{t('footer.address.phoneNumber')}</span>
              </p>
              <p className="mb-2">{t('footer.address.openHours')}</p>
              <ul
                className="list-disc list-inside mb-4"
                style={{ listStyleType: "none" }}
              >
                <li>{t('footer.address.mondayThursday')}</li>
                <li>{t('footer.address.friday')}</li>
                <li>{t('footer.address.saturday')}</li>
              </ul>
              <p>
                {t('footer.address.email')} <span className="text-purple-400 font-semibold">{t('footer.address.emailAddress')}</span>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-purple-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center text-white text-xl"
                aria-label={t('remaining.facebook')}
              >
                <FaFacebook />
              </a>
              <a 
                href="#" 
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center text-white text-xl"
                aria-label={t('remaining.instagram')}
              >
                <FaInstagram />
              </a>
            </div>

            {/* Payment Icons */}
            <div className="flex gap-4 flex-wrap justify-center">
              <a 
                href="#" 
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center text-white text-xl"
                aria-label={t('remaining.paypal')}
              >
                <SiPaypal />
              </a>
              <a 
                href="#" 
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center text-white text-xl"
                aria-label={t('remaining.visa')}
              >
                <SiVisa />
              </a>
              <a 
                href="#" 
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center text-white text-xl"
                aria-label={t('remaining.maestro')}
              >
                <SiMastercard />
              </a>
              <a 
                href="#" 
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center text-white text-xl"
                aria-label={t('remaining.discover')}
              >
                <SiDiscover />
              </a>
              <a 
                href="#" 
                className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg transition-all duration-300 flex items-center justify-center text-white text-xl"
                aria-label={t('remaining.american_express')}
              >
                <FaCcAmex />
              </a>
            </div>

            {/* Copyright Text */}
            <div>
              <p className="text-purple-300">{t('footer.copyright')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

