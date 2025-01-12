import { createSlice } from "@reduxjs/toolkit";
import { initialStateType } from "../../types/blogs";

const initialState: initialStateType = {
	blogs: [
		{
			id: 1,
			title: "ما هي الإغلاقات في JavaScript؟",
			description:
				"تعرف على واحدة من أقوى المفاهيم وأكثرها غموضًا في JavaScript. الإغلاقات تعتبر من المفاهيم الأساسية التي تتيح للمطورين إنشاء كود أكثر مرونة وقوة، مما يجعلها ضرورية لفهم أعمق للغة JavaScript.",
			content:
				"الإغلاقات هي مفهوم أساسي في JavaScript يسمح للدوال بالاحتفاظ بالوصول إلى نطاقها حتى عند استدعائها خارج هذا النطاق. يمكن أن تكون هذه الميزة مفيدة في العديد من السيناريوهات مثل إنشاء وظائف خاصة أو متغيرات خفية. في هذه المقالة، سنشرح الإغلاقات بتفصيل أكبر باستخدام أمثلة عملية ومقارنات مع لغات برمجة أخرى لفهم أعمق.",
			publishedDate: "2025-01-10",
			imageUrl: "https://www.yourwebsite.com/images/js-closures-ar.png",
		},
		{
			id: 2,
			title: "دليل المبتدئين لتعلم لغة Python",
			description:
				"كل ما تحتاجه لتبدأ رحلتك في تعلم لغة البرمجة Python. سواء كنت مبتدئًا تمامًا أو لديك خبرة سابقة، سيوفر هذا الدليل الخطوات الأساسية وأفضل الممارسات لتعلم اللغة بسهولة وفعالية.",
			content:
				"لغة Python هي واحدة من أسهل لغات البرمجة وأكثرها شيوعًا. بفضل بساطة تركيبتها ودعمها لمكتبات متعددة، أصبحت Python الخيار الأمثل للمبتدئين. في هذه المقالة، سنغطي المفاهيم الأساسية مثل تركيب الجمل البرمجية، الحلقات، الشروط، وتعامل مع البيانات باستخدام أمثلة عملية مفصلة. كما سنناقش كيف يمكن للمطورين استخدام Python في مجالات متعددة مثل تحليل البيانات، تطوير الويب، والذكاء الاصطناعي.",
			publishedDate: "2025-01-08",
			imageUrl: "https://www.yourwebsite.com/images/python-beginners-ar.png",
		},
		{
			id: 3,
			title: "أفضل الممارسات في تطوير الواجهات الأمامية",
			description:
				"اكتشف النصائح والحيل لتحسين كفاءة تطوير الواجهات الأمامية. هذه النصائح تساعدك على إنشاء تطبيقات ويب ذات أداء عالٍ وتصميم جذاب يجذب المستخدمين.",
			content:
				"تطوير الواجهات الأمامية يتطلب فهمًا جيدًا للتقنيات المختلفة مثل HTML وCSS وJavaScript. ولكن الأمر لا يقتصر على كتابة الكود فقط؛ بل يشمل أيضًا تبني أفضل الممارسات لتحسين الأداء وتجربة المستخدم. في هذه المقالة، سنتحدث عن استخدام شبكات التصميم، تحسين الأداء باستخدام الأدوات الحديثة، كتابة كود نظيف وقابل للصيانة، بالإضافة إلى أمثلة عملية لتنفيذ تلك المفاهيم في مشاريع حقيقية.",
			publishedDate: "2025-01-05",
			imageUrl:
				"https://www.yourwebsite.com/images/frontend-best-practices-ar.png",
		},
		{
			id: 4,
			title: "كيف تبدأ العمل كمطور ويب؟",
			description:
				"دليل شامل للخطوات الأساسية لدخول عالم تطوير الويب. ستتعلم الأدوات والمهارات التي تحتاجها لتبدأ رحلتك المهنية كمطور ويب محترف.",
			content:
				"سواء كنت مبتدئًا أو لديك خلفية بسيطة في البرمجة، هناك خطوات محددة تساعدك على دخول مجال تطوير الويب. سنبدأ بتوضيح الفرق بين التطوير الأمامي والخلفي، ثم ننتقل إلى الأدوات الأساسية مثل Visual Studio Code وGit. كما سنناقش أهمية تعلم الأساسيات مثل HTML وCSS وJavaScript وكيف يمكن التعمق في أطر العمل الحديثة مثل React وNode.js لتطوير تطبيقات متقدمة.",
			publishedDate: "2025-01-03",
			imageUrl: "https://www.yourwebsite.com/images/start-web-dev-ar.png",
		},
		{
			id: 5,
			title: "أهمية تحسين الأداء في تطبيقات الويب",
			description:
				"لماذا يجب أن تهتم بسرعة وأداء موقعك؟ تحسين الأداء لا يتعلق فقط بجعل تطبيقك أسرع، بل له تأثير كبير على تجربة المستخدم وتصنيفات محركات البحث وزيادة معدلات التفاعل.",
			content:
				"أداء تطبيقات الويب يؤثر بشكل كبير على تجربة المستخدم وتصنيف محركات البحث. عند تحسين الأداء، يتم تقليل وقت تحميل الصفحة، تحسين التفاعل، وزيادة معدلات التحويل. في هذه المقالة، نستعرض استراتيجيات مثل تحسين الصور، تقليل طلبات HTTP، استخدام CDN، وطرق قياس الأداء باستخدام أدوات مثل Google Lighthouse. بالإضافة إلى تقديم أمثلة عملية لتنفيذ هذه التحسينات بشكل فعال.",
			publishedDate: "2025-01-01",
			imageUrl: "https://www.yourwebsite.com/images/web-performance-ar.png",
		},
	],
	loading: "idle",
	error: null,
};

const blogsSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {},
	// extraReducers: (builder) => {
	//   builder.addCase(actionGetBlogs.pending, (state) => {
	//     state.loading = "pending";
	//     state.error = null;
	//   });
	//   builder.addCase(actionGetBlogs.fulfilled, (state, action) => {
	//     state.loading = "succeeded";
	//     state.blogs = action.payload;
	//   });
	//   builder.addCase(actionGetBlogs.rejected, (state, action) => {
	//     state.loading = "failed";
	//     if (action.payload && typeof action.payload === "string") {
	//       state.error = action.payload;
	//     }
	//   });
	// },
});

export default blogsSlice.reducer;
