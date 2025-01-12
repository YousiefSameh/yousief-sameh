import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SpecialHeader } from "../components";
import { LuPhoneCall } from "react-icons/lu";
import { HiMail } from "react-icons/hi";
import emailjs from "emailjs-com";

const Contact = () => {
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("pending");
    emailjs
      .sendForm(
        "service_kpveym8",
        "template_m5ymbx4",
        e.target,
        "QDiyb79l5vMxBUarG"
      )
      .then(
        (result) => {
          setStatus("success");
        },
        (error) => {
          setStatus("error");
          setErrorMessage(error.text);
        }
      );
  };

  return (
    <main
      className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
      role="main"
      aria-labelledby="main-title"
    >
      <nav
        className="bg-light-border-color dark:bg-dark-border-color px-3 md:px-6 py-3 rounded-s-md rounded-tl-md rounded-tr-md md:rounded-tr-none w-full md:w-fit absolute top-0 left-0"
        aria-label="الرئيسية"
      >
        <ul className="flex items-center justify-center gap-5">
          <li>
            <Link
              to="/"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
              aria-current="page"
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
            >
              معرض اعمالي
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
            >
              المدونات
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-primary-color font-bold text-[13px] md:text-base"
            >
              تواصل معي
            </Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <SpecialHeader title="تواصل معي" id="content-title" />
        <div className="some-info flex items-center justify-around mt-8">
          <div className="email flex items-center justify-center gap-3">
            <div
              className="icon bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-lg w-fit ml-4"
              aria-hidden="true"
            >
              <HiMail className="w-[40px] h-[40px] text-primary-color" />
            </div>
            <div className="text">
              <h3 className="text-[16px] font-medium text-gray-700 dark:text-gray-300">
                البريد الإلكتروني
              </h3>
              <p className="text-[18px] font-medium text-black dark:text-white">
                <a
                  href="mailto:yousief.sameh@outlook.com"
                  aria-label="البريد الإلكتروني: yousief.sameh@outlook.com"
                >
                  yousief.sameh@outlook.com
                </a>
              </p>
            </div>
          </div>
          <div className="phone flex items-center justify-center gap-3">
            <div
              className="icon bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-lg w-fit ml-4"
              aria-hidden="true"
            >
              <LuPhoneCall className="w-[40px] h-[40px] text-primary-color" />
            </div>
            <div className="text">
              <h3 className="text-[16px] font-medium text-gray-700 dark:text-gray-300">
                رقم التليفون (واتساب ومكالمات)
              </h3>
              <p className="text-[18px] font-medium text-black dark:text-white">
                <a
                  href="tel:+201288565394"
                  aria-label="اتصل برقم الهاتف: +20 128-856-5394"
                >
                  128-856-5394 (20)+
                </a>
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form my-8 space-y-6">
          <h1 className="text-4xl font-bold mt-4 text-black dark:text-white">
            أرسل لي رسالة !
          </h1>
          <div className="name space-y-3">
            <label
              htmlFor="fullname"
              className="text-lg font-medium text-black dark:text-white"
            >
              الاسم بالكامل
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="اكتب اسمك بالكامل هنا ..."
              className="h-[40px] w-full rounded-lg shadow-card-shadow shadow-primary-color/25 bg-transparent px-6 py-[5px] focus:shadow-primary-color/40 outline-none placeholder:text-black/80 dark:placeholder:text-white/80 font-semibold text-black dark:text-white"
            />
          </div>
          <div className="email space-y-3">
            <label
              htmlFor="email"
              className="text-lg font-medium text-black dark:text-white"
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="اكتب البريد الإلكتروني هنا ..."
              className="h-[40px] w-full rounded-lg shadow-card-shadow shadow-primary-color/25 bg-transparent px-6 py-[5px] focus:shadow-primary-color/40 outline-none placeholder:text-black/80 dark:placeholder:text-white/80 font-semibold text-black dark:text-white"
            />
          </div>
          <div className="message space-y-3">
            <label
              htmlFor="message"
              className="text-lg font-medium text-black dark:text-white"
            >
              الرسالة
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="اكتب الرسالة هنا ..."
              className="h-[200px] w-full rounded-lg shadow-card-shadow shadow-primary-color/25 bg-transparent px-6 py-3 focus:shadow-primary-color/70 outline-none placeholder:text-black/80 dark:placeholder:text-white/80 font-semibold text-black dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full shadow-card-shadow shadow-primary-color/40"
          >
            إرسال
          </button>
        </form>
        
        {/* Show status message */}
        <div
          className={`status-message text-center mt-4 font-bold py-2 ${
            status === "pending"
              ? "text-yellow-500"
              : status === "success"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {status === "pending" && "جاري الإرسال..."}
          {status === "success" && "تم إرسال الرسالة بنجاح!"}
          {status === "error" && `حدث خطأ: ${errorMessage}`}
        </div>
      </div>
    </main>
  );
};

export default Contact;
