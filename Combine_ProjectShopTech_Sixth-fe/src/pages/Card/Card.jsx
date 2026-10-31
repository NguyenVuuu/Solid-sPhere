import { useTranslation } from 'react-i18next';

function Card(){
  const { t } = useTranslation();

    return(
        <>
            <h1>{t('common.card')}</h1>
        </>
    )
}

export default Card;
// Updated: 2025-10-12T16:06:40.778Z

// Updated: 2025-10-12T16:09:10.422Z
