import { FaFacebook, FaGithub, FaWhatsapp } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";

const Header = () => {
  return (
    <header className="bg-background-container-color border-[2px] border-border-color py-8 px-5 rounded-lg w-fit">
      <div className="profile flex items-center gap-2 justify-center">
        <img 
          src="./assets/profile.png" 
          className="w-[75px] h-[75px] border-[3px] border-primary-color rounded-full ml-[20px]" 
          alt="صورة يوسف سامح" 
        />
        <div className="text">
          <h1 className="text-[28px] font-bold" aria-label="الاسم">يوسف سامح</h1>
          <h2 className="text-[18px] font-medium opacity-65" aria-label="الوظيفة">مطور واجهات أمامية</h2>
        </div>
      </div>
      <span className="w-full h-[2px] bg-[#383838] block my-7" />
      <div className="details flex flex-col gap-6">
        <div className="email flex items-center justify-between">
          <div 
            className="icon bg-[#202021] p-3 rounded-lg shadow-lg w-fit ml-4" 
            aria-hidden="true"
          >
            <HiMail className="w-[40px] h-[40px] text-primary-color" />
          </div>
          <div className="text">
            <h3 className="text-[16px] font-medium text-white opacity-65">البريد الإلكتروني</h3>
            <p className="text-[18px] font-medium">
              <a 
                href="mailto:yousief.sameh@outlook.com" 
                aria-label="البريد الإلكتروني: yousief.sameh@outlook.com"
              >
                yousief.sameh@outlook.com
              </a>
            </p>
          </div>
        </div>
        <div className="phone flex items-center justify-between">
          <div 
            className="icon bg-[#202021] p-3 rounded-lg shadow-lg w-fit ml-4" 
            aria-hidden="true"
          >
            <LuPhoneCall className="w-[40px] h-[40px] text-primary-color" />
          </div>
          <div className="text">
            <h3 className="text-[16px] font-medium text-white opacity-65">رقم التليفون (واتساب ومكالمات)</h3>
            <p className="text-[18px] font-medium">
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
      <span className="w-full h-[2px] bg-[#383838] block my-7" />
      <div className="social-media flex items-center justify-center gap-4">
        <div 
          className="card whatsapp bg-[#202021] p-3 rounded-lg shadow-card-shadow w-fit ml-4"
          aria-hidden="true"
        >
          <a 
            href="https://wa.me/201288565394" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="افتح رابط الواتساب"
          >
            <FaWhatsapp className="w-[30px] h-[30px] hover:text-primary-color transition-all" />
          </a>
        </div>
        <div 
          className="card github bg-[#202021] p-3 rounded-lg shadow-card-shadow w-fit ml-4"
          aria-hidden="true"
        >
          <a 
            href="https://github.com/YousiefSameh" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="افتح رابط GitHub"
          >
            <FaGithub className="w-[30px] h-[30px] hover:text-primary-color transition-all" />
          </a>
        </div>
        <div 
          className="card facebook bg-[#202021] p-3 rounded-lg shadow-card-shadow w-fit ml-4"
          aria-hidden="true"
        >
          <a 
            href="https://www.facebook.com/profile.php?id=100094333458845" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="افتح رابط Facebook"
          >
            <FaFacebook className="w-[30px] h-[30px] hover:text-primary-color transition-all" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
