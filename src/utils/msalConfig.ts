import { Configuration, RedirectRequest } from "@azure/msal-browser";
import { useRouter } from "next/router";

export const RedirectPaths = {
  COMPANY: '/company/auth/login',
  TEAM: '/team/auth/login',
  MEMBER: '/member/auth/login',
} as const;

export const getRedirectUri = (scenario: AuthScenario): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://staging.techraize.com';
  
  switch (scenario) {
    case 'company':
      return process.env.NEXT_PUBLIC_COMPANY_STAGING_REDIRECT_URI || `${baseUrl}${RedirectPaths.COMPANY}`;
    case 'team':
      return process.env.NEXT_PUBLIC_TEAM_STAGING_REDIRECT_URI || `${baseUrl}${RedirectPaths.TEAM}`;
    case 'member':
      return process.env.NEXT_PUBLIC_MEMBER_STAGING_REDIRECT_URI || `${baseUrl}${RedirectPaths.MEMBER}`;
    default:
      return baseUrl;
  }
};

// Create a base msalConfig with defaults
const baseMsalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID || '',
    authority: '', // This will be dynamically set with tenantId in `getMsalConfig`
    redirectUri: '', // This will be dynamically set in `getMsalConfig`
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};
export const getLoginRequest = (scenario: AuthScenario): RedirectRequest => {
  const baseScopes = ["openid", "profile", "email", "User.Read"];
  
  const scopesByScenario: Record<AuthScenario, string[]> = {
    company: [...baseScopes, "Directory.ReadWrite.All"],
    team: [...baseScopes, "Directory.ReadWrite.All"],
    member: [...baseScopes, "Directory.ReadWrite.All"],
  };


  return {
    scopes: scopesByScenario[scenario],
    redirectUri: getRedirectUri(scenario),
  };
};

const getAuthorityWithTenantId = (): string => {
  return `https://login.microsoftonline.com/ddbe2552-803e-4c95-875c-00fa5298dd67`;
};


export const getMsalConfig = (scenario: AuthScenario): Configuration => ({
  ...baseMsalConfig,
  auth: {
    ...baseMsalConfig.auth,
    authority: getAuthorityWithTenantId(),  // Set authority dynamically with tenantId
    redirectUri: getRedirectUri(scenario),
  }
});

export type AuthScenario = 'company' | 'member' | 'team';
