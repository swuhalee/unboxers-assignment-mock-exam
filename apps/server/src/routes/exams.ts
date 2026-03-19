import type { FastifyPluginAsync } from "fastify";
import { AnswerType } from "@prisma/client";
import { z } from "zod";

import { GRADE_RESULT } from "../lib/constants";
import { prisma } from "../lib/prisma";
import { errorResponse, successResponse } from "../lib/response";

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((v, i) => v === sortedB[i]);
}

const gradeAnswersSchema = z.object({
  name: z.string().trim().min(1),
  school: z.string().trim().min(1),
  grade: z.number().int(),
  studentNumber: z.number().int(),
  seatNumber: z.number().int(),
  answers: z.array(
    z.discriminatedUnion("answerType", [
      z.object({
        answerType: z.literal(AnswerType.objective),
        number: z.number().int().positive(),
        answer: z.array(z.number().int().positive()).min(1),
      }),
      z.object({
        answerType: z.literal(AnswerType.subjective),
        number: z.number().int().positive(),
        answer: z.number(),
      }),
    ])
  ),
});

type SubmittedAnswer =
  | { answerType: typeof AnswerType.objective; number: number; answer: number[] }
  | { answerType: typeof AnswerType.subjective; number: number; answer: number };

function buildGradeResponse(
  exam: {
    title: string;
    questions: Array<{
      answerType: AnswerType;
      number: number;
      correctAnswer: string;
      score: number;
    }>;
  },
  rawAnswers: SubmittedAnswer[]
) {
  const answerMap = new Map<string, number | number[]>();

  for (const rawAnswer of rawAnswers) {
    answerMap.set(`${rawAnswer.answerType}:${rawAnswer.number}`, rawAnswer.answer);
  }

  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const results = exam.questions.map((question) => {
    const submittedAnswer = answerMap.get(
      `${question.answerType}:${question.number}`
    );

    if (submittedAnswer == null) {
      unansweredCount += 1;
      return {
        answerType: question.answerType,
        number: question.number,
        result: GRADE_RESULT.UNANSWERED
      };
    }

    const isCorrect =
      question.answerType === AnswerType.objective
        ? arraysEqual(submittedAnswer as number[], JSON.parse(question.correctAnswer) as number[])
        : submittedAnswer === parseInt(question.correctAnswer, 10);

    if (isCorrect) {
      correctCount += 1;
      score += question.score;
      return {
        answerType: question.answerType,
        number: question.number,
        result: GRADE_RESULT.CORRECT
      };
    }

    wrongCount += 1;
    return {
      answerType: question.answerType,
      number: question.number,
      result: GRADE_RESULT.WRONG
    };
  });

  return {
    title: exam.title,
    score,
    correctCount,
    wrongCount,
    unansweredCount,
    results
  };
}

export const examsRoute: FastifyPluginAsync = async (app) => {
  app.get("/", async (_, reply) => {
    const exam = await prisma.exam.findFirst({
      include: {
        questions: {
          orderBy: [
            {
              answerType: "asc"
            },
            {
              number: "asc"
            }
          ],
          select: {
            answerType: true,
            score: true
          }
        }
      }
    });

    if (!exam) {
      return reply.code(404).send(errorResponse("Exam not found"));
    }

    const totalScore = exam.questions.reduce(
      (sum, question) => sum + question.score,
      0
    );
    const totalObjective = exam.questions.filter(
      (q) => q.answerType === AnswerType.objective
    ).length;
    const totalSubjective = exam.questions.filter(
      (q) => q.answerType === AnswerType.subjective
    ).length;

    return successResponse(
      "Exam retrieved successfully",
      {
        title: exam.title,
        subject: exam.subject,
        supervisorName: exam.supervisorName,
        totalQuestions: exam.questions.length,
        totalObjective,
        totalSubjective,
        totalScore
      }
    );
  });

  app.post<{
    Body: unknown;
  }>("/submit", async (request, reply) => {
    const payload = gradeAnswersSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.code(400).send({
        ...errorResponse("Invalid request"),
        issues: payload.error.flatten()
      });
    }

    const exam = await prisma.exam.findFirst({
      include: {
        questions: {
          orderBy: [
            {
              answerType: "asc"
            },
            {
              number: "asc"
            }
          ],
          select: {
            answerType: true,
            number: true,
            correctAnswer: true,
            score: true
          }
        }
      }
    });

    if (!exam) {
      return reply.code(404).send(errorResponse("Exam not found"));
    }

    return successResponse(
      "Exam submitted successfully",
      buildGradeResponse(exam, payload.data.answers)
    );
  });
};
