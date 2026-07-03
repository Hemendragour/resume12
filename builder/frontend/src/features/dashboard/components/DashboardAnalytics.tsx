import AnalyticsOverview from "../../analytics/components/AnalyticsOverview";

import { useResumeAnalytics } from "../../analytics/hooks/useResumeAnalytics";

interface Props {
  resumeId: string;
}

export default function DashboardAnalytics({ resumeId }: Props) {
  const { data, isLoading } = useResumeAnalytics(resumeId);

  if (isLoading) return null;

  if (!data) return null;

  return <AnalyticsOverview analytics={data} />;
}
