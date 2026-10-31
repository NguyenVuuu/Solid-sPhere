import { useTranslation } from 'react-i18next';

function Laptop(){
  const { t } = useTranslation();

    return(
        <>
            <h1>{t('common.laptops')}</h1>
        </>
    )
}

export default Laptop;
// Updated: 2025-10-12T16:06:44.574Z

// Updated: 2025-10-12T16:09:11.683Z
