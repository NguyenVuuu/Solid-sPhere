import React from 'react';
import ProfileCard from './ProfileCard';
import './TeamProfiles.css';
import taki from "../../../assets/gengar.jpg";
import { FaTools, FaUser, FaMoneyBillWave } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdAccessTime, MdEmail } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
const TeamProfiles = () => {
  const { t } = useTranslation();

  // Array of team member data
  const teamMembers = [
    {
      id: 1,
      name: "Nguyên Vũ",
      role: "Full stack developers",
      masterRole: "Full Stack Developer",
      location: "VietNam",
      image: taki,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/nguyenvuuu/",
        dribbble: "https://www.facebook.com/nguyenvuuu0211",
        github: "https://github.com/NguyenVuuu"
      }
    }
  ];

  return (
    <>
      {/* Team Section */}
      <div className="teamContainer">
        <h2 className="teamTitle">{t('product.team_01')}</h2>
        <div className="teamProfiles">
          {teamMembers.map((member) => (
            <ProfileCard key={member.id} memberData={member} />
          ))}
        </div>
      </div>
      
      {/* Contact Us Section */}
      <div className="contact-page">
        <div className="breadcrumb">
          <a href="/">{t('product.home')}</a> / Contact Us
        </div>
        
        <div className="contact-content">
          <div className="form-section">
            <h1 className="contact-title">{t('product.contact_us')}</h1>
            <p>{t('product.we_love_hearing_from')}</p>
            <p>{t('product.please_contact_us_and')}</p>
            
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('product.your_name')}<span className="required">*</span></label>
                  <input type="text" placeholder={t('product.your_name')} />
                </div>
                
                <div className="form-group">
                  <label>{t('product.your_email')}<span className="required">*</span></label>
                  <input type="email" placeholder={t('product.your_email')} />
                </div>
              </div>
              
              <div className="form-group">
                <label>{t('product.your_phone_number')}</label>
                <input type="tel" placeholder={t('product.your_phone')} />
              </div>
              
              <div className="form-group">
                <label>{t('product.whats_on_your_mind')}<span className="required">*</span></label>
                <textarea placeholder={t('product.note_placeholder')}></textarea>
              </div>
              
              <button type="submit" className="submit-btn">{t('product.submit')}</button>
            </form>
          </div>
          
          <div className="info-section">
            <div className="info-item">
              <div className="icon">
                <MdLocationOn size={20} color="white" />
              </div>
              <div>
                <h3>{t('product.address')}</h3>
                <p>{t('product.123_hung_vuong_street')}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon">
                <MdPhone size={20} color="white" />
              </div>
              <div>
                <h3>{t('product.phone')}</h3>
                <p>{t('product.001234_5678')}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon">
                <MdAccessTime size={20} color="white" />
              </div>
              <div>
                <h3>{t('product.we_are_open')}</h3>
                <p>{t('product.monday_thursday_900_am')}</p>
                <p>{t('product.friday_900_am_600')}</p>
                <p>{t('product.saturday_1100_am_500')}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon">
                <MdEmail size={20} color="white" />
              </div>
              <div>
                <h3>{t('product.email')}</h3>
                <p><a href="mailto:nguyenvu2112004@gmail.com">nguyenvu2112004@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="features-section">
          <div className="feature">
            <div className="feature-icon">
              <FaTools size={25} color="white" />
            </div>
            <h3>{t('product.product_support')}</h3>
            <p>{t('product.up_to_3_years')}</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <FaUser size={25} color="white" />
            </div>
            <h3>{t('product.personal_account')}</h3>
            <p>{t('product.with_big_discounts_free')}</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">
              <FaMoneyBillWave size={25} color="white" />
            </div>
            <h3>{t('product.amazing_savings')}</h3>
            <p>{t('product.up_to_70_off')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamProfiles;
// Updated: 2025-10-12T16:06:27.508Z

// Updated: 2025-10-12T16:09:07.451Z
