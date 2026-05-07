import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        skills: 'Skills',
        projects: 'Projects',
        education: 'Education',
        certifications: 'Certifications',
        contact: 'Contact',
        minigame: 'MiniGame',
        github: 'GitHub',
      },
      about: {
        pillar1: {
          title: 'Full-Stack Engineering',
          body: 'React, TypeScript, Next.js on the frontend; Python, Django, FastAPI on the backend. End-to-end ownership from database schema to production deployment.',
        },
        pillar2: {
          title: 'HSE & Compliance Systems',
          body: 'IOSH-certified professional who builds safety-critical tools — incident management, compliance reporting, risk assessment dashboards — that keep teams and regulators aligned.',
        },
        pillar3: {
          title: 'Data Automation & Analytics',
          body: 'Automated reporting pipelines that cut manual effort by 80%+. Power BI dashboards, real-time KPI tracking, and workflow automation for enterprise and SME clients.',
        },
        pillar4: {
          title: 'DevOps & Cloud',
          body: 'Docker, CI/CD pipelines, AWS infrastructure and GitHub Actions. Built to ship reliably — from commit to production with minimal friction.',
        },
      },
      hero: {
        title: 'Elius Niwamanya',
        subtitle: 'Full-Stack Developer & IOSH-Certified HSE Personnel',
        summary:
          'Full-stack engineer uniting Python, Django, and modern JavaScript frameworks with IOSH-informed HSE leadership. Designs security-conscious tools that automate reporting, uphold compliance, and keep teams aligned on safety.',
        contact: 'Contact Me',
        viewProjects: 'View Projects',
        resume: 'Resume',
        available: 'Available for work',
        yearsExperience: 'Years Experience',
        projectsCompleted: 'Projects Completed',
        certified: 'Certified',
        nationality: 'Nationality',
      },
      experience: {
        title: 'Work Experience',
        subtitle: 'Professional Journey & Achievements',
        current: 'Current',
        present: 'Present',
        exp1: {
          title: 'Senior Full-Stack Developer',
          company: 'Trojan Construction Group',
          location: 'Dubai, UAE',
          description: [
            'Led development of enterprise safety management platform using Django and React',
            'Implemented automated compliance reporting reducing manual work by 80%',
            'Architected microservices infrastructure handling 10,000+ daily transactions',
          ],
        },
        exp2: {
          title: 'Freelance Full-Stack Developer & HSE Consultant',
          company: 'Independent / Remote',
          location: 'Uganda · Remote',
          description: [
            'Designed and implemented digital HSE reporting tools for construction and industrial clients',
            'Developed custom incident management and risk assessment web apps using Django and React',
            'Automated safety audit workflows, improving compliance and reducing paperwork',
            'Integrated analytics dashboards for real-time safety KPI tracking',
            'Provided HSE training and digital transformation consulting for safety teams',
            'Delivered projects for clients in construction, oil & gas, and logistics sectors',
          ],
        },
      },
      skills: {
        title: 'Skills',
        subtitle: 'Technologies and tools I work with daily',
      },
      projects: {
        title: 'Projects',
        subtitle: 'Featured work and open source contributions',
        loading: 'Loading projects...',
        viewCode: 'View Code',
        liveDemo: 'Live Demo',
        viewAllRepos: 'View all repositories on GitHub',
        noDescription: 'No description available',
      },
      hseHighlights: {
        trainingTitle: 'Training at JBL5',
        trainingDescription:
          'Toolbox Talk (TBT) and practical training for flagmen/signalmen and riggers, covering safe signalling protocols, lifting communications, standard hand signals, rigging checks, load-path awareness, spotter responsibilities, and PPE requirements.',
        trainingPoint1: 'Safe signalling and lifting communications',
        trainingPoint2: 'Standard hand signals and spotter responsibilities',
        trainingPoint3: 'Rigging checks, load-path awareness, and PPE',
        trainingImageCaption: 'Image: Training/TBT with flagmen, signalmen, and riggers at JBL5',
        inspectionTitle: 'Inspections at JBL5',
        inspectionDescription:
          'Field inspections for the JBL Etihad Rail road works, focusing on equipment compliance, lifting and rigging setups, permits and documentation, and overall site readiness.',
        inspectionPoint1: 'Equipment compliance and rigging setups',
        inspectionPoint2: 'Work permits, traffic management, barricading and signage',
        inspectionPoint3: 'Housekeeping standards and audit documentation readiness',
        inspectionImageCaption: 'Image: On-site inspection for JBL Etihad Rail road works',
      },
      certifications: {
        title: 'Certifications',
        subtitle: 'Professional certifications and credentials',
        categoryHSE: 'HSE & Safety',
        categoryAI: 'AI & Technology',
        categoryIT: 'IT & Cybersecurity',
        categoryBusiness: 'Business & Professional',
        certCount: 'cert',
        certCountPlural: 'certs',
        issued: 'Issued',
        expires: 'Exp.',
        viewCredential: 'View credential',
      },
      education: {
        title: 'Education',
        subtitle: 'Academic background and qualifications',
      },
      contact: {
        title: 'Get In Touch',
        subtitle: "Let's discuss your next project or opportunity",
        send: 'Send Message',
        email: 'Email',
        phone: 'Phone',
        whatsapp: 'WhatsApp',
        location: 'Location',
        letsWorkTogether: "Let's work together",
        description:
          "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your.email@example.com',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your project...',
      },
      footer: {
        description:
          'Building robust software solutions with a focus on quality and user experience.',
        quickLinks: 'Quick Links',
        connect: 'Connect',
        allRightsReserved: 'All rights reserved.',
      },
      github: {
        contributions: 'Contributions',
        contributionsHint: '(last 20 wks)',
        repositories: 'Repositories',
        totalStars: 'Total Stars',
        totalForks: 'Total Forks',
        followers: 'Followers',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        about: 'حول',
        experience: 'الخبرة',
        skills: 'المهارات',
        projects: 'المشاريع',
        education: 'التعليم',
        certifications: 'الشهادات',
        contact: 'اتصل',
        minigame: 'لعبة الذاكرة',
        github: 'جيت هب',
      },
      about: {
        pillar1: {
          title: 'هندسة الويب الكاملة',
          body: 'React و TypeScript و Next.js على الواجهة الأمامية؛ Python و Django و FastAPI على الواجهة الخلفية. ملكية شاملة من مخطط قاعدة البيانات إلى النشر في الإنتاج.',
        },
        pillar2: {
          title: 'أنظمة الصحة والسلامة والامتثال',
          body: 'محترف معتمد من IOSH يبني أدوات حرجة للسلامة — إدارة الحوادث، و تقارير الامتثال، و لوحات تقييم المخاطر — التي تبقي الفرق والمنظمين متوافقين.',
        },
        pillar3: {
          title: 'أتمتة البيانات والتحليلات',
          body: 'خطوط أنابيب التقارير الآلية التي تقلل الجهد اليدوي بنسبة 80%+. لوحات تحكم Power BI، وتتبع مؤشرات الأداء الرئيسية في الوقت الفعلي، وأتمتة سير العمل لعملاء الشركات والمؤسسات الصغيرة والمتوسطة.',
        },
        pillar4: {
          title: 'DevOps والسحابة',
          body: 'Docker وخطوط أنابيب CI/CD وبنية AWS الأساسية وGitHub Actions. مبني للشحن بشكل موثوق — من الالتزام إلى الإنتاج مع احتكاك أقل.',
        },
      },
      hero: {
        title: 'إيليوس نيوانيا',
        subtitle: 'مطور كامل المكدس ومختص في الصحة والسلامة المهنية',
        summary:
          'مهندس كامل المكدس يجمع بين Python و Django وأطر JavaScript الحديثة مع قيادة في الصحة والسلامة المهنية مستنيرة بـ IOSH. يصمم أدوات واعية للأمن تقوم بأتمتة التقارير، وتحافظ على الامتثال، وتحافظ على توافق الفرق بشأن السلامة.',
        contact: 'تواصل معي',
        viewProjects: 'عرض المشاريع',
        resume: 'السيرة الذاتية',
        available: 'متاح للفرص',
        yearsExperience: 'سنوات الخبرة',
        projectsCompleted: 'المشاريع المكتملة',
        certified: 'معتمد',
        nationality: 'الجنسية',
      },
      experience: {
        title: 'الخبرة العملية',
        subtitle: 'رحلتي المهنية في بناء حلول البرمجيات',
        current: 'الحالي',
        present: 'الحاضر',
        exp1: {
          title: 'مطور كامل المكدس أول',
          company: 'مجموعة تروجان للإنشاءات',
          location: 'دبي، الإمارات',
          description: [
            'قاد تطوير منصة إدارة السلامة للمؤسسات باستخدام Django و React',
            'نفذ تقارير الامتثال الآلية مما قلل العمل اليدوي بنسبة 80%',
            'صمم بنية الخدمات المصغرة التي تتعامل مع أكثر من 10,000 معاملة يومية',
          ],
        },
        exp2: {
          title: 'مطور كامل المكدس مستقل ومستشار في الصحة والسلامة المهنية',
          company: 'مستقل / عن بعد',
          location: 'أوغندا · عن بعد',
          description: [
            'صمم ونفذ أدوات التقارير الرقمية للصحة والسلامة لعملاء البناء والصناعة',
            'طور تطبيقات الويب المخصصة لإدارة الحوادث وتقييم المخاطر باستخدام Django و React',
            'أتمتة عمليات تدقيق السلامة، مما حسن الامتثال وقلل الأعمال الورقية',
            'دمج لوحات تحكم التحليلات لتتبع مؤشرات الأداء الرئيسية للسلامة في الوقت الفعلي',
            'قدم تدريبًا في الصحة والسلامة واستشارات التحول الرقمي لفرق السلامة',
            'نفذ مشاريع لعملاء في قطاعات البناء والنفط والغاز والخدمات اللوجستية',
          ],
        },
      },
      skills: {
        title: 'المهارات',
        subtitle: 'التقنيات والأدوات التي أعمل بها يوميًا',
      },
      projects: {
        title: 'المشاريع',
        subtitle: 'أعمال مميزة ومساهمات مفتوحة المصدر',
        loading: 'جاري تحميل المشاريع...',
        viewCode: 'عرض الكود',
        liveDemo: 'عرض توضيحي مباشر',
        viewAllRepos: 'عرض جميع المستودعات على GitHub',
        noDescription: 'لا يوجد وصف متاح',
      },
      hseHighlights: {
        trainingTitle: 'التدريب في JBL5',
        trainingDescription:
          'محادثة صندوق الأدوات (TBT) والتدريب العملي لرافعي الإشارات/الإشارات والرافعين، يغطي بروتوكولات الإشارات الآمنة، واتصالات الرفع، وإشارات اليد القياسية، وفحوصات الرفع، ووعي مسار الحمل، ومسؤوليات المراقب، ومتطلبات معدات الحماية الشخصية.',
        trainingPoint1: 'الإشارات الآمنة واتصالات الرفع',
        trainingPoint2: 'إشارات اليد القياسية ومسؤوليات المراقب',
        trainingPoint3: 'فحوصات الرفع، ووعي مسار الحمل، ومعدات الحماية الشخصية',
        trainingImageCaption: 'صورة: التدريب/TBT مع رافعي الإشارات والرافعين في JBL5',
        inspectionTitle: 'فحوصات في JBL5',
        inspectionDescription:
          'فحوصات ميدانية لأعمال السكك الحديدية JBL Etihad Rail، مع التركيز على امتثال المعدات، وإعدادات الرفع والتجهيز، والتصاريح والتوثيق، والجاهزية العامة للموقع.',
        inspectionPoint1: 'امتثال المعدات وإعدادات الرفع',
        inspectionPoint2: 'تصاريح العمل، وإدارة المرور، والحواجز واللافتات',
        inspectionPoint3: 'معايير النظافة وجاهزية توثيق التدقيق',
        inspectionImageCaption: 'صورة: فحص ميداني لأعمال السكك الحديدية JBL Etihad Rail',
      },
      certifications: {
        title: 'الشهادات',
        subtitle: 'الشهادات والمؤهلات المهنية',
        categoryHSE: 'الصحة والسلامة المهنية',
        categoryAI: 'الذكاء الاصطناعي والتكنولوجيا',
        categoryIT: 'تكنولوجيا المعلومات والأمن السيبراني',
        categoryBusiness: 'الأعمال والمهنية',
        certCount: 'شهادة',
        certCountPlural: 'شهادات',
        issued: 'صدرت',
        expires: 'تنتهي',
        viewCredential: 'عرض المؤهل',
      },
      education: {
        title: 'التعليم',
        subtitle: 'الخلفية الأكاديمية والمؤهلات',
      },
      contact: {
        title: 'تواصل معي',
        subtitle: 'لنناقش مشروعك القادم أو الفرصة المتاحة',
        send: 'إرسال الرسالة',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        whatsapp: 'واتساب',
        location: 'الموقع',
        letsWorkTogether: 'لنعمل معًا',
        description:
          'أنا مهتم دائمًا بسماع المشاريع والفرص الجديدة. سواء كان لديك سؤال أو تريد فقط أن تقول مرحبًا، لا تتردد في التواصل!',
        nameLabel: 'الاسم',
        namePlaceholder: 'اسمك',
        emailPlaceholder: 'your.email@example.com',
        messageLabel: 'الرسالة',
        messagePlaceholder: 'أخبرني عن مشروعك...',
      },
      footer: {
        description: 'بناء حلول برمجيات قوية مع التركيز على الجودة وتجربة المستخدم',
        quickLinks: 'روابط سريعة',
        connect: 'تواصل',
        allRightsReserved: 'جميع الحقوق محفوظة.',
      },
      github: {
        contributions: 'المساهمات',
        contributionsHint: '(آخر 20 أسبوع)',
        repositories: 'المستودعات',
        totalStars: 'إجمالي النجوم',
        totalForks: 'إجمالي النسخ المتفرعة',
        followers: 'المتابعون',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

// Set initial document direction
if (i18n.language === 'ar') {
  document.documentElement.dir = 'rtl'
  document.documentElement.lang = 'ar'
} else {
  document.documentElement.dir = 'ltr'
  document.documentElement.lang = 'en'
}

export default i18n
