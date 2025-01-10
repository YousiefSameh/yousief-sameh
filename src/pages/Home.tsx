import { Link } from "react-router-dom";
import SpecialHeader from "../components/SpecialHeader";
import { AiOutlineAntDesign } from "react-icons/ai";
import { FaReact } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";

const Home: React.FC = () => {
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
              className="text-primary-color font-bold text-[13px] md:text-base"
              aria-current="page"
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="text-black dark:text-white font-bold hover:text-primary-color transition-colors text-[13px] md:text-base"
            >
              معرض اعمالي
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="text-black dark:text-white font-bold hover:text-primary-color transition-colors text-[13px] md:text-base"
            >
              المدونات
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-black dark:text-white font-bold hover:text-primary-color transition-colors text-[13px] md:text-base"
            >
              تواصل معي
            </Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <SpecialHeader title="الرئيسية" id="main-title" />
        <section className="about mt-6" aria-labelledby="about-title">
          <h2 id="about-title" className="text-black dark:text-white text-3xl font-bold my-2">
            من أنا؟
          </h2>
          <p className="text-lg text-black dark:text-white opacity-80 leading-loose">
            أنا يوسف سامح، مطور واجهات أمامية متخصص في بناء تطبيقات ويب متطورة باستخدام مكتبة React. شغفي يكمن في تحويل الأفكار إلى واجهات مستخدم سلسة وجذابة، تركز على تقديم تجربة استثنائية للمستخدمين. أمتلك خبرة في تصميم وتطوير مواقع متجاوبة وأنيقة، مع الحرص على تحقيق الأداء الأمثل والقابلية للتطوير.
          </p>
          <p className="text-lg text-black dark:text-white opacity-80 leading-loose mt-4">
            أتابع باستمرار أحدث التقنيات والاتجاهات في مجال تطوير الويب، مما يمكنني من تقديم حلول مبتكرة وعملية تلبي احتياجات العملاء. أستمتع بالعمل على تحديات جديدة والتعاون مع فرق متعددة التخصصات لإنجاز مشاريع تحقق تأثيرًا حقيقيًا. البرمجة بالنسبة لي ليست مجرد مهنة، بل وسيلة للإبداع وحل المشكلات.
          </p>
        </section>
        <section className="services mt-6" aria-labelledby="services-title">
          <h2 id="services-title" className="text-black dark:text-white text-3xl font-bold my-2">
            خدماتي
          </h2>
          <div
            className="cards grid grid-cols-1 md:grid-cols-2 gap-8 my-4"
            role="list"
          >
            <div
              className="card p-4 border-[2px] border-light-border-color dark:border-dark-border-color bg-light-card-color dark:bg-dark-card-color shadow-card-shadow rounded-lg"
              role="listitem"
            >
              <div className="head flex items-center gap-2">
                <AiOutlineAntDesign
                  className="text-5xl text-primary-color w-[40px] h-[40px]"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold text-black dark:text-white">
                  تصميم واجهات متجاوبة
                </h3>
              </div>
              <p className="body text-[18px] text-black dark:text-white leading-loose">
                تطوير واجهات ويب حديثة تعمل بكفاءة على جميع الأجهزة، مع ضمان تجربة مستخدم متكاملة.
              </p>
            </div>
            <div
              className="card p-4 border-[2px] border-light-border-color dark:border-dark-border-color bg-light-card-color dark:bg-dark-card-color shadow-card-shadow rounded-lg"
              role="listitem"
            >
              <div className="head flex items-center gap-2">
                <FaReact
                  className="text-5xl text-primary-color w-[40px] h-[40px]"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold text-black dark:text-white">
                  تطوير تطبيقات React
                </h3>
              </div>
              <p className="body text-[18px] text-black dark:text-white leading-loose">
                بناء تطبيقات ويب ديناميكية وقابلة للتطوير باستخدام React، مع التركيز على الأداء والتصميم.
              </p>
            </div>
            <div
              className="card p-4 border-[2px] border-light-border-color dark:border-dark-border-color bg-light-card-color dark:bg-dark-card-color shadow-card-shadow rounded-lg"
              role="listitem"
            >
              <div className="head flex items-center gap-2">
                <IoSpeedometerOutline
                  className="text-5xl text-primary-color w-[40px] h-[40px]"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold text-black dark:text-white">
                  تحسين الأداء والتجربة
                </h3>
              </div>
              <p className="body text-[18px] text-black dark:text-white leading-loose">
                تحسين سرعة وأداء المواقع لتحسين تجربة المستخدم وتلبية احتياجات العملاء.
              </p>
            </div>
            <div
              className="card p-4 border-[2px] border-light-border-color dark:border-dark-border-color bg-light-card-color dark:bg-dark-card-color shadow-card-shadow rounded-lg"
              role="listitem"
            >
              <div className="head flex items-center gap-2">
                <GiSettingsKnobs
                  className="text-5xl text-primary-color w-[40px] h-[40px]"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold text-black dark:text-white">
                  إدارة مشاريع تقنية
                </h3>
              </div>
              <p className="body text-[18px] text-black dark:text-white leading-loose">
                تخطيط وتنفيذ مشاريع برمجية باحترافية لضمان تسليم عالي الجودة وفي الوقت المحدد.
              </p>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className="footer-content mt-6 text-center">
          <p className="md:text-lg text-base text-black dark:text-white opacity-80 font-bold hover:opacity-100 transition-opacity cursor-pointer">
            &copy; <span className="text-primary-color">يوسف سامح</span> 2025 كل الحقوق محفوظة
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
