// Simulated spam database
export const spamNumbers: Record<string, { status: "spam" | "suspicious" | "safe"; reports: number; type: string }> = {
  "9876543210": { status: "spam", reports: 342, type: "Telemarketing" },
  "8888888888": { status: "spam", reports: 1205, type: "Fraud Call" },
  "9999999999": { status: "suspicious", reports: 23, type: "Unknown Caller" },
  "7777777777": { status: "spam", reports: 567, type: "Loan Scam" },
  "6666666666": { status: "suspicious", reports: 8, type: "Survey Call" },
  "1234567890": { status: "safe", reports: 0, type: "Verified Business" },
};

// Company spam caller names
export const companySpamNames: Record<string, string> = {
  "credit card": "Credit Card Scam",
  "loan offer": "Loan Fraud",
  "insurance": "Insurance Scam",
  "investment": "Investment Fraud",
  "trading": "Trading Scam",
  "lottery": "Lottery Fraud",
  "prize": "Prize Scam",
  "amazon": "Fake Amazon Call",
  "flipkart": "Fake Flipkart Call",
  "paytm": "Fake Paytm Call",
  "bank": "Bank Fraud",
  "sbi": "Fake SBI Call",
  "rbi": "Fake RBI Call",
  "customs": "Customs Fraud",
  "police": "Fake Police Call",
  "court": "Fake Court Notice",
  "emi": "EMI Scam",
  "kyc": "KYC Fraud",
};

// Detect if number looks like a company/spam prefix
export function detectNumberThreat(input: string): { isSpam: boolean; reason: string; type: string } | null {
  const trimmed = input.trim().toLowerCase();
  
  // Check if input contains company spam keywords
  for (const [keyword, type] of Object.entries(companySpamNames)) {
    if (trimmed.includes(keyword)) {
      return { isSpam: true, reason: `Company spam detected: "${keyword}"`, type };
    }
  }
  
  // +91 11 prefix (Delhi landline - commonly spoofed)
  const cleaned = trimmed.replace(/[\s\-\(\)]/g, "");
  if (cleaned.startsWith("+9111") || cleaned.startsWith("009111") || cleaned.startsWith("011")) {
    return { isSpam: true, reason: "+91-11 prefix (Delhi landline - commonly spoofed)", type: "Suspicious Landline" };
  }
  
  // Generic +91 with short/unusual patterns
  if ((cleaned.startsWith("+91") || cleaned.startsWith("0091")) && cleaned.replace(/\D/g, "").length < 12) {
    return { isSpam: true, reason: "Invalid +91 number format", type: "Spoofed Number" };
  }
  
  // Numbers starting with company-like prefixes (1800, 140, etc.)
  if (cleaned.startsWith("140") || cleaned.startsWith("1800")) {
    return { isSpam: true, reason: "Automated/Company caller prefix", type: "Telemarketer" };
  }
  
  return null;
}

export const fraudKeywords = [
  "otp", "bank", "lottery", "prize", "winner", "click here", "urgent",
  "account blocked", "verify", "kyc", "link", "expiry", "suspend",
  "reward", "free", "congratulations", "claim", "limited time",
  "transfer", "upi", "password", "pin", "cvv", "aadhar", "pan",
];

export function analyzeMessage(text: string): { score: number; level: "low" | "medium" | "high"; matches: string[] } {
  const lower = text.toLowerCase();
  const matches = fraudKeywords.filter((kw) => lower.includes(kw));
  const score = Math.min(100, matches.length * 18 + (lower.includes("http") ? 20 : 0));
  const level = score < 30 ? "low" : score < 65 ? "medium" : "high";
  return { score, level, matches };
}

export const trendingSpam = [
  { number: "8888888888", reports: 1205, type: "Fraud Call", city: "Delhi" },
  { number: "7777777777", reports: 567, type: "Loan Scam", city: "Mumbai" },
  { number: "9876543210", reports: 342, type: "Telemarketing", city: "Bangalore" },
  { number: "5555555555", reports: 289, type: "Insurance Scam", city: "Chennai" },
  { number: "4444444444", reports: 178, type: "KYC Fraud", city: "Hyderabad" },
];

export const recentAlerts = [
  { id: 1, type: "call", number: "8888888888", status: "blocked", time: "2 min ago" },
  { id: 2, type: "sms", number: "7777777777", status: "blocked", time: "15 min ago" },
  { id: 3, type: "call", number: "1234567890", status: "safe", time: "1 hr ago" },
  { id: 4, type: "sms", number: "9999999999", status: "suspicious", time: "2 hr ago" },
  { id: 5, type: "call", number: "6666666666", status: "suspicious", time: "3 hr ago" },
];
