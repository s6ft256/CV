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
      },
      hero: {
        title: 'Elius Niwamanya',
        subtitle: 'Full-Stack Developer & IOSH-Certified HSE Personnel',
        contact: 'Contact Me',
        viewProjects: 'View Projects',
        resume: 'Resume',
        available: 'Available for opportunities',
      },
      experience: {
        title: 'Work Experience',
        current: 'Current',
      },
      skills: {
        title: 'Skills',
      },
      projects: {
        title: 'Projects',
      },
      education: {
        title: 'Education',
      },
      certifications: {
        title: 'Certifications',
      },
      contact: {
        title: 'Get In Touch',
        send: 'Send Message',
        email: 'Email',
        phone: 'Phone',
        whatsapp: 'WhatsApp',
        location: 'Location',
      },
      footer: {
        copyright: '© 2024 Elius Niwamanya. All rights reserved.',
        builtWith: 'Built with',
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
      },
      hero: {
        title: 'إيليوس نيوانيا',
        subtitle: 'مطور كامل المكدس ومختص في الصحة والسلامة المهنية',
        contact: 'تواصل معي',
        viewProjects: 'عرض المشاريع',
        resume: 'السيرة الذاتية',
        available: 'متاح للفرص',
      },
      experience: {
        title: 'الخبرة العملية',
        current: 'الحالي',
      },
      skills: {
        title: 'المهارات',
      },
      projects: {
        title: 'المشاريع',
      },
      education: {
        title: 'التعليم',
      },
      certifications: {
        title: 'الشهادات',
      },
      contact: {
        title: 'تواصل معي',
        send: 'إرسال الرسالة',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        whatsapp: 'واتساب',
        location: 'الموقع',
      },
      footer: {
        copyright: '© 2024 إيليوس نيوانيا. جميع الحقوق محفوظة.',
        builtWith: 'تم البناء باستخدام',
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

export default i18n
