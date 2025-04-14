import { GoogleGenAI, Type } from "@google/genai"
import * as yup from 'yup'

const apiKey = process.env.GEMINI_API_KEY

if(!apiKey) throw new Error("GEMINI_API_KEY not found in environment variables")
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const requestSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .max(100, "Title must be at most 100 characters"),

    description: yup
        .string()
        .required("Description is required")
        .max(1000, "Description must be at most 1000 characters"),

    budgetType: yup
        .string()
        .oneOf(["fixed", "hourly", "notsure"], "Budget type is invalid")
        .required("Budget type is required"),

    budget: yup
        .mixed()
        .when("budgetType", {
            is: (val) => val === "notsure",
            then: (schema) =>
                schema
                    .transform(() => "")
                    .notRequired(),
            otherwise: (schema) =>
                yup
                    .number()
                    .typeError("Budget must be a number")
                    .required("Budget is required")
                    .min(1, "Budget must be at least $1"),
        }),
})



export async function POST(req) {
    try {
        const data = await req.json();
        const validatedData = await requestSchema.validate(data, { abortEarly: false })

        const { title, description, budget, budgetType } = validatedData;

        const prompt = `
You are a professional Upwork proposal writer. Your task is to write a concise and compelling proposal for the following job posting.
Use the details provided to craft the proposal. Be professional, courteous, and relevant to the job requirements. Do not include any extra text.

Job Title: ${title.trim()}
Job Description: ${description.trim()}
Budget: ${budget ? `$${budget} ${budgetType}` : `Not Specified`}

Please write the proposal below:
`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        'proposal': {
                            type: Type.STRING,
                            description: "The proposal without any extra text than the proposal itself",
                            nullable: false
                        }
                    },
                    required: ['proposal'],
                },
            },
        });

        const responseJSON = JSON.parse(response.text.trim())

        if (!responseJSON.proposal) {
            return Response.json({
                error: "Something went wrong",
                details: responseJSON
            }, { status: 500 })
        }

        return Response.json({
            proposal: responseJSON.proposal
        })

    } catch (error) {

        // ✅ Yup error handling
        if (error.name === "ValidationError") {
            return Response.json({
                error: "Invalid data provided",
                details: error.errors
            }, { status: 400 })
        }

        throw error;
    }
}
