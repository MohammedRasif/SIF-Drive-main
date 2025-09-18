import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

export default function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <div className="proxima-nova">
      <Outlet />
    </div>
  );
}
