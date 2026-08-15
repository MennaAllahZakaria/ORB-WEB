import OrbLogo from "@/components/OrbLogo";
import { Button } from "@/components/ui/button";
import { LogOut, ShieldAlert } from "lucide-react";

export default function AccessDenied({ onLogout }: { onLogout: () => void }) {
  return (
    <main dir="rtl" className="grid min-h-screen place-items-center bg-[#F6F9FC] p-5">
      <section className="w-full max-w-xl rounded-3xl border border-[#E1EAF3] bg-white p-8 text-center shadow-[0_24px_70px_rgba(20,59,99,0.10)] sm:p-11">
        <OrbLogo className="justify-center" />
        <div className="mx-auto mt-9 grid h-16 w-16 place-items-center rounded-2xl bg-[#FFF1F2] text-[#B12D3B]"><ShieldAlert size={29} /></div>
        <h1 className="font-display mt-6 text-2xl font-bold text-[#102A4B]">هذه المساحة مخصّصة للإدارة</h1>
        <p className="mx-auto mt-3 max-w-md text-xs leading-7 text-[#718195]">تم تسجيل الدخول بنجاح، لكن الحساب الحالي لا يملك صلاحية الوصول إلى مركز عمليات ORB. تواصلي مع مشرفة المنصة لطلب دور إداري.</p>
        <Button onClick={onLogout} variant="outline" className="mt-7 border-[#D7E3F1] text-[#1769D5] hover:bg-[#F3F7FC]"><LogOut size={16} />تسجيل الخروج</Button>
      </section>
    </main>
  );
}
