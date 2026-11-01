import { BarChart3, Users, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import AdminPageHeader from "../AdminPageHeader";
import AdminStatCard from "../AdminStatCard";
import { getAllProjectsAnalytics } from "./data";
import ProjectStatCard, { ChangeLabel } from "./ProjectStatCard";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const { configured, totals, leads, cards } = await getAllProjectsAnalytics();

  return (
    <div>
      <AdminPageHeader
        icon={BarChart3}
        title="All projects"
        description="Every tracked project, last 7 days."
      />

      <Reveal delay={0.05} className="mt-8 grid grid-cols-2 gap-3">
        <AdminStatCard
          label="Visitors, all projects (7d)"
          value={totals ? totals.visitors : "—"}
          icon={Users}
          hint={totals && <ChangeLabel change={totals.change} />}
        />
        <AdminStatCard
          label="Portfolio leads (7d)"
          value={leads ? leads.count : "—"}
          icon={Mail}
          hint={leads && <ChangeLabel change={leads.change} />}
        />
      </Reveal>

      {!configured && (
        <p className="mt-6 text-sm text-muted">
          Set <code className="font-mono text-foreground">OPENPANEL_API_CLIENT_ID</code> and{" "}
          <code className="font-mono text-foreground">OPENPANEL_API_CLIENT_SECRET</code> to load
          numbers.
        </p>
      )}

      <Reveal
        delay={0.1}
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((card) => (
          <ProjectStatCard key={card.slug} card={card} />
        ))}
      </Reveal>
    </div>
  );
}
