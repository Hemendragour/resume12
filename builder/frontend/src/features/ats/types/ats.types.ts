export interface ATSScoreResponse {
  score: number;

  missingSections: string[];

  suggestions: string[];
}