import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(10),
  department: z.string().min(2),
  year: z.string().min(1),
  collegeName: z.string().min(2),
  domain: z.string().min(1),
  programType: z.string().min(1),
  internshipDuration: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const student = await prisma.student.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        mobile: validatedData.mobile,
        department: validatedData.department,
        year: validatedData.year,
        collegeName: validatedData.collegeName,
        domain: validatedData.domain,
        programType: validatedData.programType,
        internshipDuration: validatedData.internshipDuration || null,
      },
    });

    return NextResponse.json(
      { message: "Registration successful", student },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register student" },
      { status: 500 }
    );
  }
}
