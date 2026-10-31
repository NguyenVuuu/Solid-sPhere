import React from 'react';
import './ProfileCard.css'; // Chỉ cần import, không cần 'styles'

import { FaLinkedin, FaDribbble, FaGithub, FaInfoCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ProfileCard = ({ memberData }) => {
  const { t } = useTranslation();

  const { name, role, masterRole, location, image, socialLinks } = memberData;

  return (
    <div className="profileCard">
      <div className="cardBorder">
        <div className="cardPerfil">
          <img src={image} alt={`${name} profile`} className="cardImg" />
        </div>
      </div>

      <h3 className="cardName">{name}</h3>
      <span className="cardProfession">{t('product.full_stack_developer')}</span>

      <div className="info">
        <div className="infoIcon">
          <span className="infoLetter">i</span>
        </div>

        <div className="infoBorder">
          <div className="infoPerfil">
            <img src={image} alt={`${name} profile`} className="cardImg" />
          </div>
        </div>

        <div className="infoData">
          <h3 className="infoName">{name}</h3>
          <span className="infoProfession">{masterRole}</span>
          <span className="infoLocation">{location}</span>
        </div>

        <div className="infoSocial">
          <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="infoSocialLink">
            <span className="infoSocialIcon">
              <FaLinkedin />
            </span>
          </a>

          <a href={socialLinks.dribbble} target="_blank" rel="noreferrer" className="infoSocialLink">
            <span className="infoSocialIcon">
              <FaDribbble />
            </span>
          </a>

          <a href={socialLinks.github} target="_blank" rel="noreferrer" className="infoSocialLink">
            <span className="infoSocialIcon">
              <FaGithub />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

// Updated: 2025-10-12T16:06:22.300Z

// Updated: 2025-10-12T16:08:49.065Z
