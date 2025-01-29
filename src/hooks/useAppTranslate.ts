import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const useAppTranslate = ({ path }: { path: string }) => {
  const { t } = useTranslation(path);
	const [lang, setLang] = useState("");

	useEffect(() => {
		const Lng = localStorage.getItem("i18nextLng");
		if (Lng) {
			setLang(Lng);
		}
	}, [localStorage.getItem("i18nextLng")]);
  return {t, lang}
}

export default useAppTranslate