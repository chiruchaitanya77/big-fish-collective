import { z } from "zod";

export const categoryOptions = {
  partner: ["Film or streaming", "Advertising", "Branded content", "Photography", "Live or experiential", "Other production"],
  talent: ["Actor or performer", "Voice or presenter", "Writer or director", "Camera or post-production", "Production or design", "Other creative discipline"],
};
const singleLine = (max: number) => z.string().trim().max(max).refine(v => !/[\r\n\x00-\x08]/.test(v), "Please enter a single line.");
export const enquirySchema = z.object({
  kind: z.enum(["partner", "talent"]),
  name: singleLine(100).pipe(z.string().min(2)),
  email: singleLine(160).pipe(z.string().email()).transform(v => v.toLowerCase()),
  phone: singleLine(40).refine(v => !v || /^[+\d\s().-]{5,40}$/.test(v), "Please enter a valid phone number.").optional().default(""),
  company: singleLine(120).optional().default(""),
  location: singleLine(100).pipe(z.string().min(2)),
  category: singleLine(100),
  links: z.string().trim().max(600).refine(v => !v || v.split(/[\s,]+/).every(link => {
    try { return ["http:", "https:"].includes(new URL(link).protocol); } catch { return false; }
  }), "Use complete links starting with https://, separated by spaces.").optional().default(""),
  message: z.string().trim().min(20).max(3000),
  consent: z.literal(true),
  website: z.string().max(500).optional().default(""),
  submissionId: z.string().uuid(),
}).refine(v => categoryOptions[v.kind].includes(v.category), {path: ["category"], message: "Select a category from the list."});
