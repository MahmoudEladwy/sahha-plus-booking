// Mock data for Sehha Plus MVP
import { Heart, Brain, Baby, Bone, Eye, Stethoscope, Smile, Activity, Pill, Sparkles } from "lucide-react";

export type Specialty = {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: typeof Heart;
  count: number;
  color: string;
};

export const specialties: Specialty[] = [
  { id: "cardio", nameAr: "أمراض القلب", nameEn: "Cardiology", icon: Heart, count: 482, color: "oklch(0.78 0.12 25)" },
  { id: "neuro", nameAr: "المخ والأعصاب", nameEn: "Neurology", icon: Brain, count: 213, color: "oklch(0.7 0.14 290)" },
  { id: "pedia", nameAr: "طب الأطفال", nameEn: "Pediatrics", icon: Baby, count: 612, color: "oklch(0.82 0.1 165)" },
  { id: "ortho", nameAr: "العظام", nameEn: "Orthopedics", icon: Bone, count: 391, color: "oklch(0.75 0.1 80)" },
  { id: "ophth", nameAr: "العيون", nameEn: "Ophthalmology", icon: Eye, count: 287, color: "oklch(0.7 0.12 220)" },
  { id: "general", nameAr: "طب عام", nameEn: "General Practice", icon: Stethoscope, count: 1024, color: "oklch(0.72 0.1 200)" },
  { id: "dental", nameAr: "الأسنان", nameEn: "Dentistry", icon: Smile, count: 745, color: "oklch(0.78 0.1 50)" },
  { id: "derma", nameAr: "الجلدية", nameEn: "Dermatology", icon: Sparkles, count: 318, color: "oklch(0.78 0.11 350)" },
  { id: "internal", nameAr: "الباطنة", nameEn: "Internal Medicine", icon: Activity, count: 567, color: "oklch(0.65 0.13 30)" },
  { id: "pharma", nameAr: "الصيدلة", nameEn: "Pharmacy", icon: Pill, count: 198, color: "oklch(0.7 0.12 145)" },
];

export type Doctor = {
  id: string;
  nameAr: string;
  nameEn: string;
  specialtyAr: string;
  specialtyEn: string;
  specialtyId: string;
  hospitalAr: string;
  hospitalEn: string;
  cityAr: string;
  cityEn: string;
  areaAr: string;
  areaEn: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  gender: "male" | "female";
  languages: string[];
  insurances: string[];
  consultationTypes: ("clinic" | "online" | "home")[];
  nextSlot: string;
  verified: boolean;
  avatar: string;
  bio: { ar: string; en: string };
  branches: { name: string; address: string }[];
};

const avatars = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=faces",
];

export const doctors: Doctor[] = [
  {
    id: "d1",
    nameAr: "د. سارة المنصوري",
    nameEn: "Dr. Sara Al-Mansoori",
    specialtyAr: "أمراض القلب",
    specialtyEn: "Cardiology",
    specialtyId: "cardio",
    hospitalAr: "مستشفى الملك فيصل التخصصي",
    hospitalEn: "King Faisal Specialist Hospital",
    cityAr: "الرياض",
    cityEn: "Riyadh",
    areaAr: "العليا",
    areaEn: "Al Olaya",
    experience: 14,
    rating: 4.9,
    reviews: 312,
    fee: 450,
    gender: "female",
    languages: ["العربية", "English", "Français"],
    insurances: ["بوبا", "تعاونية", "ميدغلف"],
    consultationTypes: ["clinic", "online"],
    nextSlot: "اليوم 3:00 م",
    verified: true,
    avatar: avatars[0],
    bio: {
      ar: "استشارية قلب وأوعية دموية بخبرة 14 عاماً، حاصلة على الزمالة البريطانية. متخصصة في أمراض القلب التداخلية وقسطرة الشرايين التاجية.",
      en: "Consultant cardiologist with 14 years of experience and a British fellowship. Specialized in interventional cardiology and coronary catheterization.",
    },
    branches: [
      { name: "العليا - الرياض", address: "طريق الملك فهد، حي العليا" },
      { name: "الياسمين - الرياض", address: "شارع التخصصي، حي الياسمين" },
    ],
  },
  {
    id: "d2",
    nameAr: "د. خالد الراشد",
    nameEn: "Dr. Khalid Al-Rashed",
    specialtyAr: "المخ والأعصاب",
    specialtyEn: "Neurology",
    specialtyId: "neuro",
    hospitalAr: "مستشفى كليفلاند كلينك أبوظبي",
    hospitalEn: "Cleveland Clinic Abu Dhabi",
    cityAr: "أبوظبي",
    cityEn: "Abu Dhabi",
    areaAr: "جزيرة المارية",
    areaEn: "Al Maryah Island",
    experience: 18,
    rating: 4.8,
    reviews: 421,
    fee: 600,
    gender: "male",
    languages: ["العربية", "English"],
    insurances: ["دامان", "نكست كير", "أكسا"],
    consultationTypes: ["clinic", "online", "home"],
    nextSlot: "غداً 10:30 ص",
    verified: true,
    avatar: avatars[1],
    bio: {
      ar: "استشاري أمراض المخ والأعصاب، خبرة في علاج الصداع النصفي والصرع وأمراض الباركنسون.",
      en: "Consultant neurologist with expertise in migraines, epilepsy, and Parkinson's disease.",
    },
    branches: [{ name: "Cleveland Clinic Abu Dhabi", address: "Al Maryah Island, Abu Dhabi" }],
  },
  {
    id: "d3",
    nameAr: "د. نورة الزهراني",
    nameEn: "Dr. Noura Al-Zahrani",
    specialtyAr: "طب الأطفال",
    specialtyEn: "Pediatrics",
    specialtyId: "pedia",
    hospitalAr: "مستشفى السعودي الألماني",
    hospitalEn: "Saudi German Hospital",
    cityAr: "جدة",
    cityEn: "Jeddah",
    areaAr: "الروضة",
    areaEn: "Al Rawdah",
    experience: 11,
    rating: 4.95,
    reviews: 587,
    fee: 350,
    gender: "female",
    languages: ["العربية", "English"],
    insurances: ["بوبا", "تعاونية", "ولاء"],
    consultationTypes: ["clinic", "online"],
    nextSlot: "اليوم 5:00 م",
    verified: true,
    avatar: avatars[2],
    bio: {
      ar: "استشارية طب الأطفال وحديثي الولادة، رفيقة الأطفال وموثوقة من الأمهات.",
      en: "Consultant pediatrician and neonatologist, beloved by children and trusted by mothers.",
    },
    branches: [{ name: "جدة - الروضة", address: "شارع الأمير سلطان، جدة" }],
  },
  {
    id: "d4",
    nameAr: "د. عبدالله البلوشي",
    nameEn: "Dr. Abdullah Al-Balushi",
    specialtyAr: "العظام",
    specialtyEn: "Orthopedics",
    specialtyId: "ortho",
    hospitalAr: "مستشفى الكويت الجامعي",
    hospitalEn: "Kuwait University Hospital",
    cityAr: "مدينة الكويت",
    cityEn: "Kuwait City",
    areaAr: "السالمية",
    areaEn: "Salmiya",
    experience: 22,
    rating: 4.7,
    reviews: 298,
    fee: 500,
    gender: "male",
    languages: ["العربية", "English"],
    insurances: ["الخليج للتأمين", "وربة"],
    consultationTypes: ["clinic", "online"],
    nextSlot: "بعد غد 11:00 ص",
    verified: true,
    avatar: avatars[3],
    bio: {
      ar: "استشاري جراحة العظام والمفاصل، متخصص في استبدال مفصل الركبة والورك بأحدث التقنيات.",
      en: "Consultant orthopedic surgeon, specialized in knee and hip replacement using the latest techniques.",
    },
    branches: [{ name: "السالمية", address: "شارع الخليج العربي" }],
  },
  {
    id: "d5",
    nameAr: "د. مريم العتيبي",
    nameEn: "Dr. Mariam Al-Otaibi",
    specialtyAr: "الجلدية",
    specialtyEn: "Dermatology",
    specialtyId: "derma",
    hospitalAr: "عيادات ديرما بلس",
    hospitalEn: "Derma Plus Clinics",
    cityAr: "الدوحة",
    cityEn: "Doha",
    areaAr: "اللؤلؤة",
    areaEn: "The Pearl",
    experience: 9,
    rating: 4.85,
    reviews: 412,
    fee: 380,
    gender: "female",
    languages: ["العربية", "English", "Türkçe"],
    insurances: ["قطر للتأمين", "أكسا"],
    consultationTypes: ["clinic", "online"],
    nextSlot: "اليوم 6:30 م",
    verified: true,
    avatar: avatars[4],
    bio: {
      ar: "استشارية جلدية وتجميل، خبرة في علاج البشرة والليزر والفيلر.",
      en: "Consultant dermatologist and aesthetician, expert in skincare, laser and fillers.",
    },
    branches: [{ name: "اللؤلؤة - الدوحة", address: "Porto Arabia, The Pearl" }],
  },
  {
    id: "d6",
    nameAr: "د. أحمد الشمري",
    nameEn: "Dr. Ahmed Al-Shammari",
    specialtyAr: "الأسنان",
    specialtyEn: "Dentistry",
    specialtyId: "dental",
    hospitalAr: "عيادات سمايل لاين",
    hospitalEn: "Smile Line Clinics",
    cityAr: "المنامة",
    cityEn: "Manama",
    areaAr: "السيف",
    areaEn: "Seef",
    experience: 13,
    rating: 4.9,
    reviews: 356,
    fee: 280,
    gender: "male",
    languages: ["العربية", "English"],
    insurances: ["البحرين للتأمين", "سوليدرتي"],
    consultationTypes: ["clinic"],
    nextSlot: "غداً 9:00 ص",
    verified: true,
    avatar: avatars[5],
    bio: {
      ar: "استشاري طب وتجميل الأسنان، متخصص في زراعة الأسنان وابتسامة هوليوود.",
      en: "Consultant cosmetic dentist, specialized in dental implants and Hollywood smile.",
    },
    branches: [{ name: "السيف - المنامة", address: "Seef District, Manama" }],
  },
  {
    id: "d7",
    nameAr: "د. ليلى الحارثي",
    nameEn: "Dr. Layla Al-Harthi",
    specialtyAr: "العيون",
    specialtyEn: "Ophthalmology",
    specialtyId: "ophth",
    hospitalAr: "مستشفى مسقط الخاص",
    hospitalEn: "Muscat Private Hospital",
    cityAr: "مسقط",
    cityEn: "Muscat",
    areaAr: "بوشر",
    areaEn: "Bawshar",
    experience: 16,
    rating: 4.88,
    reviews: 234,
    fee: 320,
    gender: "female",
    languages: ["العربية", "English"],
    insurances: ["عُمان للتأمين", "النصر"],
    consultationTypes: ["clinic", "online"],
    nextSlot: "اليوم 4:00 م",
    verified: true,
    avatar: avatars[6],
    bio: {
      ar: "استشارية عيون، متخصصة في عمليات الليزك وعلاج المياه البيضاء.",
      en: "Consultant ophthalmologist, specialized in LASIK and cataract surgery.",
    },
    branches: [{ name: "بوشر - مسقط", address: "Bawshar, Muscat" }],
  },
  {
    id: "d8",
    nameAr: "د. ياسر القحطاني",
    nameEn: "Dr. Yasser Al-Qahtani",
    specialtyAr: "الباطنة",
    specialtyEn: "Internal Medicine",
    specialtyId: "internal",
    hospitalAr: "مستشفى الحبيب",
    hospitalEn: "Habib Medical Center",
    cityAr: "الرياض",
    cityEn: "Riyadh",
    areaAr: "التخصصي",
    areaEn: "Takhassusi",
    experience: 10,
    rating: 4.75,
    reviews: 189,
    fee: 300,
    gender: "male",
    languages: ["العربية", "English"],
    insurances: ["بوبا", "تعاونية", "ميدغلف"],
    consultationTypes: ["clinic", "online", "home"],
    nextSlot: "غداً 1:00 م",
    verified: true,
    avatar: avatars[7],
    bio: {
      ar: "استشاري الباطنة العامة وأمراض السكري والضغط.",
      en: "Consultant internist specializing in diabetes and hypertension.",
    },
    branches: [{ name: "التخصصي - الرياض", address: "شارع التخصصي" }],
  },
];

export const cities = [
  { ar: "الرياض", en: "Riyadh" },
  { ar: "جدة", en: "Jeddah" },
  { ar: "الدمام", en: "Dammam" },
  { ar: "أبوظبي", en: "Abu Dhabi" },
  { ar: "دبي", en: "Dubai" },
  { ar: "مدينة الكويت", en: "Kuwait City" },
  { ar: "الدوحة", en: "Doha" },
  { ar: "المنامة", en: "Manama" },
  { ar: "مسقط", en: "Muscat" },
];

export const insurances = ["بوبا", "تعاونية", "ميدغلف", "دامان", "أكسا", "نكست كير", "ولاء", "سوليدرتي"];

export const insuranceLogos = [
  { name: "Bupa Arabia", color: "oklch(0.45 0.18 25)" },
  { name: "Tawuniya", color: "oklch(0.4 0.12 220)" },
  { name: "MedGulf", color: "oklch(0.55 0.15 145)" },
  { name: "Daman", color: "oklch(0.5 0.12 280)" },
  { name: "AXA", color: "oklch(0.35 0.05 250)" },
  { name: "NextCare", color: "oklch(0.5 0.16 30)" },
];

export const testimonials = [
  {
    id: 1,
    nameAr: "فاطمة الأحمد",
    nameEn: "Fatima Al-Ahmad",
    cityAr: "الرياض",
    cityEn: "Riyadh",
    rating: 5,
    textAr: "تجربة استثنائية! حجزت موعداً مع طبيبة أطفال خلال دقيقتين فقط. التطبيق سهل والأطباء محترفون.",
    textEn: "Exceptional experience! Booked a pediatrician in just two minutes. The app is intuitive and the doctors are world-class.",
  },
  {
    id: 2,
    nameAr: "محمد العنزي",
    nameEn: "Mohammed Al-Anazi",
    cityAr: "جدة",
    cityEn: "Jeddah",
    rating: 5,
    textAr: "أفضل منصة طبية استخدمتها. التقييمات صادقة والأسعار واضحة. أنصح بها بشدة.",
    textEn: "Best medical platform I've used. Reviews are honest and prices are transparent. Highly recommend.",
  },
  {
    id: 3,
    nameAr: "نورة السبيعي",
    nameEn: "Noura Al-Subaie",
    cityAr: "الدوحة",
    cityEn: "Doha",
    rating: 5,
    textAr: "خدمة الاستشارات الأونلاين وفّرت عليّ وقتاً كبيراً. تجربة فاخرة بكل المقاييس.",
    textEn: "The online consultation service saved me so much time. A truly premium experience.",
  },
];

export const faqItems = [
  {
    qAr: "كيف يمكنني حجز موعد مع طبيب؟",
    qEn: "How do I book an appointment?",
    aAr: "ابحث عن الطبيب المناسب باستخدام التخصص أو المدينة، اختر الموعد المناسب، ثم أكّد الحجز خلال دقائق.",
    aEn: "Search by specialty or city, pick a time slot that works for you, and confirm in minutes.",
  },
  {
    qAr: "هل يمكنني الحجز بدون إنشاء حساب؟",
    qEn: "Can I book without an account?",
    aAr: "نعم، يمكنك الحجز كزائر، لكن إنشاء حساب يتيح لك إدارة مواعيدك بسهولة.",
    aEn: "Yes, you can book as a guest, but creating an account makes managing appointments much easier.",
  },
  {
    qAr: "هل المدفوعات آمنة؟",
    qEn: "Are payments secure?",
    aAr: "جميع المعاملات مشفرة بأعلى معايير الأمان العالمية ومتوافقة مع PCI DSS.",
    aEn: "All transactions are encrypted to the highest international standards and PCI DSS compliant.",
  },
  {
    qAr: "هل تقبلون التأمين الطبي؟",
    qEn: "Do you accept insurance?",
    aAr: "نعم، نتعاون مع كافة شركات التأمين الكبرى في دول الخليج.",
    aEn: "Yes, we work with all major insurance providers across the Gulf.",
  },
  {
    qAr: "كيف يمكنني إلغاء أو تعديل موعدي؟",
    qEn: "How do I cancel or reschedule?",
    aAr: "من لوحة التحكم، يمكنك إلغاء أو تعديل أي موعد قبل 24 ساعة من موعده.",
    aEn: "From your dashboard, you can cancel or reschedule any appointment up to 24 hours in advance.",
  },
];

export const timeSlots = [
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30",
];

export const upcomingAppointments = [
  {
    id: "a1",
    doctorId: "d1",
    date: "الأحد 28 أبريل",
    dateEn: "Sun 28 Apr",
    time: "3:00 PM",
    type: "clinic" as const,
    status: "confirmed" as const,
  },
  {
    id: "a2",
    doctorId: "d3",
    date: "الثلاثاء 30 أبريل",
    dateEn: "Tue 30 Apr",
    time: "5:00 PM",
    type: "online" as const,
    status: "confirmed" as const,
  },
];

export const pastAppointments = [
  {
    id: "a3",
    doctorId: "d6",
    date: "الجمعة 12 أبريل",
    dateEn: "Fri 12 Apr",
    time: "10:30 AM",
    type: "clinic" as const,
    status: "completed" as const,
  },
  {
    id: "a4",
    doctorId: "d2",
    date: "الاثنين 1 أبريل",
    dateEn: "Mon 1 Apr",
    time: "11:00 AM",
    type: "online" as const,
    status: "completed" as const,
  },
];
