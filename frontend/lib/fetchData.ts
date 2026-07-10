import { cache } from "react";
import { getProjects } from "@/services/projectService";
import { getCertifications } from "@/services/certificationService";
import { getExperiences } from "@/services/experienceService";
import { getPortfolio } from "@/services/portfolioService";
import {
  FALLBACK_PROJECTS,
  FALLBACK_CERTIFICATIONS,
  FALLBACK_EXPERIENCES,
  FALLBACK_PORTFOLIO,
} from "@/lib/fallbackData";

export const fetchPortfolioProfile = cache(async () => {
  const [portfolio] = await Promise.allSettled([getPortfolio()]);
  return portfolio.status === "fulfilled" ? portfolio.value : FALLBACK_PORTFOLIO;
});

export const fetchPortfolioData = cache(async () => {
  const [projects, certifications, experiences, portfolio] =
    await Promise.allSettled([
      getProjects(),
      getCertifications(),
      getExperiences(),
      fetchPortfolioProfile(),
    ]);

  return {
    projects:
      projects.status === "fulfilled" ? projects.value : FALLBACK_PROJECTS,
    certifications:
      certifications.status === "fulfilled"
        ? certifications.value
        : FALLBACK_CERTIFICATIONS,
    experiences:
      experiences.status === "fulfilled"
        ? experiences.value
        : FALLBACK_EXPERIENCES,
    portfolio:
      portfolio.status === "fulfilled" ? portfolio.value : FALLBACK_PORTFOLIO,
  };
});
