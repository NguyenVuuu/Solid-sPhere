import React from 'react';
import { useTranslation } from 'react-i18next';

const Breadcrumb = ({ items }) => {
  const { t } = useTranslation();

  return (
    <nav className="breadcrumb" aria-label={t('common.breadcrumb')}>
      <ol className="breadcrumb-list flex gap-2">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index !== items.length - 1 ? (
              <>
                <a href={item.url} className="breadcrumb-link">{item.label}</a>
                <span className="breadcrumb-separator">/</span>
              </>
            ) : (
              <span className="breadcrumb-current" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
// Updated: 2025-10-12T16:06:32.308Z

// Updated: 2025-10-12T16:09:09.830Z
