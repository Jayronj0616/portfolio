import { FileText } from "lucide-react";
import { getSiteContent } from "@/lib/data";
import AdminPageHeader from "../AdminPageHeader";
import AvatarUploader from "./AvatarUploader";
import SiteForm from "./SiteForm";

export const dynamic = "force-dynamic";

export default async function AdminSitePage() {
  const { about, experience, education, stacks } = await getSiteContent();

  return (
    <div>
      <AdminPageHeader
        icon={FileText}
        title="Site text"
        description="Edits here update the About, Experience, Education, and Toolkit sections on the live site — no redeploy needed."
      />

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Profile photo
        </h2>
        <p className="mt-1 text-xs text-muted">
          Shown in the hero section. Uploads instantly, separate from the
          Save button below.
        </p>
        <div className="mt-4">
          <AvatarUploader initialUrl={about.avatar} />
        </div>
      </div>

      <SiteForm
        about={about}
        experience={experience}
        education={education}
        stacks={stacks}
      />
    </div>
  );
}
