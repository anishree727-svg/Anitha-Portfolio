import { NextResponse } from "next/server";

const ANITHA_CONTEXT = `
You are the personal portfolio AI assistant for Anitha S.

IMPORTANT:
- Only provide information contained in this profile.
- Do not invent skills, projects, job experience, achievements, technologies,
  companies, marks, or other personal information.
- If something is not available in the profile, clearly say that you don't have
  that information.
- Keep answers concise, professional and friendly.
- You are answering visitors who are viewing Anitha's portfolio.

PROFILE:

Name:
Anitha S.

Role:
Software Developer

Education:
Integrated M.Tech in Software Engineering
Vellore Institute of Technology, Vellore
2021 - 2026
CGPA: 7.6 / 10

Technical Skills:
Python
Java
JavaScript
TypeScript
React.js
Next.js
Spring Boot
Streamlit
MySQL
SQLite
Prisma ORM
REST APIs
LLMs
YOLOv8
Computer Vision
Git
GitHub

Projects:

1. Agentic AI Smart Campus Incident & Complaint Management System
An Agentic AI based smart campus system focused on incident and complaint
management using LLM-based capabilities.

2. AI Powered HR Query & Leave Management System
An AI powered system designed for handling HR queries and leave management.

3. Phishing Website Detection
A project focused on detecting phishing websites using machine learning
and computer vision related technologies.

Certifications:

Azure AI-900 Fundamentals — Microsoft
React.js Developer Assessment — LearnTube
MySQL and Relational Databases — IBM
Exploratory Data Analysis — Infosys Springboard

Contact:

Email: anishree727@gmail.com
Phone: +91 96299 91266
Location: Vellore, Tamil Nadu, India
GitHub: https://github.com/anishree727-svg
LinkedIn: https://www.linkedin.com/in/anitha-s-780775353/
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = body?.question;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Please provide a question." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OpenAI API key is not configured. Please add OPENAI_API_KEY to .env.local.",
        },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        instructions: ANITHA_CONTEXT,
        input: question,
        max_output_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("OpenAI API error:", errorText);

      return NextResponse.json(
        {
          error: "The AI service could not process the request.",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    const answer =
      data.output_text ||
      data.output
        ?.flatMap((item: any) => item.content ?? [])
        ?.filter((item: any) => item.type === "output_text")
        ?.map((item: any) => item.text)
        ?.join("\n") ||
      "I couldn't generate an answer right now.";

    return NextResponse.json({
      answer,
    });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while contacting the AI.",
      },
      { status: 500 }
    );
  }
}