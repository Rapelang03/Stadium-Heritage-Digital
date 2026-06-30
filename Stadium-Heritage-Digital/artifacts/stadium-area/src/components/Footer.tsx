import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif font-bold text-xl tracking-tight text-primary mb-4 block">
              Stadium Area
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Constituency No. 32<br />
              Maseru, Lesotho<br />
              Heartbeat of the Nation
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("discover")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">{t("about")}</Link></li>
              <li><Link href="/history" className="text-muted-foreground hover:text-primary transition-colors">{t("history")}</Link></li>
              <li><Link href="/villages" className="text-muted-foreground hover:text-primary transition-colors">{t("villages")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("institutions")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/education" className="text-muted-foreground hover:text-primary transition-colors">{t("education")}</Link></li>
              <li><Link href="/sports" className="text-muted-foreground hover:text-primary transition-colors">{t("sports")}</Link></li>
              <li><Link href="/culture" className="text-muted-foreground hover:text-primary transition-colors">{t("culture")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("info")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">{t("news")}</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">{t("faq")}</Link></li>
              <li><Link href="/contacts" className="text-muted-foreground hover:text-primary transition-colors">{t("contacts")}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {currentYear} Stadium Area Constituency. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/sources" className="hover:text-primary transition-colors">{t("sources")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
