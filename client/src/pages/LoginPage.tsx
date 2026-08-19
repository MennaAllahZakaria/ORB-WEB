/** Style reminder — ORB «دفتر المنارة»: an editorial, calm RTL login page rather than a generic centered auth card. */
import OrbLogo from "@/components/OrbLogo";
import { Button } from "@/components/ui/button";
import { useOrbAuth } from "@/contexts/OrbAuthContext";
import { orbImageUrl } from "@/lib/orbAssets";
import { ArrowUpLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

function GoogleGlyph() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.2-.2-1.71H12v3.24h5.37c-.11.81-.72 2.03-2.08 2.85l-.02.11 3.02 2.29.21.02c1.93-1.74 2.85-4.3 2.85-6.8Z" /><path fill="#34A853" d="M12 21.5c2.63 0 4.84-.85 6.45-2.32l-3.07-2.42c-.82.56-1.92.95-3.38.95-2.58 0-4.77-1.67-5.56-3.99l-.1.01-3.14 2.38-.03.09C4.77 19.28 8.13 21.5 12 21.5Z" /><path fill="#FBBC05" d="M6.44 13.72A5.75 5.75 0 0 1 6.13 12c0-.6.11-1.17.3-1.72l-.01-.12-3.17-2.42-.1.05A9.35 9.35 0 0 0 2.5 12c0 1.51.37 2.94 1.03 4.21l3.09-2.49c-.11-.33-.18-.68-.18-1.05Z" /><path fill="#EA4335" d="M12 6.29c1.85 0 3.1.78 3.81 1.43l2.78-2.64C16.84 3.5 14.63 2.5 12 2.5c-3.87 0-7.23 2.22-8.85 5.29l3.28 2.49C7.23 7.96 9.42 6.29 12 6.29Z" /></svg>;
}

type GoogleCredentialResponse = { credential?: string };

function googleIdentity(): any {
  return (globalThis as unknown as Record<string, any>)["google"]?.accounts?.id;
}

function loadGoogleIdentityScript() {
  return new Promise<void>((resolve, reject) => {
    if (googleIdentity()) return resolve();
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("تعذر تحميل Google Identity.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("تعذر تحميل Google Identity."));
    document.head.appendChild(script);
  });
}

export default function LoginPage() {
  const { user, ready, login, loginWithGoogleCredential } = useOrbAuth();
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [passwordPending, setPasswordPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  useEffect(() => { if (ready && user) navigate("/"); }, [ready, navigate, user]);

  const beginPasswordLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) { setSubmitted(true); return; }
    setPasswordPending(true);
    try {
      const signedInUser = await login(email, password);
      if (signedInUser.role !== "admin") { toast.error("هذا الحساب لا يملك صلاحية الإدارة."); return; }
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر تسجيل الدخول.");
    } finally { setPasswordPending(false); }
  };

  const beginGoogleLogin = async () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) { toast.error("لم يتم ضبط Google Client ID للمشروع."); return; }
    setGooglePending(true);
    try {
      await loadGoogleIdentityScript();
      await new Promise<void>((resolve, reject) => {
        const identity = googleIdentity();
        if (!identity) { reject(new Error("Google Identity غير متاح.")); return; }
        identity.initialize({ client_id: clientId, callback: async ({ credential }: GoogleCredentialResponse) => {
          if (!credential) { reject(new Error("لم يصل رمز Google.")); return; }
          try {
            const signedInUser = await loginWithGoogleCredential(credential);
            if (signedInUser.role !== "admin") throw new Error("هذا الحساب لا يملك صلاحية الإدارة.");
            navigate("/");
            resolve();
          } catch (error) { reject(error); }
        }});
        identity.prompt();
      });
    } catch (error) { toast.error(error instanceof Error ? error.message : "تعذر تسجيل الدخول بحساب Google."); }
    finally { setGooglePending(false); }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#F6F9FC] p-3 sm:p-6">
      <div className="grid min-h-[calc(100vh-1.5rem)] overflow-hidden rounded-[26px] border border-[#E1EAF3] bg-white shadow-[0_24px_70px_rgba(20,59,99,0.10)] lg:grid-cols-[0.93fr_1.07fr] lg:rounded-[32px]">
        <section className="relative hidden overflow-hidden bg-[#102A4B] p-10 text-white lg:flex lg:flex-col"><img src={orbImageUrl("orb-operations-hero.jpg", "/manus-storage/orb-operations-hero_08667843.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(53,126,232,0.45),transparent_32%),linear-gradient(135deg,#102A4B_22%,rgba(16,42,75,0.7))]" /><div className="relative"><OrbLogo labelClassName="[&>p:first-child]:text-white [&>p:last-child]:text-white/55" /></div><div className="relative my-auto max-w-md"><span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-[#CCE0FF]"><Sparkles size={14} className="text-[#F4B942]" />بوابة إدارة ORB</span><h1 className="font-display mt-6 text-4xl font-bold leading-[1.36] tracking-[-0.035em]">كل قرار تعليمي<br />يبدأ من مساحة واضحة.</h1><p className="mt-5 max-w-sm text-xs leading-7 text-[#C4D4E7]">دخول مخصص لفريق إدارة ORB لمتابعة المعلمين والطلاب والدروس والتحويلات من مركز تشغيل واحد.</p></div><div className="relative grid grid-cols-3 gap-3 border-t border-white/15 pt-6">{["بيانات حقيقية", "أدوار واضحة", "وصول مُتابَع"].map((item, index) => <div key={item} className="text-[10px] text-[#C4D4E7]"><span className="mb-2 grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-[#F4B942]">{index + 1}</span>{item}</div>)}</div></section>
        <section className="relative flex min-h-[calc(100vh-1.5rem)] items-center px-5 py-10 sm:px-10 lg:min-h-0 lg:px-[min(9vw,124px)]"><div className="absolute left-5 top-5 lg:hidden"><OrbLogo /></div><div className="w-full max-w-[420px] lg:mr-auto"><p className="text-[10px] font-bold tracking-[0.16em] text-[#1769D5]">مرحباً بعودتك</p><h2 className="font-display mt-3 text-[30px] font-bold tracking-[-0.03em] text-[#102A4B]">تسجيل الدخول</h2><p className="mt-3 text-[11px] leading-6 text-[#708095]">استخدمي بيانات الإدارة المعتمدة للوصول إلى مركز تشغيل ORB.</p><form onSubmit={beginPasswordLogin} className="mt-8 space-y-4" noValidate><label className="block"><span className="mb-2 block text-[11px] font-bold text-[#435873]">البريد الإلكتروني</span><span className={`relative flex items-center rounded-xl border bg-white transition ${submitted && !email ? "border-[#D54C59]" : "border-[#DDE7F1] focus-within:border-[#1769D5] focus-within:ring-2 focus-within:ring-[#1769D5]/10"}`}><Mail size={17} className="mr-3 text-[#7F8EA1]" /><input dir="ltr" value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="admin@orb.edu" className="h-12 w-full rounded-xl bg-transparent pl-4 pr-2 text-left text-xs text-[#243B59] outline-none placeholder:text-[#A2AFBD]" /></span>{submitted && !email && <span className="mt-1.5 block text-[9px] text-[#B12D3B]">أدخلي البريد الإلكتروني أولاً.</span>}</label><label className="block"><span className="mb-2 block text-[11px] font-bold text-[#435873]">كلمة المرور</span><span className={`relative flex items-center rounded-xl border bg-white transition ${submitted && !password ? "border-[#D54C59]" : "border-[#DDE7F1] focus-within:border-[#1769D5] focus-within:ring-2 focus-within:ring-[#1769D5]/10"}`}><LockKeyhole size={17} className="mr-3 text-[#7F8EA1]" /><input dir="ltr" value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" className="h-12 w-full rounded-xl bg-transparent px-2 text-left text-xs text-[#243B59] outline-none" /><button type="button" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"} onClick={() => setShowPassword((current) => !current)} className="ml-2 grid h-8 w-8 place-items-center rounded-lg text-[#7F8EA1] hover:bg-[#F1F5FA]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span>{submitted && !password && <span className="mt-1.5 block text-[9px] text-[#B12D3B]">أدخلي كلمة المرور أولاً.</span>}</label><div className="flex items-center justify-between text-[10px]"><label className="flex items-center gap-2 text-[#66778B]"><input type="checkbox" className="h-3.5 w-3.5 rounded border-[#C9D7E6] accent-[#1769D5]" />تذكّر هذا الجهاز</label><button type="button" onClick={() => toast.info("يرجى استخدام استعادة كلمة المرور من تطبيق ORB أو التواصل مع إدارة المنصة.")} className="font-bold text-[#1769D5] hover:underline">نسيت كلمة المرور؟</button></div><Button type="submit" disabled={passwordPending} className="h-12 w-full bg-[#1769D5] text-xs font-bold text-white shadow-[0_10px_18px_rgba(23,105,213,0.16)] hover:bg-[#0F56B4] disabled:opacity-70">{passwordPending ? "جارٍ التحقق…" : "الدخول إلى لوحة التحكم"} <ArrowUpLeft size={16} /></Button></form><div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-[#E5ECF3]" /><span className="text-[9px] font-medium text-[#96A3B1]">أو</span><span className="h-px flex-1 bg-[#E5ECF3]" /></div><button type="button" disabled={googlePending} onClick={() => void beginGoogleLogin()} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#DCE6F0] bg-white text-[11px] font-bold text-[#344A66] transition hover:-translate-y-0.5 hover:border-[#AFC7E6] hover:bg-[#FAFCFF] active:scale-[0.97] disabled:opacity-70"><GoogleGlyph />{googlePending ? "جارٍ فتح Google…" : "المتابعة باستخدام Google"}</button><div className="mt-7 flex items-start gap-2 rounded-xl bg-[#F4F8FD] p-3 text-[9px] leading-5 text-[#65788F]"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#1769D5]" /><p>تسجيل البريد وكلمة المرور يذهب مباشرة إلى ORB API. تسجيل Google يتحقق من Google Identity ثم من ORB API.</p></div></div><p className="absolute bottom-5 right-5 text-[9px] text-[#9AA8B8] lg:right-[min(9vw,124px)]">© 2026 ORB · إدارة تعليمية أوضح</p></section>
      </div>
    </main>
  );
}
