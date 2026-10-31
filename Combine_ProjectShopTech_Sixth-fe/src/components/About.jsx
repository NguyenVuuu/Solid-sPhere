import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  // Hiển thị userContext đang có
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>{t('about.about_us')}</h1>
      {
        // Set lại giá trị userContext
        

      console.log("Current user:", user || "Not logged in")
      
      
      }
    </div>
  );
};

export default About;

// Updated: 2025-10-12T16:06:29.217Z

// Updated: 2025-10-12T16:09:01.383Z
