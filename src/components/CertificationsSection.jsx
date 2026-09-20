import { BadgeCheck, ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";

// Certifications are optional -- the whole section disappears when the
// array is empty, the same way TestimonialsSection does, so the page
// never shows an empty shell.
export default function CertificationsSection({ certifications }) {
  if (!certifications?.length) return null;

  return (
    <section id="certifications" className="border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Credentials
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Certifications
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => {
            const inProgress = cert.status === "in-progress";
            return (
              <Reveal
                key={`${cert.issuer}-${cert.name}`}
                delay={Math.min(i, 4) * 0.06}
                className="card-hover flex h-full flex-col rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-start gap-4">
                  {cert.badge ? (
                    // Plain <img>: badges are small, fixed-size, and may be
                    // an SVG served from the issuer or an upload -- none of
                    // which next/image buys us anything for here.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cert.badge}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className={`h-14 w-14 shrink-0 object-contain ${
                        inProgress ? "opacity-40 grayscale" : ""
                      }`}
                    />
                  ) : (
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <BadgeCheck size={22} />
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-base font-semibold leading-snug">
                      {cert.name}
                    </h3>
                    <p className="mt-1 break-words text-sm text-accent">{cert.issuer}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {cert.date && (
                        <span className="font-mono text-xs text-muted">
                          {inProgress ? "Expected" : "Issued"} {cert.date}
                        </span>
                      )}
                      {inProgress && (
                        <span className="rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-xs uppercase tracking-wide text-muted">
                          In progress
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {cert.skills?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4 text-sm">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center gap-1.5 font-medium text-accent transition hover:brightness-125"
                    >
                      Verify <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-muted">
                      {inProgress ? "Not yet earned" : "Verification pending"}
                    </span>
                  )}

                  {cert.credentialId && (
                    <span className="min-w-0 truncate font-mono text-xs text-muted">
                      ID {cert.credentialId}
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
