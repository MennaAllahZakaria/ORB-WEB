/**
 * Style reminder — ORB «دفتر المنارة»:
 * RTL, no centered marketing hero, and calm card-led decision surfaces.
 * Blue is for action, gold for attention, teal for stability. Content uses realistic API-shaped preview data.
 */
import OrbLogo from "@/components/OrbLogo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  ArrowUpLeft,
  BadgeCheck,
  Bell,
  BookOpenText,
  Check,
  ChevronLeft,
  CircleDollarSign,
  CircleHelp,
  CircleUserRound,
  Clock3,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  MoreHorizontal,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  UserCheck,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type NavigationKey =
  | "dashboard"
  | "teachers"
  | "students"
  | "issues"
  | "payouts"
  | "admins"
  | "settings";

type Teacher = {
  id: number;
  name: string;
  subject: string;
  city: string;
  initials: string;
  tone: string;
  submitted: string;
  documents: number;
  status: "pending" | "approved" | "rejected";
};

const navigation = [
  { id: "dashboard" as const, label: "نظرة عامة", icon: LayoutDashboard },
  { id: "teachers" as const, label: "المدرسون", icon: GraduationCap, count: "12" },
  { id: "students" as const, label: "الطلاب", icon: Users },
  { id: "issues" as const, label: "الدروس محل المراجعة", icon: TriangleAlert, count: "4" },
  { id: "payouts" as const, label: "التحويلات المالية", icon: WalletCards, count: "7" },
  { id: "admins" as const, label: "فريق الإدارة", icon: ShieldCheck },
];

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: "ندى حسان",
    subject: "لغة عربية · ثانوي",
    city: "القاهرة",
    initials: "نح",
    tone: "bg-[#E9D8C6] text-[#70442E]",
    submitted: "منذ 18 دقيقة",
    documents: 4,
    status: "pending",
  },
  {
    id: 2,
    name: "أحمد صبري",
    subject: "رياضيات · إعدادي",
    city: "الإسكندرية",
    initials: "أص",
    tone: "bg-[#D8E5F6] text-[#1E5D9A]",
    submitted: "منذ ساعة",
    documents: 3,
    status: "pending",
  },
  {
    id: 3,
    name: "سارة عمرو",
    subject: "كيمياء · ثانوي",
    city: "المنصورة",
    initials: "سع",
    tone: "bg-[#DDF0E8] text-[#1C7152]",
    submitted: "أمس، 4:35 م",
    documents: 5,
    status: "pending",
  },
  {
    id: 4,
    name: "حسام علي",
    subject: "فيزياء · ثانوي",
    city: "الجيزة",
    initials: "حع",
    tone: "bg-[#EEE1F8] text-[#714097]",
    submitted: "أمس، 2:10 م",
    documents: 4,
    status: "pending",
  },
];

const iconButtonClass =
  "grid h-10 w-10 place-items-center rounded-xl border border-[#E1E8F1] bg-white text-[#55657A] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B9CDEA] hover:text-[#1769D5] active:scale-[0.97]";

function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-[#1769D5]">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#102A4B] sm:text-[28px]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-xl text-xs leading-6 text-[#68778B] sm:text-[13px]">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function MiniAvatar({ teacher, size = "md" }: { teacher: Teacher; size?: "sm" | "md" }) {
  const sizes = size === "sm" ? "h-9 w-9 text-[10px]" : "h-11 w-11 text-xs";
  return (
    <div
      aria-label={`صورة رمزية لـ ${teacher.name}`}
      className={`grid ${sizes} shrink-0 place-items-center rounded-2xl font-bold ${teacher.tone}`}
    >
      {teacher.initials}
    </div>
  );
}

function KpiCard({
  label,
  value,
  support,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  support: string;
  icon: typeof Users;
  accent: "blue" | "gold" | "teal";
}) {
  const accents = {
    blue: "bg-[#E6F0FF] text-[#1769D5]",
    gold: "bg-[#FFF4D7] text-[#B87A00]",
    teal: "bg-[#E2F5EE] text-[#16785B]",
  };
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#E5EBF2] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(25,61,101,0.08)]">
      <span className="absolute inset-x-5 top-0 h-0.5 bg-[#1769D5]/0 transition-all duration-200 group-hover:bg-[#1769D5]" />
      <div className="flex items-start justify-between gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${accents[accent]}`}>
          <Icon size={20} strokeWidth={1.9} />
        </div>
        <span className="text-[10px] font-semibold text-[#6E7B8E]">آخر 7 أيام</span>
      </div>
      <p className="mt-5 text-xs font-medium text-[#647386]">{label}</p>
      <p dir="ltr" className="mt-1.5 text-right font-display text-[30px] font-bold tracking-[-0.06em] text-[#102A4B]">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-[#8290A1]">{support}</p>
    </article>
  );
}

function StatusPill({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "gold" | "red" | "teal" }) {
  const tones = {
    blue: "bg-[#E8F1FF] text-[#1769D5]",
    gold: "bg-[#FFF4D6] text-[#A76D00]",
    red: "bg-[#FDEBEC] text-[#B12D3B]",
    teal: "bg-[#E1F5EE] text-[#127054]",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${tones[tone]}`}>{children}</span>;
}

function EmptySection({ section }: { section: string }) {
  return (
    <section className="orb-enter grid min-h-[460px] place-items-center rounded-3xl border border-dashed border-[#C9D7E7] bg-white p-8 text-center soft-shadow">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#EAF2FF] text-[#1769D5]">
          <Sparkles size={28} />
        </div>
        <h2 className="font-display mt-5 text-2xl font-bold text-[#102A4B]">{section}</h2>
        <p className="mx-auto mt-3 max-w-md text-xs leading-7 text-[#6B798A]">
          هذا القسم جاهز بصرياً ضمن هيكل لوحة ORB. سيتم ربطه بمسارات الـ API الفعلية في المرحلة التالية من التكامل.
        </p>
        <Button onClick={() => toast.info("هذه معاينة للواجهة الأمامية؛ لا يوجد ربط بيانات حالياً.")} className="mt-6 bg-[#1769D5] text-white hover:bg-[#0F56B4]">
          عرض تفاصيل التكامل
        </Button>
      </div>
    </section>
  );
}

export default function Home() {
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState<NavigationKey>("dashboard");
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const pendingTeachers = useMemo(
    () =>
      teachers.filter(
        (teacher) =>
          teacher.status === "pending" &&
          `${teacher.name} ${teacher.subject} ${teacher.city}`.includes(query.trim())
      ),
    [query, teachers],
  );

  const reviewTeacher = (id: number, status: "approved" | "rejected") => {
    const teacher = teachers.find((item) => item.id === id);
    setTeachers((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
    toast.success(status === "approved" ? `تم اعتماد ${teacher?.name}` : `تم رفض طلب ${teacher?.name}`);
  };

  const changeView = (view: NavigationKey) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  const activeTitle = navigation.find((item) => item.id === activeView)?.label ?? "نظرة عامة";
  const adminName = user?.name?.trim() || "منى زكريا";
  const adminInitial = adminName.charAt(0);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F9FC] text-[#1E3858]">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-[268px] flex-col border-l border-[#E2EAF3] bg-white px-4 py-6 lg:flex">
        <OrbLogo className="px-2" />
        <div className="mt-10 px-2">
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#92A0B1]">مركز التشغيل</p>
        </div>
        <nav aria-label="التنقل الرئيسي" className="mt-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => changeView(item.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#EAF2FF] text-[#1769D5] shadow-[inset_-3px_0_0_#1769D5]"
                    : "text-[#56677B] hover:bg-[#F5F8FC] hover:text-[#1769D5]"
                }`}
              >
                <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
                <span className="flex-1">{item.label}</span>
                {item.count && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${isActive ? "bg-white text-[#1769D5]" : "bg-[#F0F4F8] text-[#7A8999]"}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto space-y-1 border-t border-[#EAF0F5] pt-5">
          <button type="button" onClick={() => changeView("settings")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-[#627286] transition hover:bg-[#F5F8FC] hover:text-[#1769D5]">
            <Settings2 size={19} strokeWidth={1.8} />
            <span>الإعدادات</span>
          </button>
          <button type="button" onClick={() => toast.info("مركز المساعدة سيكون متاحاً بعد ربط الخدمات.")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-[#627286] transition hover:bg-[#F5F8FC] hover:text-[#1769D5]">
            <CircleHelp size={19} strokeWidth={1.8} />
            <span>المساعدة والدعم</span>
          </button>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#102A4B] px-3 py-3.5 text-white">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#F4B942] font-display text-xs font-bold text-[#102A4B]">{adminInitial}</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold">{adminName}</p>
            <p className="mt-0.5 text-[9px] text-white/60">مشرفة المنصة</p>
          </div>
          <button type="button" aria-label="تسجيل الخروج" onClick={() => void logout()} className="grid h-8 w-8 place-items-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"><LogOut size={16} /></button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#102A4B]/30 backdrop-blur-[2px] lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <aside onClick={(event) => event.stopPropagation()} className="absolute inset-y-0 right-0 flex w-[286px] flex-col bg-white px-4 py-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <OrbLogo />
              <button type="button" aria-label="إغلاق القائمة" onClick={() => setMobileMenuOpen(false)} className={iconButtonClass}><X size={19} /></button>
            </div>
            <nav aria-label="التنقل على الجوال" className="mt-9 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return <button key={item.id} type="button" onClick={() => changeView(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-xs font-semibold ${isActive ? "bg-[#EAF2FF] text-[#1769D5]" : "text-[#56677B]"}`}><Icon size={19} /><span>{item.label}</span></button>;
              })}
            </nav>
          </aside>
        </div>
      )}

      <main className="min-h-screen lg:mr-[268px]">
        <header className="sticky top-0 z-30 border-b border-[#E7EDF4] bg-[#F6F9FC]/90 px-4 py-4 backdrop-blur-xl sm:px-7 lg:px-10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 lg:hidden">
              <button type="button" aria-label="فتح القائمة" onClick={() => setMobileMenuOpen(true)} className={iconButtonClass}><Menu size={20} /></button>
              <OrbLogo showLabel={false} imageClassName="h-9 w-9" />
            </div>
            <div className="hidden lg:block">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-[#91A0B2]">السبت، 15 أغسطس 2026</p>
              <p className="mt-1 font-display text-sm font-bold text-[#425672]">{activeTitle}</p>
            </div>
            <div className="mr-auto flex items-center gap-2 sm:gap-3">
              <button type="button" aria-label="البحث" onClick={() => toast.info("ابحثي باسم المستخدم أو الدرس بعد ربط البيانات.")} className={`${iconButtonClass} hidden sm:grid`}><Search size={19} /></button>
              <button type="button" aria-label="الإشعارات" onClick={() => toast.info("لديك 4 إشارات تشغيلية جديدة اليوم.")} className={`${iconButtonClass} relative`}><Bell size={19} /><span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[#F0AA1A] ring-2 ring-white" /></button>
              <div className="hidden items-center gap-2 border-r border-[#DFE7F0] pr-3 sm:flex">
                <div className="text-left leading-tight">
                  <p className="text-[11px] font-bold text-[#243B59]">{adminName}</p>
                  <p className="mt-1 text-[9px] text-[#7C8B9C]">إدارة ORB</p>
                </div>
                <button type="button" onClick={() => void logout()} aria-label="تسجيل الخروج" className="grid h-9 w-9 place-items-center rounded-xl bg-[#F4B942] text-[11px] font-bold text-[#102A4B] transition hover:bg-[#FFD16C]">{adminInitial}</button>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1560px] px-4 pb-28 pt-7 sm:px-7 sm:pt-9 lg:px-10 lg:pb-10">
          {activeView === "dashboard" ? (
            <section className="space-y-7">
              <div className="orb-enter relative overflow-hidden rounded-[26px] bg-[#102A4B] p-6 text-white sm:p-8 lg:p-10">
                <div className="absolute inset-y-0 left-0 hidden w-[48%] lg:block">
                  <img src="/manus-storage/orb-operations-hero_08667843.jpg" alt="نظام ORB التعليمي" className="h-full w-full object-cover opacity-90 mix-blend-screen" />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#102A4B] via-[#102A4B]/45 to-transparent" />
                </div>
                <div className="relative max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-[#CFE3FF]">
                    <Sparkles size={14} className="text-[#F4B942]" />
                    ملخص تشغيل اليوم
                  </div>
                  <h1 className="font-display mt-5 text-balance text-[30px] font-bold leading-[1.35] tracking-[-0.025em] sm:text-[38px]">
                    صباح الخير، منى.<br />ثلاث إشارات تحتاج قرارك اليوم.
                  </h1>
                  <p className="mt-4 max-w-xl text-xs leading-7 text-[#B7CAE2] sm:text-[13px]">
                    طلبات تحقق جديدة، دروس معلّقة للمراجعة، وتحويلات جاهزة للإتمام. رتّبي يومك من النقاط التي تؤثر في تجربة الطلاب والمعلمين مباشرة.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button onClick={() => changeView("teachers")} className="bg-[#F4B942] px-5 text-xs font-bold text-[#102A4B] shadow-none hover:bg-[#FFD16C]">
                      راجعي طلبات الانضمام <ChevronLeft size={16} />
                    </Button>
                    <button type="button" onClick={() => changeView("issues")} className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 active:scale-[0.97]">
                      فتح الدروس المعلّقة
                    </button>
                  </div>
                </div>
                <div className="relative mt-8 grid grid-cols-3 divide-x divide-x-reverse divide-white/15 border-t border-white/12 pt-5 lg:mt-10 lg:max-w-xl">
                  {[
                    ["12", "طلبات تحقق"],
                    ["4", "حالات تحتاج مراجعة"],
                    ["7", "تحويلات معلّقة"],
                  ].map(([value, label]) => (
                    <div key={label} className="px-3 first:pr-0">
                      <p dir="ltr" className="font-display text-right text-2xl font-bold tracking-[-0.05em] text-white">{value}</p>
                      <p className="mt-1 text-[9px] text-[#B7CAE2] sm:text-[10px]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <section className="orb-enter orb-enter-delay-1 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <KpiCard label="إجمالي المدرسين" value="248" support="8 تم اعتمادهم هذا الأسبوع" icon={GraduationCap} accent="blue" />
                <KpiCard label="الطلاب النشطون" value="4,830" support="+4.2% مقارنة بالأسبوع الماضي" icon={Users} accent="teal" />
                <KpiCard label="دروس هذا الأسبوع" value="1,926" support="87% مكتملة في الوقت" icon={BookOpenText} accent="gold" />
                <KpiCard label="طلبات الدعم المفتوحة" value="18" support="4 منها بانتظار قرار إداري" icon={LifeBuoy} accent="blue" />
              </section>

              <section className="orb-enter orb-enter-delay-2 grid gap-6 xl:grid-cols-[minmax(0,1.56fr)_minmax(320px,0.85fr)]">
                <article className="overflow-hidden rounded-3xl border border-[#E5EBF2] bg-white soft-shadow">
                  <div className="flex flex-col gap-4 border-b border-[#E9EFF5] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#E8F1FF] text-[#1769D5]"><UserCheck size={17} /></span>
                        <h2 className="font-display text-lg font-bold text-[#102A4B]">طلبات تحقق المدرسين</h2>
                      </div>
                      <p className="mt-2 text-[11px] text-[#758498]">مراجعة الوثائق قبل تفعيل حساب المدرس على المنصة.</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative w-full sm:w-[180px]">
                        <Search size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8A98A9]" />
                        <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="البحث في طلبات المدرسين" placeholder="ابحثي في الطلبات" className="h-10 w-full rounded-xl border border-[#E1E8F1] bg-[#FAFCFE] pr-9 pl-3 text-[11px] text-[#40526A] outline-none transition focus:border-[#1769D5] focus:ring-2 focus:ring-[#1769D5]/10" />
                      </div>
                      <Button variant="outline" onClick={() => changeView("teachers")} className="h-10 border-[#D9E5F5] bg-white px-3 text-[11px] text-[#1769D5] hover:bg-[#F1F6FF]">عرض الكل</Button>
                    </div>
                  </div>
                  <div className="hidden px-6 md:block">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[#EAF0F5] hover:bg-transparent">
                          <TableHead className="h-11 text-right text-[10px] text-[#8492A2]">المدرس</TableHead>
                          <TableHead className="text-right text-[10px] text-[#8492A2]">المجال</TableHead>
                          <TableHead className="text-right text-[10px] text-[#8492A2]">الوثائق</TableHead>
                          <TableHead className="text-right text-[10px] text-[#8492A2]">وصل في</TableHead>
                          <TableHead className="w-[165px] text-center text-[10px] text-[#8492A2]">الإجراء</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingTeachers.slice(0, 4).map((teacher) => (
                          <TableRow key={teacher.id} className="border-[#EDF2F7]">
                            <TableCell className="py-3.5 text-right">
                              <div className="flex items-center gap-3">
                                <MiniAvatar teacher={teacher} size="sm" />
                                <div><p className="text-[11px] font-bold text-[#233B59]">{teacher.name}</p><p className="mt-1 text-[9px] text-[#8290A1]">{teacher.city}</p></div>
                              </div>
                            </TableCell>
                            <TableCell className="py-3.5 text-right text-[10px] font-medium text-[#55677D]">{teacher.subject}</TableCell>
                            <TableCell className="py-3.5 text-right"><StatusPill tone="blue"><FileCheck2 size={12} />{teacher.documents} ملفات</StatusPill></TableCell>
                            <TableCell className="py-3.5 text-right text-[10px] text-[#718195]">{teacher.submitted}</TableCell>
                            <TableCell className="py-3.5 text-center">
                              <div className="flex justify-center gap-1.5">
                                <button type="button" onClick={() => reviewTeacher(teacher.id, "approved")} className="inline-flex items-center gap-1.5 rounded-lg bg-[#E3F6EE] px-2.5 py-2 text-[10px] font-bold text-[#147255] transition hover:bg-[#CFF0E3] active:scale-[0.97]"><Check size={13} />اعتماد</button>
                                <button type="button" onClick={() => reviewTeacher(teacher.id, "rejected")} className="inline-flex items-center gap-1.5 rounded-lg bg-[#FBEDEF] px-2.5 py-2 text-[10px] font-bold text-[#AF3240] transition hover:bg-[#F9DDE1] active:scale-[0.97]"><X size={13} />رفض</button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="space-y-3 p-4 md:hidden">
                    {pendingTeachers.slice(0, 3).map((teacher) => (
                      <div key={teacher.id} className="rounded-2xl border border-[#E7EDF4] p-3.5">
                        <div className="flex items-start justify-between gap-2"><MiniAvatar teacher={teacher} /><StatusPill tone="blue">{teacher.documents} ملفات</StatusPill></div>
                        <p className="mt-3 text-xs font-bold text-[#233B59]">{teacher.name}</p><p className="mt-1 text-[10px] text-[#728196]">{teacher.subject} · {teacher.city}</p>
                        <div className="mt-3 flex gap-2"><button type="button" onClick={() => reviewTeacher(teacher.id, "approved")} className="flex-1 rounded-lg bg-[#E3F6EE] py-2 text-[10px] font-bold text-[#147255]">اعتماد</button><button type="button" onClick={() => reviewTeacher(teacher.id, "rejected")} className="flex-1 rounded-lg bg-[#FBEDEF] py-2 text-[10px] font-bold text-[#AF3240]">رفض</button></div>
                      </div>
                    ))}
                  </div>
                  {pendingTeachers.length === 0 && <div className="p-8 text-center text-xs text-[#718195]">لا توجد طلبات مطابقة للبحث.</div>}
                </article>

                <aside className="space-y-6">
                  <article className="relative overflow-hidden rounded-3xl border border-[#E5EBF2] bg-white p-5 soft-shadow">
                    <img src="/manus-storage/orb-approval-illustration_0fbc4396.jpg" alt="مراجعة طلب انضمام مدرس" className="absolute inset-y-0 left-0 w-[47%] object-cover opacity-20" />
                    <div className="relative">
                      <div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFF4D7] text-[#B87900]"><Clock3 size={18} /></span><StatusPill tone="gold">أولوية اليوم</StatusPill></div>
                      <h3 className="font-display mt-5 max-w-[230px] text-xl font-bold leading-8 text-[#102A4B]">12 طلب تحقق تنتظر المراجعة</h3>
                      <p className="mt-2 max-w-[240px] text-[11px] leading-6 text-[#6D7C8F]">تجنّبي تأخر التفعيل: أقدم طلب وصل منذ يومين.</p>
                      <button type="button" onClick={() => changeView("teachers")} className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold text-[#1769D5] transition hover:gap-3">افتحي قائمة المدرسين <ArrowUpLeft size={15} /></button>
                    </div>
                  </article>

                  <article className="overflow-hidden rounded-3xl border border-[#E5EBF2] bg-white soft-shadow">
                    <div className="flex items-center justify-between px-5 pb-3 pt-5"><h3 className="font-display text-base font-bold text-[#102A4B]">حالات تحتاج متابعة</h3><button type="button" onClick={() => changeView("issues")} className="text-[10px] font-bold text-[#1769D5]">عرض الكل</button></div>
                    <div className="divide-y divide-[#EDF2F7]">
                      {[
                        ["نزاع درس: جبر 2", "بانتظار قرار إداري", "red", TriangleAlert],
                        ["دفعة رقم #48219", "فشل تأكيد التحويل", "gold", CircleDollarSign],
                        ["درس كيمياء عضوية", "غير مكتمل تلقائياً", "blue", BookOpenText],
                      ].map(([title, detail, tone, Icon], index) => {
                        const IssueIcon = Icon as typeof TriangleAlert;
                        return <button key={String(title)} type="button" onClick={() => changeView(index === 1 ? "payouts" : "issues")} className="flex w-full items-center gap-3 px-5 py-4 text-right transition hover:bg-[#FAFCFE]"><div className={`grid h-9 w-9 place-items-center rounded-xl ${tone === "red" ? "bg-[#FDEBEC] text-[#B12D3B]" : tone === "gold" ? "bg-[#FFF4D6] text-[#A76D00]" : "bg-[#E8F1FF] text-[#1769D5]"}`}><IssueIcon size={16} /></div><div className="flex-1"><p className="text-[11px] font-bold text-[#304763]">{title as string}</p><p className="mt-1 text-[9px] text-[#8391A1]">{detail as string}</p></div><ChevronLeft size={15} className="text-[#9AA7B5]" /></button>;
                      })}
                    </div>
                  </article>
                </aside>
              </section>

              <section className="orb-enter orb-enter-delay-3 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
                <article className="rounded-3xl border border-[#E5EBF2] bg-white p-5 soft-shadow sm:p-6">
                  <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold tracking-[0.13em] text-[#1769D5]">نبض المنصة</p><h3 className="font-display mt-2 text-lg font-bold text-[#102A4B]">نمو النشاط خلال الأسبوع</h3></div><button type="button" onClick={() => toast.info("التقارير التفصيلية ستُقرأ من بيانات الدروس لاحقاً.")} className="rounded-lg border border-[#E2EAF3] px-3 py-2 text-[10px] font-bold text-[#5D6D80] hover:bg-[#F6F9FC]">آخر 7 أيام</button></div>
                  <div className="mt-8 flex h-40 items-end justify-between gap-2 border-b border-dashed border-[#DCE6F0] pb-2 sm:gap-3">
                    {[40, 52, 44, 68, 59, 83, 72].map((height, index) => <div key={height} className="group relative flex flex-1 flex-col items-center justify-end"><div className={`w-full max-w-[48px] rounded-t-lg transition-all duration-200 group-hover:-translate-y-1 ${index === 5 ? "bg-[#1769D5]" : "bg-[#D8E6F6]"}`} style={{ height: `${height}%` }}><span className="sr-only">{height}%</span></div><span className="mt-3 text-[9px] text-[#8391A1]">{["س", "ح", "ن", "ث", "ر", "خ", "ج"][index]}</span></div>)}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-[#718095]"><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#1769D5]" />طلبات الدروس</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#D8E6F6]" />مقارنة بالأيام السابقة</span></div>
                </article>
                <article className="relative min-h-[245px] overflow-hidden rounded-3xl bg-[#EAF2FF] p-6">
                  <img src="/manus-storage/orb-resources-illustration_552a2a10.jpg" alt="موارد تعليمية" className="absolute inset-y-0 left-0 w-[48%] object-cover mix-blend-multiply opacity-85" />
                  <div className="relative max-w-[58%]"><StatusPill tone="blue">خريطة المواد</StatusPill><h3 className="font-display mt-4 text-xl font-bold leading-8 text-[#102A4B]">أفضل المواد طلباً هذا الأسبوع</h3><p className="mt-2 text-[10px] leading-6 text-[#5D718C]">رياضيات، عربي، وكيمياء تقود النشاط على المنصة.</p><button type="button" onClick={() => toast.info("تصفية المواد ستتوفر بعد ربط بيانات الدروس.")} className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold text-[#1769D5]">استكشفي الحركة <ChevronLeft size={14} /></button></div>
                </article>
              </section>
              <p className="text-center text-[10px] leading-6 text-[#93A0B0]">هذه معاينة لواجهة React مبنية على صلاحيات ORB الحالية. الأرقام والأسماء مؤقتة لعرض الهيكل فقط، ولم تُربط بقاعدة البيانات بعد.</p>
            </section>
          ) : activeView === "teachers" ? (
            <section className="space-y-6"><SectionTitle eyebrow="إدارة المدرسين" title="طلبات تحقق المدرسين" description="هذه الشاشة تمثل المسارات: عرض المدرسين، عرض الطلبات المعلّقة، اعتماد أو رفض التحقق." action={<Button onClick={() => toast.info("إضافة مدرس تتطلب مسار API مخصصاً في المرحلة التالية.")} className="bg-[#1769D5] text-xs text-white hover:bg-[#0F56B4]">إضافة مدرس</Button>} /><div className="rounded-3xl border border-[#E5EBF2] bg-white p-4 soft-shadow"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{teachers.map((teacher) => <div key={teacher.id} className="rounded-2xl border border-[#E8EEF5] p-4"><MiniAvatar teacher={teacher} /><p className="mt-3 text-xs font-bold text-[#263E5C]">{teacher.name}</p><p className="mt-1 text-[10px] text-[#748397]">{teacher.subject}</p><div className="mt-4">{teacher.status === "pending" ? <div className="flex gap-2"><button type="button" onClick={() => reviewTeacher(teacher.id, "approved")} className="rounded-lg bg-[#E3F6EE] px-2.5 py-2 text-[10px] font-bold text-[#147255]">اعتماد</button><button type="button" onClick={() => reviewTeacher(teacher.id, "rejected")} className="rounded-lg bg-[#FBEDEF] px-2.5 py-2 text-[10px] font-bold text-[#AF3240]">رفض</button></div> : <StatusPill tone={teacher.status === "approved" ? "teal" : "red"}>{teacher.status === "approved" ? "معتمد" : "مرفوض"}</StatusPill>}</div></div>)}</div></div></section>
          ) : (
            <EmptySection section={activeTitle} />
          )}
        </div>
      </main>

      <nav aria-label="التنقل السفلي" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-[#E3EAF3] bg-white/95 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
        {[navigation[0], navigation[1], navigation[2], navigation[3], navigation[4]].map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return <button key={item.id} type="button" onClick={() => changeView(item.id)} className={`relative grid place-items-center gap-1 rounded-xl py-1.5 text-[9px] font-bold ${isActive ? "text-[#1769D5]" : "text-[#7B899A]"}`}><Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />{item.label === "الدروس محل المراجعة" ? "المراجعة" : item.label}</button>;
        })}
      </nav>
    </div>
  );
}
