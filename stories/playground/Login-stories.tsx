/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Button,
  ButtonSize,
  ButtonVariety,
  cssVar,
  DropdownMenu,
  IconChevronDown,
  LinkStandalone,
  LogoSize,
  LogoSonar,
} from '../../src';
import { GitHubLogo } from './GitHubLogo';

const meta: Meta = {
  title: 'Playground/Login',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const REGIONS = [
  { flag: '🇪🇺', label: 'EU (Frankfurt)' },
  { flag: '🇺🇸', label: 'US (Virginia)' },
] as const;

export const EditorialLogin: Story = {
  render: () => <LoginPage />,
};

function LoginPage() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>(REGIONS[0]);

  return (
    <LoginShell>
      <AuthenticationPanel>
        <AuthenticationContent>
          <AuthenticationHeader>
            <AuthenticationTitle>Welcome to SonarQube</AuthenticationTitle>
          </AuthenticationHeader>

          <AuthenticationActions>
            <LoginButton size={ButtonSize.Large} variety={ButtonVariety.Primary}>
              Log in with enterprise SSO
            </LoginButton>

            <Divider>
              <span>Or log in / sign up with</span>
            </Divider>

            <ProviderStack aria-label="Alternative sign-in methods">
              <ProviderButton
                prefix={<GitHubLogo />}
                size={ButtonSize.Medium}
                variety={ButtonVariety.Default}>
                GitHub
              </ProviderButton>
              <ProviderButton
                prefix={<BitbucketLogo />}
                size={ButtonSize.Medium}
                variety={ButtonVariety.Default}>
                Bitbucket
              </ProviderButton>
              <ProviderButton
                prefix={<GitLabLogo />}
                size={ButtonSize.Medium}
                variety={ButtonVariety.Default}>
                Gitlab
              </ProviderButton>
              <ProviderButton
                prefix={<AzureDevOpsLogo />}
                size={ButtonSize.Medium}
                variety={ButtonVariety.Default}>
                Azure DevOps
              </ProviderButton>
            </ProviderStack>
          </AuthenticationActions>

          <AuthenticationFooter>
            <p>
              By logging in, you agree to our{' '}
              <LinkStandalone to="#">Terms of Service</LinkStandalone>.
            </p>
          </AuthenticationFooter>

          <RegionFooter>
            <RegionSelection>
              <span>Server region:</span>
              <DropdownMenu
                items={REGIONS.map((option) => (
                  <DropdownMenu.ItemButtonCheckable
                    isChecked={option.label === region.label}
                    key={option.label}
                    onClick={() => setRegion(option)}>
                    {option.flag} {option.label}
                  </DropdownMenu.ItemButtonCheckable>
                ))}>
                <RegionButton
                  size={ButtonSize.Medium}
                  suffix={<IconChevronDown />}
                  variety={ButtonVariety.DefaultGhost}>
                  {region.flag} {region.label}
                </RegionButton>
              </DropdownMenu>
            </RegionSelection>
            <LinkStandalone to="#">Learn about server regions ↗</LinkStandalone>
          </RegionFooter>
        </AuthenticationContent>
      </AuthenticationPanel>

      <EditorialPanel>
        <EditorialContent>
          <CompanyLogo hasText size={LogoSize.Medium} />

          <EditorialMessage>
            <EditorialKicker>
              <EditorialSquare aria-hidden /> VERIFY WHAT AI BUILDS
            </EditorialKicker>
            <EditorialTitle>
              Build with AI,
              <br />
              <EditorialTitleAccent>verify with SonarQube</EditorialTitleAccent>
            </EditorialTitle>
            <EditorialDescription>
              Teams who verify with SonarQube are 44% less likely to hit outages from AI-generated
              code.
            </EditorialDescription>
            <ProofIntro>Trusted by</ProofIntro>
            <ProofGrid>
              <ProofItem>
                <ProofValue>7M+</ProofValue>
                <ProofLabel>Developers</ProofLabel>
              </ProofItem>
              <ProofItem>
                <ProofValue>750B+</ProofValue>
                <ProofLabel>Lines analyzed daily</ProofLabel>
              </ProofItem>
            </ProofGrid>
          </EditorialMessage>
        </EditorialContent>
      </EditorialPanel>
    </LoginShell>
  );
}

function BitbucketLogo() {
  return (
    <ProviderLogo aria-hidden focusable="false" viewBox="0 0 24 24">
      <path
        d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 00.77-.646l3.27-20.03a.768.768 0 00-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z"
        fill="#2684ff"
      />
    </ProviderLogo>
  );
}

function GitLabLogo() {
  return (
    <ProviderLogo aria-hidden focusable="false" viewBox="0 0 24 24">
      <path
        d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z"
        fill="#fc6d26"
      />
    </ProviderLogo>
  );
}

function AzureDevOpsLogo() {
  return (
    <ProviderLogo aria-hidden focusable="false" viewBox="0 0 128 128">
      <path
        d="M120.89 28.445v69.262l-28.445 23.324-44.09-16.07v15.93L23.395 88.25l72.746 5.688V31.574ZM96.64 31.93 55.82 7.11v16.285L18.348 34.418 7.109 48.852v32.785l16.075 7.11V46.718Zm0 0"
        fill="#0078d4"
      />
    </ProviderLogo>
  );
}

const LoginShell = styled.main`
  display: grid;
  grid-template-columns: minmax(32rem, 48%) minmax(0, 1fr);
  min-height: 100dvh;
  overflow-x: hidden;
  color: ${cssVar('color-text-default')};
  background: ${cssVar('color-roles-support-white')};

  @media (max-width: 70rem) {
    grid-template-columns: 1fr;
  }
`;

const AuthenticationPanel = styled.section`
  display: grid;
  place-items: center;
  min-width: 0;
  padding: clamp(2rem, 6vw, 6rem);
  background: ${cssVar('color-surface-default')};

  @media (max-width: 70rem) {
    min-height: 100dvh;
  }
`;

const AuthenticationContent = styled.div`
  width: min(100%, 27rem);
`;

const AuthenticationHeader = styled.header`
  margin-bottom: ${cssVar('dimension-space-400')};
`;

const AuthenticationTitle = styled.h1`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font-family: 'Sentinent', Georgia, 'Times New Roman', serif;
  font-size: clamp(1.75rem, 2vw, 2.25rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.04em;
  white-space: nowrap;
`;

const AuthenticationActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-200')};
`;

const LoginButton = styled(Button)`
  justify-content: center;
  width: 100%;
  transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);

  &:active {
    transform: scale(0.98);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active {
      transform: none;
    }
  }
`;

const Divider = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${cssVar('dimension-space-150')};
  align-items: center;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};

  &::before,
  &::after {
    height: ${cssVar('border-width-default')};
    background: ${cssVar('color-border-weak')};
    content: '';
  }
`;

const ProviderStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
`;

const ProviderButton = styled(LoginButton)`
  min-width: 0;
`;

const ProviderLogo = styled.svg`
  flex: 0 0 auto;
  width: ${cssVar('dimension-width-200')};
  height: ${cssVar('dimension-height-400')};
`;

const AuthenticationFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-75')};
  margin-top: ${cssVar('dimension-space-300')};
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  text-align: center;

  & p {
    margin: 0;
  }
`;

const RegionFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
  align-items: center;
  margin-top: ${cssVar('dimension-space-300')};
  padding-top: ${cssVar('dimension-space-200')};
  border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

const RegionSelection = styled.div`
  display: flex;
  gap: ${cssVar('dimension-space-100')};
  align-items: center;
`;

const RegionButton = styled(Button)`
  color: ${cssVar('color-text-default')};
`;

const EditorialPanel = styled.aside`
  position: relative;
  display: grid;
  min-width: 0;
  overflow: hidden;
  padding: clamp(2.5rem, 6vw, 7rem);
  border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  background-color: ${cssVar('color-surface-canvas-default')};
  background-image: linear-gradient(
    135deg,
    transparent 0 47%,
    ${cssVar('color-border-subtle')} 47% 53%,
    transparent 53% 100%
  );
  background-size: 0.75rem 0.75rem;

  @media (max-width: 70rem) {
    min-height: 42rem;
    border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
    border-left: 0;
  }

  @media (max-width: 48rem) {
    display: none;
  }
`;

const EditorialContent = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  align-items: center;
  max-width: 50rem;
`;

const CompanyLogo = styled(LogoSonar)`
  position: absolute;
  top: 0;
  left: 0;
`;

const EditorialMessage = styled.div`
  align-self: center;
  max-width: 46rem;
`;

const EditorialKicker = styled.p`
  display: flex;
  gap: ${cssVar('dimension-space-100')};
  align-items: center;
  margin: 0 0 ${cssVar('dimension-space-300')};
  color: ${cssVar('color-text-default')};
  font-family: ${cssVar('font-family-mono')};
  font-size: ${cssVar('font-size-10')};
  line-height: 1;
  letter-spacing: 0.18em;
`;

const EditorialSquare = styled.span`
  width: ${cssVar('dimension-width-100')};
  height: ${cssVar('dimension-height-200')};
  background: ${cssVar('color-feature-solid-default')};
`;

const EditorialTitle = styled.h2`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font-family: 'Sentinent', Georgia, 'Times New Roman', serif;
  font-size: clamp(3rem, 4.25vw, 5rem);
  font-weight: 400;
  line-height: 0.94;
  letter-spacing: -0.04em;
  text-wrap: balance;
`;

const EditorialTitleAccent = styled.span`
  color: ${cssVar('color-feature-solid-default')};
`;

const EditorialDescription = styled.p`
  max-width: 40rem;
  margin: ${cssVar('dimension-space-400')} 0 0;
  color: ${cssVar('color-text-default')};
  font-size: ${cssVar('font-size-30')};
  line-height: 1.55;
`;

const ProofIntro = styled.p`
  margin: ${cssVar('dimension-space-300')} 0 ${cssVar('dimension-space-100')};
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

const ProofGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  color: ${cssVar('color-text-default')};
  background: ${cssVar('color-surface-default')};
  font: ${cssVar('typography-text-default-regular')};
`;

const ProofItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-75')};
  min-width: 0;
  padding: ${cssVar('dimension-space-300')};

  & + & {
    border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  }
`;

const ProofValue = styled.strong`
  color: ${cssVar('color-feature-solid-default')};
  font-family: 'Sentinent', Georgia, 'Times New Roman', serif;
  font-size: ${cssVar('font-size-50')};
  font-weight: 400;
  line-height: 1;
`;

const ProofLabel = styled.span`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;
