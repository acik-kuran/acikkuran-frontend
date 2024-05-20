import LogoSvg_en from "@assets/images/logo_en.svg";
import LogoSvg_tr from "@assets/images/logo_tr.svg";

module.exports = [
  {
    locale: "tr",
    domain: process.env.NEXT_PUBLIC_DOMAIN_LOCALE_TR,
    manifest: "/locales/tr/manifest.json",
    logo: {
      component: LogoSvg_tr,
      alt: "Açık Kuran",
      height: "20px",
    },
    heroImages: {
      dark: "/locales/tr/images/bg/d-bg.webp",
      light: "/locales/tr/images/bg/bg.webp",
      darkMobile:
        "/locales/tr/images/bg/d-bg-m.webp",
      lightMobile: "/locales/tr/images/bg/bg-m.webp",
    },
    createPasswordEmailParams: {
      site_title: "Açık Kuran",
      description:
        "Açık Kuran tek kullanımlık şifreniz aşağıda belirtilmiştir.",
      greetings: "Selam,",
      twitter_handle: "acikkuran",
      logo_src:
        "https://acikkuran.com/locales/tr/images/manifest/android-chrome-192x192.png",
      subject: "Açık Kuran - Tek Kullanımlık Şifre",
      from: "Açık Kuran",
    },
  },
  {
    locale: "en",
    domain: process.env.NEXT_PUBLIC_DOMAIN_LOCALE_EN,
    manifest: "/locales/en/manifest.json",
    logo: {
      component: LogoSvg_en,
      alt: "Quran.so",
      height: "14px",
    },
    heroImages: {
      dark: "https://images.unsplash.com/photo-1507237081139-5dfb209dba79?q=92&w=1436&h=900&auto=format&fit=crop",
      light: "/locales/en/images/bg/bg.webp",
      darkMobile:
        "https://images.unsplash.com/photo-1509484710660-55e53f20a84b?q=95&w=502&h=1000&auto=format&fit=crop",
      lightMobile: "/locales/en/images/bg/bg-m.webp",
    },
    createPasswordEmailParams: {
      site_title: "Quran.so",
      description: "Your single-use password is below.",
      greetings: "Hello,",
      twitter_handle: "quran_so",
      logo_src:
        "https://quran.so/locales/en/images/manifest/android-chrome-192x192.png",
      subject: "Quran.so - Single-use Password",
      from: "Quran.so",
    },
  },
];
