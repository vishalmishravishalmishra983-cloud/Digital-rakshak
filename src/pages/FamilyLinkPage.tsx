import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Shield, ShieldCheck, ShieldAlert, Phone, MessageSquare, Link2, Trash2, Bell, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

interface FamilyMember {
  id: string;
  name: string;
  phone: string;
  relation: string;
  spamBlocked: number;
  callsBlocked: number;
  smsBlocked: number;
  linksBlocked: number;
  protectionActive: boolean;
  lastAlert: string;
}

const defaultMembers: FamilyMember[] = [
  {
    id: "1",
    name: "Papa Ji",
    phone: "9876500001",
    relation: "Father",
    spamBlocked: 24,
    callsBlocked: 12,
    smsBlocked: 8,
    linksBlocked: 4,
    protectionActive: true,
    lastAlert: "2 घंटे पहले - Fraud call block किया",
  },
  {
    id: "2",
    name: "Mummy Ji",
    phone: "9876500002",
    relation: "Mother",
    spamBlocked: 18,
    callsBlocked: 9,
    smsBlocked: 6,
    linksBlocked: 3,
    protectionActive: true,
    lastAlert: "5 घंटे पहले - Spam SMS block किया",
  },
];

export default function FamilyLinkPage() {
  const [members, setMembers] = useState<FamilyMember[]>(defaultMembers);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRelation, setNewRelation] = useState("");

  const handleAdd = () => {
    if (!newName.trim() || !newPhone.trim()) {
      toast("❌ नाम और नंबर डालें!");
      return;
    }
    if (newPhone.length !== 10 || !/^\d+$/.test(newPhone)) {
      toast("❌ सही 10 अंकों का नंबर डालें!");
      return;
    }
    const member: FamilyMember = {
      id: Date.now().toString(),
      name: newName.trim(),
      phone: newPhone.trim(),
      relation: newRelation.trim() || "Family",
      spamBlocked: 0,
      callsBlocked: 0,
      smsBlocked: 0,
      linksBlocked: 0,
      protectionActive: true,
      lastAlert: "अभी जोड़ा गया",
    };
    setMembers((prev) => [...prev, member]);
    setNewName("");
    setNewPhone("");
    setNewRelation("");
    setShowAdd(false);
    toast("✅ Family member जोड़ दिया गया!", { description: `${member.name} अब Digital Rakshak से सुरक्षित है।` });
  };

  const toggleProtection = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const active = !m.protectionActive;
          toast(active ? "🛡️ Protection ON" : "⚠️ Protection OFF", {
            description: `${m.name} की protection ${active ? "चालू" : "बंद"} कर दी।`,
          });
          return { ...m, protectionActive: active };
        }
        return m;
      })
    );
  };

  const removeMember = (id: string) => {
    const m = members.find((x) => x.id === id);
    setMembers((prev) => prev.filter((x) => x.id !== id));
    toast("🗑️ Member हटा दिया", { description: `${m?.name} को family list से हटा दिया।` });
  };

  const totalBlocked = members.reduce((s, m) => s + m.spamBlocked, 0);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" /> Family Link Protection
          </h1>
          <p className="text-muted-foreground mb-6">
            परिवार के बड़े-बुजुर्गों को spam calls, fraud SMS और खतरनाक links से बचाएं!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Members", value: members.length, icon: Users },
              { label: "Total Blocked", value: totalBlocked, icon: Shield },
              { label: "Active Protection", value: members.filter((m) => m.protectionActive).length, icon: ShieldCheck },
              { label: "Alerts Today", value: members.reduce((s, m) => s + m.callsBlocked, 0), icon: Bell },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border p-3 bg-card text-center">
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Add member */}
          <div className="mb-6">
            {!showAdd ? (
              <Button onClick={() => setShowAdd(true)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <UserPlus className="h-4 w-4 mr-2" /> Family Member जोड़ें
              </Button>
            ) : (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-lg border border-border p-4 bg-card space-y-3">
                <h3 className="font-semibold text-foreground">नया Member जोड़ें</h3>
                <Input placeholder="नाम (जैसे: Dadi Ji)" value={newName} onChange={(e) => setNewName(e.target.value)} className="bg-secondary border-border" />
                <Input placeholder="Phone Number (10 digits)" value={newPhone} onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} className="bg-secondary border-border" />
                <Input placeholder="Relation (जैसे: Grandfather)" value={newRelation} onChange={(e) => setNewRelation(e.target.value)} className="bg-secondary border-border" />
                <div className="flex gap-2">
                  <Button onClick={handleAdd} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-1" /> जोड़ें
                  </Button>
                  <Button variant="outline" onClick={() => setShowAdd(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Members list */}
          <div className="space-y-4">
            <AnimatePresence>
              {members.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className={`rounded-lg border p-4 bg-card ${member.protectionActive ? "border-primary/30" : "border-border"}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground flex items-center gap-2">
                        {member.protectionActive ? (
                          <ShieldCheck className="h-5 w-5 text-accent" />
                        ) : (
                          <ShieldAlert className="h-5 w-5 text-destructive" />
                        )}
                        {member.name}
                        <span className="text-xs text-muted-foreground font-normal">({member.relation})</span>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">📱 {member.phone}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={member.protectionActive ? "default" : "outline"}
                        onClick={() => toggleProtection(member.id)}
                        className="text-xs h-7 px-2"
                      >
                        {member.protectionActive ? "🛡️ ON" : "OFF"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeMember(member.id)} className="text-xs h-7 px-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Protection stats */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="rounded-md bg-secondary p-2 text-center">
                      <Phone className="h-3 w-3 text-primary mx-auto mb-1" />
                      <p className="text-sm font-bold text-foreground">{member.callsBlocked}</p>
                      <p className="text-[10px] text-muted-foreground">Calls Blocked</p>
                    </div>
                    <div className="rounded-md bg-secondary p-2 text-center">
                      <MessageSquare className="h-3 w-3 text-primary mx-auto mb-1" />
                      <p className="text-sm font-bold text-foreground">{member.smsBlocked}</p>
                      <p className="text-[10px] text-muted-foreground">SMS Blocked</p>
                    </div>
                    <div className="rounded-md bg-secondary p-2 text-center">
                      <Link2 className="h-3 w-3 text-primary mx-auto mb-1" />
                      <p className="text-sm font-bold text-foreground">{member.linksBlocked}</p>
                      <p className="text-[10px] text-muted-foreground">Links Blocked</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    <Bell className="h-3 w-3 inline mr-1" />
                    Last Alert: {member.lastAlert}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {members.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>कोई family member नहीं जोड़ा। ऊपर बटन से जोड़ें!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
