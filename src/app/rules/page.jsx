"use client";
import { useState, useEffect, useRef } from "react";
import {
  FiChevronLeft,
  FiShield,
  FiAlertTriangle,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rulesData = [
  {
    title: "Criminal Rules",
    icon: <FiAlertTriangle className="text-red-500" />,
    topics: [
      "General Criminal Rules",
      "Robberies Rules",
      "Chase / Escape Rules",
      "P2P Crimes Rules",
      "Kidnapping Rules",
      "Kidnap Payoff Rules",
      "Negotiation Rules",
    ],
  },
  {
    title: "Gang rules",
    icon: <FiUsers className="text-blue-500" />,
    topics: ["General Gang Rules", "Pickpocket Rules", "King of Hill Rules"],
  },
  {
    title: "Crucial rules",
    icon: <FiShield className="text-yellow-500" />,
    topics: ["PERMA BAN"],
  },
];

const rulesContent = {
  "General Criminal Rules": (
    <div className="space-y-3">
      <p>
        ⭐ - ممنوع الأعمال الإجرامية في المناطق الآمنة ما عدا بعض الأعمال
        المحددة (الدريفت - بيع المخدرات - تجارة السلاح - النصب والاحتيال - سرقة
        السيارات مع ارتداء ماسك).
      </p>
      <p>
        ⭐ - يجب أن يكون الاحترام متبادل بين الشرطة وجميع المواطنين (جميع
        العصابات) والتعامل بواقعية.
      </p>
      <p>
        ⭐ - الحد الأقصى للفواتير 5 فواتير فقط، وفي الفاتورة السادسة سيتم خصم
        ثمن أي فاتورة بشكل عشوائي من رصيدك في البنك + نسبة 25% غرامة تأخير.
      </p>
      <p>⭐ - ممنوع عمل أي عمل إجرامي قبل الإعصار بنصف ساعة.</p>
      <p>⭐ - ممنوع تثبيت أي شخص لسه داخل المدينة (عمل Connect).</p>
      <p>
        ⭐ - ممنوع تشغيل الكاست أو الأغاني أو الرقص أو رمي شماريخ أو البنزين في
        أي سيناريو عمل إجرامي.
      </p>
      <p>
        ⭐ - في حالة قيامك بأعمال إجرامية في المدينة، يتطلب ذلك ارتداء ماسك يخفي
        ملامح وجهك، ويسمح للشرطة باعتقالك فورًا في حالة عدم ارتدائه.
      </p>
      <p>
        ⭐ - لا يمكنك الهجوم على مقر بدون وجود أدلة عن معرفتك للمكان كل رستارت.
      </p>
      <p>
        ⭐ - في حالة ارتداء زي العصابة، فأنت رجل عصابات ولا يمكنك مخاطبة الآخرين
        كأنك فرد من عائلة سلمية إلا في حالة نشاط المجموعة الدائم للسلم.
      </p>
    </div>
  ),
  "Robberies Rules": (
    <div className="space-y-3">
      <p>
        ⭐ - السرقات تكون بأسبقية الوصول مهما كان العدد، وممنوع تثبيت الأشخاص.
      </p>
      <p>
        ⭐ - مسموح إطلاق النار على الهليكوبتر في كل السرقات عدا يخت، ويحق الضرب
        على الهليكوبتر في حالة لمسها لليخت.
      </p>
      <p>⭐ - ممنوع المشاركة في أي أعمال إجرامية إذا كنت في وظيفة رسمية.</p>
      <p>
        ⭐ - ممنوع الفايت بالسكين أو العصا نهائيًا في سيناريوهات السرقة أو
        سيناريو فايت.
      </p>
      <p>⭐ - ممنوع تحلل أي شخص في أي سيناريو إذا كان شرطيًا أو مجرمًا.</p>
    </div>
  ),
  "Chase / Escape Rules": (
    <div className="space-y-3">
      <p>
        ⭐ - يمنع الهروب أثناء المطاردة إلى أي مسطح مائي دون وجود قارب مجهز
        للهروب أو أنبوبة غطس.
      </p>
      <p>
        ⭐ - يمنع إخراج سيارة جديدة من مكان تخزين السيارات أثناء المطاردة أو
        التثبيت.
      </p>
      <p>
        ⭐ - يمنع أثناء المطاردة دخول البيت أو أي منطقة احتلال (ما عدا المقر).
      </p>
      <p>⭐ - ممنوع الهروب إلى منطقة آمنة أثناء المطاردة إلا قسم الشرطة.</p>
      <p>
        ⭐ - يسمح إهدار ممتلكات عامة في حالة الهروب من الشرطة بهدف النجاة، مثل
        التصادم بما يعرقل طريقك أو استغلال شاحنات لحجب المرور للشرطة.
      </p>
    </div>
  ),
  "P2P Crimes Rules": (
    <div className="space-y-3">
      <p>⭐ - يجب أن يكون العدد الذي يثبت أكثر من العدد الذي يتثبت بواحد.</p>
      <p>
        ⭐ - يجب أن يكون عدد أفراد العصابة ضعف عدد الشرطة على الأقل لتثبيتهم (6
        يثبتوا 3).
      </p>
      <p>
        ⭐ - يمنع تثبيت المواطنين إلا في وجود عدد 3 شرطة في المدينة على الأقل.
      </p>
      <p>
        ⭐ - ممنوع تثبيت أو سرقة سيارات الوظائف أو العاملين أثناء أداء عملهم أو
        تواجد الشخص بجانبها.
      </p>
      <p>⭐ - يجب على المجرم عدم طلب أموال من الذي تم تثبيته أكثر من 3 آلاف.</p>
      <p>⭐ - ممنوع تثبيت أو الاعتداء على المسعف في حالة ارتدائهم زي العمل.</p>
      <p>
        ⭐ - ممنوع الخطف والتثبيت في البقالات أو متاجر السلاح أثناء شيفت الميناء
        أو أماكن السرقات في وجود سرقة.
      </p>
      <p>⭐ - ممنوع الخطف والتثبيت في المناطق الآمنة الأساسية.</p>
      <p>
        ⭐ - ممنوع تثبيت أو الاعتداء على المريض بعد تواجد المسعف أو ترصده لمدة
        دقيقتان على الأقل.
      </p>
      <p>
        ⭐ - يسمح للخاطف أن يأخذ كل ما في شنطة الرهينة أثناء التثبيت ما عدا
        الفلوس، يأخذ فقط 5 آلاف.
      </p>
      <p>⭐ - ممنوع تثبيت أو خطف الشرطي.</p>
      <p>⭐ - ممنوع تثبيت أو خطف في وقت إيفينت.</p>
      <p>
        ⭐ - ممنوع خطف مواطن أو شرطة وإدخاله في منطقة قريبة من الترف أو داخل
        الترف حتى.
      </p>
    </div>
  ),
  "Kidnapping Rules": (
    <div className="space-y-3">
      <p>⭐ - التوكسيك مسموح ولكن في نطاق الرول بلاي فقط.</p>
      <p>⭐ - يمنع الخطف إلا في وجود عدد 4 شرطة في المدينة على الأقل.</p>
      <p>⭐ - مسموح ركوب حد أقصى 2 أشخاص في حقيبة السيارة.</p>
      <p>⭐ - يمنع خطف الشرطة أو الميكانيكي في حالة طلبهم عن طريق الهاتف.</p>
      <p>
        ⭐ - ممنوع الترصد لشخص معين ويجب أن يكون هناك سبب مقنع للخطف (مثال: طلب
        فدية أو ضغينة).
      </p>
      <p>
        ⭐ - يمنع خطف المسعف أو الاعتداء عليه، يمكن فقط تهديده لإخلاء المكان.
      </p>
      <p>
        ⭐ - يجب أن لا تزيد مدة سيناريو الخطف عن 15 دقيقة في حالة عدم تواجد
        الشرطة للتفاوض، وفي حالة تواجد الشرطة تنتهي المدة حين ينتهي السيناريو.
      </p>
      <p>
        ⭐ - عند عدم تنفيذ الطلب من المخطوف، يجب على الخاطف التهديد مرتين قبل
        القتل.
      </p>
      <p>⭐ - لا يسمح بالتثبيت في شارع محيط لجرين زون.</p>
      <p>
        ⭐ - التثبيت والمطاردة تبدأ من سماع الطرف الآخر للتهديد ووجود شيء يهدد
        حياته (في حالة إطلاق النار من بعيد للتثبيت، تحاسب من الإدارة).
      </p>
      <p>
        ⭐ - يمكن فقط قتل اللاعب داخل المطاردة في حالة وصول السيارة إلى حالة
        ثبات وعدم اتباع الرهينة للأوامر من خلال التهديد.
      </p>
    </div>
  ),
  "Kidnap Payoff Rules": (
    <div className="space-y-3">
      <p>⭐ - الحد الأقصى لطلب فدية على المواطن إجماليًا: 3 آلاف.</p>
      <p>⭐ - الحد الأقصى لطلب فدية على شرطي إجماليًا: 7 آلاف.</p>
      <p>⭐ - الحد الأقصى لطلب فدية على وزير أو نائب وزير الداخلية: 12 ألف.</p>
    </div>
  ),
  "Negotiation Rules": (
    <div className="space-y-3">
      <p>
        ⭐ - التفاوض يكون بالراديو المخصص للسرقة ولا يسمح بدخوله إلا المتواجدين
        في السطو المسلح.
      </p>
      <p>
        ⭐ - يحق للمجرم أن يطلب أن التفاوض يكون وجهًا لوجه بشرط عدم التعرض
        للمفاوض أو أي من قوات الشرطة خلال التفاوض.
      </p>
      <p>⭐ - ممنوع الاعتداء على المفاوض إلا في حالة حمل السلاح.</p>
      <p>⭐ - يسمح للرهينة التفاوض عن نفسه في حالة عدم وجود مفاوض.</p>
      <p>⭐ - الحد الأقصى لطلب الطلبات هو 3 طلبات وغير مسموح بطلب زيادتها.</p>
      <p>⭐ - ممنوع طلب تعجيزي مثل سلاح أو طيارة.</p>
      <p>
        ⭐ - لا يمكن طلب التفاوض على رهينة داخل المقر الخاص بك، وعليك التمويه عن
        مكان مقرك في مكان خارجي للتفاوض ونقل الرهينة خارج المقر في حالة التفاوض.
      </p>
    </div>
  ),
  "General Gang Rules": (
    <div className="space-y-3">
      <p>
        ⭐ - ممنوع لأي فرد من العصابة العمل بوظيفة رسمية إلا إذا كان له شخصية
        ثانية.
      </p>
      <p>⭐ - يجب ارتداء زي العصابة في الأعمال الإجرامية.</p>
      <p>⭐ - لا يجوز ارتداء زي أو قيادة سيارة عصابة أخرى.</p>
      <p>⭐ - يجب أن يكون للعصابة زي خاص للسرقات ويُغير بعد الانتهاء.</p>
      <p>⭐ - العصابة ستلغى إذا استمرت الأخطاء من أفرادها.</p>
      <p>⭐ - لا يجوز إنشاء عصابتين بنفس الاسم ويجب أن تكون الأسماء واقعية.</p>
      <p>
        ⭐ - يمنع استخدام مقر العصابة في أغراض غير قانونية إلا في السيناريوهات
        المتفق عليها.
      </p>
      <p>
        ⭐ - يجب أن يتواجد 50% من أفراد العصابة في المدينة، أو ستصادر العصابة
        خلال شهر.
      </p>
      <p>⭐ - إذا لم تتواجد العصابة لمدة شهر، سيتم مسح ممتلكاتها.</p>
      <p>⭐ - الحد الأقصى للعصابات الرسمية 15 والأدنى 10.</p>
      <p>
        ⭐ - الهجوم على المقرات يجب أن يُحذر قبل 15 دقيقة، ويجب أن يكون هناك 8
        أفراد من العصابة المالكة.
      </p>
      <p>⭐ - يجب على كل فرد من العصابة معاداة العصابات الأخرى.</p>
      <p>⭐ - تحالف العصابات ممنوع.</p>
      <p>
        ⭐ - عند دخول عصابة مكان المخدرات أو غسيل الأموال، يجب إعلان احتلال
        العصابة للمكان بعد دخوله والسيطرة عليه بالكامل.
      </p>
      <p>
        ⭐ - إلغاء احتلال العصابة على أماكن المخدرات وغسيل الأموال يكون فقط
        بإعلان العصابة الرحيل أو هجوم عصابة أخرى وقتل جميع أفراد العصابة
        المحتلة، ويجب إعلان الهجوم قبلها بـ10 دقائق، وممنوع انسحاب العصابة
        الأخرى عند إعلان الهجوم عليهم.
      </p>
      <p>
        ⭐ - يجب على العصابة أن تقرر إذا عرض عليها أحد خارج العصابة بأنه يريد
        غسيل أموال أو تصنيع مخدرات، ويكون قرار العصابة بنعم أو لا، ونعم تكون
        بشروط معينة تحددها العصابة وتكون الشروط نسبة في المخدرات المصنعة أو نسبة
        من المال المغسول أو أخذ المال من الشخص وغسله من قبل العصابة، وفي هذه
        الحالة مسموح النصب من قبل العصابة على الفرد الآخر.
      </p>
    </div>
  ),
  "Pickpocket Rules": (
    <div className="space-y-3">
      <p>
        ⭐ - مسموح سرقة جميع الأسلحة من المواطنين الذين تم تثبيتهم من قبل
        العصابة.
      </p>
      <p>⭐ - مسموح سرقة أموال وأسلحة ومصادرات فقط.</p>
      <p>⭐ - ممنوع سرقة شخص ميت الترفات.</p>
      <p>⭐ - ممنوع تمامًا سرقة معدات الإسعاف.</p>
    </div>
  ),
  "King of Hill Rules": (
    <div className="space-y-3">
      <p>
        ⭐ - ممنوع تدخل أي عصابة أخرى في السيناريو الخاص بإعلان السيطرة على
        المنطقة بأي شكل من الأشكال.
      </p>
      <p>
        ⭐ - التفاوض يكون بالأولوية بترتيب التالي: شرطة ثم عصابة الشخص ثم الشخص
        نفسه مع اتباع قوانين الخطف.
      </p>
      <p>
        ⭐ - ممنوع فرض السيطرة في الجرين زون أو في المقرات أو في مكان السرقات.
      </p>
      <p>⭐ - مسموح فرض السيطرة على المناطق الخاصة بالمخدرات وغسيل الأموال.</p>
    </div>
  ),
  "PERMA BAN": (
    <div className="space-y-3 text-red-600">
      <p className="font-bold">
        ⚠️ هذه القوانين تؤدي إلى حظر دائم عند المخالفة:
      </p>
      <p>🔥 - التخريب في المدينة باستعمال برامج أو هاك.</p>
      <p>
        🔥 - التخريب في المدينة بعدم اتباع القوانين الأساسية بطريقة همجية أو
        الفيل آر بي الصريح بهدف التخريب.
      </p>
      <p>
        🔥 - سب أو إهانة الإدارة في المدينة أو الدسكورد أو مكان خارج المدينة.
      </p>
      <p>🔥 - معاكسة البنات.</p>
      <p>🔥 - إمداد الإدارة بمعلومات خاطئة.</p>
      <p>🔥 - انتحال شخصية إداري أو استعمال اختصار اسم الإدارة.</p>
      <p>🔥 - بيع ممتلكات بالمدينة بأموال حقيقية.</p>
      <p>🔥 - عدم الجدية في التعامل مع أنظمة المدينة.</p>
      <p>🔥 - سب صريح لشخص في الدسكورد الخاص بنا أو المدينة.</p>
      <p>🔥 - سب شخص بسبب كومبلين في أي مكان.</p>
      <p>
        🔥 - ترشيح مدينة أخرى للاعب بالمدينة من خلال الدسكورد أو البريفت أو داخل
        المدينة.
      </p>
      <p>
        🔥 - ممنوع نقل ما يجري بداخل المدينة إلى خارج المدينة، وعليك الفصل بين
        وقت اللعب وتعاملاتك مع الآخرين خارج اللعبة، وفي حالة التحكيم على الآخرين
        أو التريقة أو استغلال المدينة خارجيًا لبدء نقاشات عما يدور بداخل المدينة
        بدون إذن الإدارة، تعاقب عقابًا مضاعفًا على تقمص الرول بلاي خارج المدينة
        وتحكيم الآخرين أو التدخل في مسؤوليات الإدارة.
      </p>
      <p>
        🔥 - ممنوع التعمد الصريح في كسر قواعد اللعبة والشروع في ضرر لباقي
        اللاعبين مثل التصرف بطريقة همجية بعدم اتباع القوانين أو استغلال المدينة
        لعدم الاهتمام لكونها لعبة وإلحاق الضرر بالآخرين خارج قواعد الرول بلاي
        (من هو أقل من 100 ساعة لعب يعاقب عادي بكسر القانون ولا يعاقب الضعف أو
        حسب تحكيم الإدارة).
      </p>
    </div>
  ),
};

export default function RulesPage() {
  const [expandedTitleIndex, setExpandedTitleIndex] = useState(-1);
  const [selectedTopic, setSelectedTopic] = useState("");
  const contentRef = useRef(null);
  const showNote = () => {
    toast.success("Thank you for reading the rules!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };


  const handleTitleClick = (index) => {
    setExpandedTitleIndex(expandedTitleIndex === index ? -1 : index);
    setSelectedTopic("");
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  useEffect(() => {
    if (contentRef.current && selectedTopic) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedTopic]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-5xl font-extrabold mb-10 text-center text-[#035ea3] drop-shadow-lg">
          📜 Server Rules 📜
        </h1>

        <div className="space-y-6">
          {rulesData.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
            >
              <div
                className={`p-5 cursor-pointer transition-colors ${
                  expandedTitleIndex === index
                    ? "bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleTitleClick(index)}
              >
                <h2 className="text-2xl font-bold flex items-center text-white">
                  {section.icon}
                  <span className="ml-3">{section.title}</span>
                  <FiChevronLeft
                    className={`ml-auto transform transition-transform ${
                      expandedTitleIndex === index ? "rotate-90" : "-rotate-90"
                    } text-yellow-300`}
                  />
                </h2>
              </div>

              {expandedTitleIndex === index && (
                <div className="border-t border-gray-600 p-5 bg-gray-900">
                  {section.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className={`p-4 mb-3 rounded-lg cursor-pointer transition-all ${
                        selectedTopic === topic
                          ? "bg-blue-600 border-l-4 border-yellow-300"
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                      onClick={() => handleTopicClick(topic)}
                    >
                      <p className="text-white font-medium">{topic}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {selectedTopic && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 bg-gray-800 rounded-xl shadow-2xl p-8"
          >
            <h3 className="text-3xl font-bold mb-6 text-yellow-300">
              {selectedTopic}
            </h3>
            <div className="space-y-4 text-gray-200 leading-relaxed">
              {rulesContent[selectedTopic]}
            </div>
          </motion.div>
        )}

        <div className="mt-12 text-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transform transition-all hover:scale-105 shadow-lg"
            onClick={showNote}
          >
            Did you read the rules?
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
