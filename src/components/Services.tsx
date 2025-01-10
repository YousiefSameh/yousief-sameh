import { AiOutlineAntDesign } from "react-icons/ai";
import { FaReact } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoSpeedometerOutline } from "react-icons/io5";

const Services = () => {
	return (
		<section className="services mt-6" aria-labelledby="services-title">
			<h2
				id="services-title"
				className="text-black dark:text-white text-3xl font-bold my-2"
			>
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
						تطوير واجهات ويب حديثة تعمل بكفاءة على جميع الأجهزة، مع ضمان تجربة
						مستخدم متكاملة.
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
						بناء تطبيقات ويب ديناميكية وقابلة للتطوير باستخدام React، مع التركيز
						على الأداء والتصميم.
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
						تحسين سرعة وأداء المواقع لتحسين تجربة المستخدم وتلبية احتياجات
						العملاء.
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
						تخطيط وتنفيذ مشاريع برمجية باحترافية لضمان تسليم عالي الجودة وفي
						الوقت المحدد.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Services;
