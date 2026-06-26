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
  navigationMenuTriggerStyle,
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
      ],
    },
    {
      title: t("civic"),
      items: [
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
          <span className="font-serif font-bold text-xl tracking-tight text-primary">Stadium Area</span>
          <span className="hidden sm:inline-block text-sm text-muted-foreground border-l pl-2 border-border/50">Constituency No. 32</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              {navGroups.map((group) => (
                <NavigationMenuItem key={group.title}>
                  <NavigationMenuTrigger className="bg-transparent">{group.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground ${
                                location === item.href ? "bg-accent/10 text-accent-foreground font-medium" : ""
                              }`}
                            >
                              <div className="text-sm font-medium leading-none">{item.label}</div>
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

          <div className="flex items-center space-x-2 border-l pl-4 border-border/50">
            <Button variant="ghost" size="icon" onClick={toggleLanguage} title={`Switch to ${language === 'EN' ? 'Sesotho' : 'English'}`}>
              <Globe className="h-5 w-5" />
              <span className="sr-only">Toggle language</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground px-1 rounded">{language}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleLanguage}>
            <span className="font-bold text-sm">{language}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4 flex flex-col space-y-6">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h4 className="font-serif font-semibold text-lg text-primary">{group.title}</h4>
                <div className="flex flex-col space-y-2 border-l-2 border-border pl-4">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm py-2 ${
                        location === item.href
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <><Moon className="mr-2 h-4 w-4" /> Dark Mode</>
                ) : (
                  <><Sun className="mr-2 h-4 w-4" /> Light Mode</>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
