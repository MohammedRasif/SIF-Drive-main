import React, { useState } from "react";
import Modal from "../shared/Modal";
import TransactionDetails from "./TransactionDetails";
import { useTranslation } from "react-i18next";
import { useShowReactTransactionsQuery } from "../redux/features/withAuth";

const TransactionTable = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const {
    data: recentTransactions,
    isLoading,
    error,
  } = useShowReactTransactionsQuery();

  // Transform API data to match the component structure
  const transactions =
    recentTransactions?.transactions?.map((transaction) => ({
      trId: transaction.transaction_id,
      userName: transaction.user_name,
      userType:
        transaction.user_type.charAt(0).toUpperCase() +
        transaction.user_type.slice(1),
      amount: `${transaction.currency || "OMR"} ${
        transaction.amount_omr?.toFixed(2) || 0
      }`,
      date: new Date(transaction.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      accountNumber: `**** **** **** ${
        transaction.account_number?.slice(-4) || "****"
      }`,
      accountHolder: transaction.account_holder,
      email: transaction.email,
    })) || [];

  console.log("API Response:", recentTransactions);
  console.log("Transformed Transactions:", transactions);

  const handleViewClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-4 bg-[#DBDEEF] mt-10 rounded-xl">
        <h2 className="text-2xl px-4 font-bold mb-4 text-[#121212] bg-[#DBDEEF] p-2 rounded-t-lg">
          {t("transactionTable.title")}
        </h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B2088]"></div>
          <span className="ml-2 text-[#121212]">Loading transactions...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-4 bg-[#DBDEEF] mt-10 rounded-xl">
        <h2 className="text-2xl px-4 font-bold mb-4 text-[#121212] bg-[#DBDEEF] p-2 rounded-t-lg">
          {t("transactionTable.title")}
        </h2>
        <div className="flex justify-center items-center h-32 text-red-600">
          <p>Error loading transactions. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!transactions.length) {
    return (
      <div className="container mx-auto py-4 bg-[#DBDEEF] mt-10 rounded-xl">
        <h2 className="text-2xl px-4 font-bold mb-4 text-[#121212] bg-[#DBDEEF] p-2 rounded-t-lg">
          {t("transactionTable.title")}
        </h2>
        <div className="flex justify-center items-center h-32 text-[#121212]">
          <p>No transactions found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 bg-[#DBDEEF] mt-10 rounded-xl">
      <h2 className="text-2xl px-4 font-bold mb-4 text-[#121212] bg-[#DBDEEF] p-2 rounded-t-lg">
        {t("transactionTable.title")}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-[#DBDEEF] text-[#121212]">
          <thead>
            <tr className="bg-[#B4BBDF]">
              <th className="p-2">{t("transactionTable.columns.trId")}</th>
              <th className="p-2">{t("transactionTable.columns.userName")}</th>
              <th className="p-2">{t("transactionTable.columns.userType")}</th>
              <th className="p-2">{t("transactionTable.columns.amount")}</th>
              <th className="p-2">{t("transactionTable.columns.date")}</th>
              <th className="p-2">{t("transactionTable.columns.action")}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.trId || index}
                className="hover:bg-[#cdd0e0] text-center"
              >
                <td className="p-2">{transaction.trId}</td>
                <td className="p-2">{transaction.userName}</td>
                <td className="p-2">{transaction.userType}</td>
                <td className="p-2">{transaction.amount}</td>
                <td className="p-2">{transaction.date}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleViewClick(transaction)}
                    className="text-[#0B2088] hover:underline hover:cursor-pointer transition-colors duration-200"
                  >
                    {t("transactionTable.columns.view")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal rendering the TransactionDetails component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionDetails transaction={selectedTransaction} />
      </Modal>
    </div>
  );
};

export default TransactionTable;
