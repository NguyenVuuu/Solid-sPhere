import { useTranslation } from 'react-i18next';

function SupportCard ({ icon, title, description }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto">
      <div className="mb-4 p-3 bg-blue-100 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
export default SupportCard;
// Updated: 2025-10-12T16:06:41.812Z

// Updated: 2025-10-12T16:08:55.376Z
