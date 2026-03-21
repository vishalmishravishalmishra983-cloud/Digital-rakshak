// Simulated spam database
export const spamNumbers: Record<string, { status: "spam" | "suspicious" | "safe"; reports: number; type: string }> = {
  "9876543210": { status: "spam", reports: 342, type: "Telemarketing" },
  "8888888888": { status: "spam", reports: 1205, type: "Fraud Call" },
  "9999999999": { status: "suspicious", reports: 23, type: "Unknown Caller" },
  "7777777777": { status: "spam", reports: 567, type: "Loan Scam" },
  "6666666666": { status: "suspicious", reports: 8, type: "Survey Call" },
  "1234567890": { status: "safe", reports: 0, type: "Verified Business" },
};

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
