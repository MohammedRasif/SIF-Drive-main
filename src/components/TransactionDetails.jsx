import { useTranslation } from "react-i18next";

const TransactionDetails = ({ transaction }) => {
  const { t } = useTranslation();

  if (!transaction) return null;

  return (
    <div className="max-w-md md:w-md mx-auto rounded-lg overflow-hidden">
      <div className="text-center mb-6 text-2xl text-gray-700">
        <h1>{t("transactionDetails.title")}</h1>
      </div>

      <div className="divide-y divide-gray-300">
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-gray-600 font-medium">
            {t("transactionDetails.transactionId")} :
          </span>
          <span className="text-gray-800 font-semibold">
            #{transaction.trId}
          </span>
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-gray-600 font-medium">
            {t("transactionDetails.date")} :
          </span>
          <span className="text-gray-800 font-semibold">
            {transaction.date}
          </span>
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-gray-600 font-medium">
            {t("transactionDetails.userName")} :
          </span>
          <span className="text-gray-800 font-semibold">
            {transaction.userName}
          </span>
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-gray-600 font-medium">
            {t("transactionDetails.accountNumber")} :
          </span>
          <span className="text-gray-800 font-semibold">
            {transaction.accountNumber || "**** **** **** *545"}
          </span>
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-gray-600 font-medium">
            {t("transactionDetails.accountHolder")} :
          </span>
          <span className="text-gray-800 font-semibold">
            {transaction.accountHolder || transaction.userName}
          </span>
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-gray-600 font-medium">
            {t("transactionDetails.amount")} :
          </span>
          <span className="text-gray-800 font-semibold">
            {transaction.amount}
          </span>
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-gray-600 font-medium">
            {t("transactionDetails.email")} :
          </span>
          <span className="text-gray-800 font-semibold">
            {transaction.email || t("transactionDetails.notProvided")}
          </span>
        </div>
      </div>

      <div className="flex gap-4 px-6 py-6">
        <button className="flex-1/2 bg-white text-[#071352] border-2 border-[#071352] px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors hover:cursor-pointer">
          {t("transactionDetails.download")}
        </button>
        <button className="flex-1/2 bg-gradient-to-r from-[#071352] to-[#0023CF] rounded-full text-white font-bold hover:from-[#0023CF] hover:to-[#071352] transition-colors delay-200 hover:cursor-pointer">
          {t("transactionDetails.print")}
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
