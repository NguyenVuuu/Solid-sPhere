import React from 'react';
import ProfileCard from './ProfileCard';
import './TeamProfiles.css';
import taki from "../../../assets/taro.jpg";
import { FaTools, FaUser, FaMoneyBillWave } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdAccessTime, MdEmail } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
const TeamProfiles = () => {
  const { t } = useTranslation();

  // Array of team member data
  const teamMembers = [
    {
      id: 1,
      name: "Thach Taro",
      role: "Full stack developers",
      masterRole: "Master in Frontend Developer",
      location: "VietNam",
      image: taki,
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 2,
      name: "Tung",
      role: "Full stack developers",
      masterRole: "Master in Backend Architecture",
      location: "VietNam",
      image: "/assets/img/member2.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 3,
      name: "Thien",
      role: "Full stack developers",
      masterRole: "Master in User Experience",
      location: "VietNam",
      image: "/assets/img/member3.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 4,
      name: "Minh",
      role: "Full stack developers",
      masterRole: "Master in Database Design",
      location: "VietNam",
      image: "/assets/img/member4.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 5,
      name: "Hoa",
      role: "Full stack developers",
      masterRole: "Master in DevOps",
      location: "VietNam",
      image: "/assets/img/member5.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 6,
      name: "Nam",
      role: "Full stack developers",
      masterRole: "Master in Mobile Development",
      location: "VietNam",
      image: "/assets/img/member6.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
      }
    },
    {
      id: 7,
      name: "Linh",
      role: "Full stack developers",
      masterRole: "Master in AI/ML",
      location: "VietNam",
      image: "/assets/img/member7.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/",
        dribbble: "https://dribbble.com/",
        github: "https://github.com/"
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
                <p><a href="mailto:thachtaro123@gmail.com">{t('product.thachtaro123gmailcom')}</a></p>
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
