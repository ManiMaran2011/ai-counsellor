import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

export async function explainUniversityWithGemini({
  universityName,
  category,
  profile,
}: {
  universityName: string;
  category: "DREAM" | "TARGET" | "SAFE";
  profile: any;
}): Promise<string> {
  const prompt = `
You are a senior international admissions counsellor.

STUDENT PROFILE:
- Degree: ${profile.academics.degree}
- GPA: ${profile.academics.gpa ?? "Not provided"}
- Target Degree: ${profile.goals.targetDegree}
- Countries: ${profile.goals.countries.join(", ")}
- Budget (INR/year): ${profile.budget.annualINR}
- SOP: ${profile.readiness.sop}
- IELTS: ${profile.readiness.ielts}
- GRE: ${profile.readiness.gre}

UNIVERSITY:
${universityName}

CATEGORY:
${category}

TASK:
Explain in 2–3 sentences:
1. Why this university is classified as ${category}
2. The primary admission risk (if any)
3. One concrete improvement suggestion

Tone:
- Honest
- Calm
- Professional
- Not motivational fluff
`;

  try {
    const res = await model.generateContent(prompt);
    return res.response.text().trim();
  } catch {
    return category === "DREAM"
      ? "This university is highly competitive for your current profile. Admission is possible, but the margin for error is very low."
      : category === "TARGET"
      ? "This university aligns well with your academic profile and budget, though a strong SOP is critical."
      : "This university exceeds minimum admission requirements, making acceptance likely.";
  }
}
