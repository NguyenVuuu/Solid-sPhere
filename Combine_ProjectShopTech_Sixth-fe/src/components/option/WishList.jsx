import { useTranslation } from 'react-i18next';

export default function WishList() {
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-[#f6f8ff] p-4 rounded-md flex flex-col items-center justify-center">
        <div className="text-3xl font-bold mb-4">{t('common.my_wish_list')}</div>

        <div className="">{t('common.you_have_no_items')}</div>
      </div>
    </>
  );
}

// Updated: 2025-10-12T16:06:33.423Z

// Updated: 2025-10-12T16:08:58.341Z
