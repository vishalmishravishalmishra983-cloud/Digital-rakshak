import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, User, Lock, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

const languages = [
  { code: "hi-IN", label: "हिंदी", flag: "🇮🇳" },
  { code: "en-US", label: "English", flag: "🇺🇸" },
  { code: "bn-IN", label: "বাংলা", flag: "🇮🇳" },
  { code: "ta-IN", label: "தமிழ்", flag: "🇮🇳" },
  { code: "te-IN", label: "తెలుగు", flag: "🇮🇳" },
  { code: "mr-IN", label: "मराठी", flag: "🇮🇳" },
  { code: "gu-IN", label: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn-IN", label: "ಕನ್ನಡ", flag: "🇮🇳" },
];

export default function LoginPage() {
  const [name, setName] = useState(() => localStorage.getItem("ss_username") || "");
  const [selectedLang, setSelectedLang] = useState(
    () => localStorage.getItem("ss_language") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("ss_loggedin") === "true"
  );

  const handleLogin = () => {
    if (!name.trim()) {
      toast("❌ Name डालें!", { description: "कृपया अपना नाम enter करें।" });
      return;
    }
    if (!selectedLang) {
      toast("❌ Language चुनें!", { description: "कृपया अपनी भाषा select करें।" });
      return;
    }
    localStorage.setItem("ss_username", name.trim());
    localStorage.setItem("ss_language", selectedLang);
    localStorage.setItem("ss_loggedin", "true");
    setIsLoggedIn(true);
    const langLabel = languages.find((l) => l.code === selectedLang)?.label || selectedLang;
    toast("✅ Login Successful!", { description: `Welcome ${name.trim()}! Language: ${langLabel}` });
  };

  const handleLogout = () => {
    localStorage.removeItem("ss_loggedin");
    setIsLoggedIn(false);
    toast("👋 Logged out successfully!");
  };

  const handleUpdateLang = (code: string) => {
    setSelectedLang(code);
    localStorage.setItem("ss_language", code);
    const langLabel = languages.find((l) => l.code === code)?.label || code;
    toast("🌐 Language Updated!", { description: `AI Announcements अब ${langLabel} में होंगे।` });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {isLoggedIn ? "Your Profile" : "Login"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isLoggedIn
                ? "अपनी language बदलें – AI announcement इसी में होगा"
                : "Login करें और अपनी भाषा चुनें"}
            </p>
          </div>

          <div className="rounded-lg border border-border p-6 gradient-card">
            {!isLoggedIn ? (
              <>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      <User className="h-4 w-4 inline mr-1" /> Name
                    </label>
                    <Input
                      placeholder="अपना नाम डालें"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-secondary border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      <Lock className="h-4 w-4 inline mr-1" /> Password (Demo)
                    </label>
                    <Input
                      type="password"
                      placeholder="Password (कुछ भी डालें)"
                      className="bg-secondary border-border text-foreground"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-1">
                    <Globe className="h-4 w-4" /> AI Announcement Language चुनें
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLang(lang.code)}
                        className={`flex items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all ${
                          selectedLang === lang.code
                            ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                            : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                        {selectedLang === lang.code && <Check className="h-4 w-4 ml-auto text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleLogin} className="w-full bg-primary text-primary-foreground">
                  <Shield className="h-4 w-4 mr-2" /> Login करें
                </Button>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{name}</h2>
                  <p className="text-sm text-muted-foreground">Welcome back! 👋</p>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-1">
                    <Globe className="h-4 w-4" /> AI Announcement Language
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleUpdateLang(lang.code)}
                        className={`flex items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all ${
                          selectedLang === lang.code
                            ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                            : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                        {selectedLang === lang.code && <Check className="h-4 w-4 ml-auto text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleLogout} variant="destructive" className="w-full">
                  Logout
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
