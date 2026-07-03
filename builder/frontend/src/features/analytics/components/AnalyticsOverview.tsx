import AnalyticsCard from "./AnalyticsCard";

interface Props {
  analytics: {
    views: number;
    downloads: number;
    shares: number;
  };
}

export default function AnalyticsOverview({ analytics }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <AnalyticsCard title="Views" value={analytics.views} />

      <AnalyticsCard title="Downloads" value={analytics.downloads} />

      <AnalyticsCard title="Shares" value={analytics.shares} />
    </div>
  );
}
