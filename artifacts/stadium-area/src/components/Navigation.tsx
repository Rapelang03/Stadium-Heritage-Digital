import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "ST" : "EN");
  };

  const navGroups = [
    {
      title: t("discover"),
      items: [
        { href: "/", label: t("home") },
        { href: "/about", label: t("about") },
        { href: "/history", label: t("history") },
        { href: "/map", label: t("map") },
      ],
    },
    {
      title: t("community"),
      items: [
        { href: "/villages", label: t("villages") },
        { href: "/culture", label: t("culture") },
        { href: "/places", label: t("places") },
      ],
    },
    {
      title: t("institutions"),
      items: [
        { href: "/education", label: t("education") },
        { href: "/sports", label: t("sports") },
        { href: "/sefika", label: t("sefika") },
      ],
    },
    {
      title: t("campus"),
      items: [
        { href: "/thamae-church", label: t("thamaeChurch") },
        { href: "/library", label: t("library") },
        { href: "/developments", label: t("developments") },
        { href: "/news", label: t("news") },
      ],
    },
    {
      title: t("info"),
      items: [
        { href: "/gallery", label: t("gallery") },
        { href: "/contacts", label: t("contacts") },
        { href: "/faq", label: t("faq") },
        { href: "/sources", label: t("sources") },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif font-bold text-xl tracking-tight text-primary">
            Stadium Area
          </span>
          <span className="hidden sm:inline-block text-sm text-muted-foreground border-l pl-2 border-border/50">
            Constituency No. 32
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navGroups.map((group) => (
                <NavigationMenuItem key={group.title}>
                  <NavigationMenuTrigger className="bg-transparent text-sm">
                    {group.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[320px] gap-2 p-4 md:w-[400px] md:grid-cols-2">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className={`block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 ${
                                location === item.href
                                  ? "bg-primary/10 text-primary font-semibold"
                                  : "text-foreground"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-1 border-l pl-3 border-border/50">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="relative gap-1.5 font-semibold text-xs px-3"
              title={`Switch to ${language === "EN" ? "Sesotho" : "English"}`}
              data-testid="button-language-toggle"
            >
              <Globe className="h-4 w-4" />
              <span
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-all ${
                  language === "EN"
                    ? "bg-primary text-primary-foreground"
                    : "bg-green-600 text-white"
                }`}
              >
                {language === "EN" ? "EN" : "ST"}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              data-testid="button-theme-toggle"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-bold text-xs px-2"
            data-testid="button-language-toggle-mobile"
          >
            <span
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                language === "EN"
                  ? "bg-primary text-primary-foreground"
                  : "bg-green-600 text-white"
              }`}
            >
              {language === "EN" ? "EN" : "ST"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            data-testid="button-theme-toggle-mobile"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-50 bg-background/98 backdrop-blur-sm h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-5 flex flex-col space-y-6">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <h4 className="font-serif font-semibold text-sm text-primary uppercase tracking-wider">
                  {group.title}
                </h4>
                <div className="flex flex-col space-y-1 border-l-2 border-border pl-4">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm py-2 rounded transition-colors ${
                        location === item.href
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {language === "EN" ? "Language" : "Puo"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="gap-2 text-xs"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {language === "EN" ? "Switch to Sesotho" : "Switch to English"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {language === "EN" ? "Theme" : "Sebopeho"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="gap-2 text-xs"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="h-3.5 w-3.5" /> Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="h-3.5 w-3.5" /> Light Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
