import getClientPromise from "../mongodb";
import { ObjectId } from "mongodb";


const FIELD_ALIASES: Record<string, string[]> = {
  TestCaseID: ["TestCaseID", "ID", "CaseID", "Test_ID"],
  Description: ["Description", "Desc", "TestDesc"],
  Status: ["Status", "Result", "Outcome"],
  BugID: ["BugID", "Bug", "IssueID"],
  ResolutionTime: ["ResolutionTime", "TimeToFix", "FixHours"],
};


export function mapExcelRow(row: any) {
  const mapped: any = {};
  for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
    for (const alias of aliases) {
      if (row[alias] !== undefined) {
        mapped[field] = row[alias];
        break;
      }
    }
    if (mapped[field] === undefined) mapped[field] = null;
  }
  return mapped;
}

export function sanitizeExcelData(rawData: any[]) {
  return rawData.map((row) => {
    const mapped = mapExcelRow(row);

    return {
      TestCaseID: String(mapped.TestCaseID || "Unknown"),
      Description: mapped.Description || "No description",
      Status: ["Passed", "Failed"].includes(mapped.Status) ? mapped.Status : "Unknown",
      BugID: mapped.BugID || null,
      ResolutionTime: Number(mapped.ResolutionTime || 0),
    };
  });
}


const COLLECTIONS = {
  REPORTS: "qa_test_reports",
  FEEDBACK: "qa_feedback",
  METRICS: "qa_metrics",
};


export async function saveQATestReport(data: {
  uploadBy: string;
  fileName: string;
  testPhase: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  bugCount: number;
  avgResolutionTime?: number;
  remarks?: string;
  rawData?: any[];
}) {
  const client = await getClientPromise();
  const db = client.db();

  const result = await db.collection(COLLECTIONS.REPORTS).insertOne({
    ...data,
    uploadDate: new Date(),
  });

  return result.insertedId;
}

export async function getAllQATestReports() {
  const client = await getClientPromise();
  const db = client.db();

  const reports = await db
    .collection(COLLECTIONS.REPORTS)
    .find({})
    .sort({ uploadDate: -1 })
    .toArray();

  return reports;
}

export async function getQATestReportById(id: string) {
  const client = await getClientPromise();
  const db = client.db();

  return await db
    .collection(COLLECTIONS.REPORTS)
    .findOne({ _id: new ObjectId(id) });
}

export async function deleteQATestReport(id: string) {
  const client = await getClientPromise();
  const db = client.db();

  const result = await db
    .collection(COLLECTIONS.REPORTS)
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount > 0;
}


export async function saveUserFeedback(data: {
  userId?: string;
  feedbackText: string;
  sentiment?: string; // positive, neutral, negative
  source?: string; // form or excel
}) {
  const client = await getClientPromise();
  const db = client.db();

  const result = await db.collection(COLLECTIONS.FEEDBACK).insertOne({
    ...data,
    createdAt: new Date(),
  });

  return result.insertedId;
}

export async function getAllUserFeedback() {
  const client = await getClientPromise();
  const db = client.db();

  return await db
    .collection(COLLECTIONS.FEEDBACK)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}


export async function saveOrUpdateMetrics(data: {
  reportId: string;
  bugFixRate: number;
  avgResolutionTime: number;
  testCoverage?: number;
}) {
  const client = await getClientPromise();
  const db = client.db();

  const result = await db.collection(COLLECTIONS.METRICS).updateOne(
    { reportId: data.reportId },
    {
      $set: {
        bugFixRate: data.bugFixRate,
        avgResolutionTime: data.avgResolutionTime,
        testCoverage: data.testCoverage,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  return result.upsertedId || data.reportId;
}
