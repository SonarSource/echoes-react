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
  BadgeVariety,
  Button,
  ButtonVariety,
  Checkbox,
  cssVar,
  Layout,
  Link,
  MessageCallout,
  Select,
  Table,
  TableVariety,
  TextInput,
} from '../../src';

const meta: Meta = {
  title: 'Playground/Color migration',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const IssuesWorkflow: Story = {
  render: () => <IssuesWorkflowPage />,
};

const issues = [
  {
    key: 'S2068',
    message: 'Hard-coded credentials are security-sensitive',
    severity: BadgeVariety.Danger,
  },
  {
    key: 'S3776',
    message: 'Refactor this function to reduce its cognitive complexity',
    severity: BadgeVariety.Warning,
  },
  {
    key: 'S1481',
    message: 'Remove this unused local variable',
    severity: BadgeVariety.Info,
  },
];

function IssuesWorkflowPage() {
  const [project, setProject] = useState<string | null>('echoes');
  const [selected, setSelected] = useState<Record<string, boolean>>({ S3776: true });

  return (
    <Layout>
      <Layout.ContentGrid>
        <Layout.PageGrid width="fluid">
          <Layout.PageContent>
            <PageHeader>
              <div>
                <Eyebrow>marciopmoreira6 / echoes-react</Eyebrow>
                <Title>Issues</Title>
                <Description>
                  Review findings on new code, assign owners, and confirm remediation.{' '}
                  <Link to="#">About issue severity</Link>
                </Description>
              </div>
              <Button variety={ButtonVariety.Primary}>Resolve selected</Button>
            </PageHeader>

            <MessageCallout variety="info">
              Information is deliberately neutral. Blue is reserved for AI, upgrades, and explicit
              feature emphasis.
            </MessageCallout>

            <Toolbar>
              <TextInput ariaLabel="Search issues" placeholder="Search issues" />
              <Select
                ariaLabel="Project"
                data={[
                  { label: 'echoes-react', value: 'echoes' },
                  { label: 'sonarqube-webapp', value: 'webapp' },
                ]}
                isNotClearable
                onChange={setProject}
                value={project}
              />
              <Button>More filters</Button>
              <Button isDisabled>Bulk change</Button>
            </Toolbar>

            <Table
              ariaLabel="Issues on new code"
              gridTemplate="max-content minmax(6rem, 0.4fr) minmax(20rem, 2fr) minmax(7rem, 0.5fr)"
              variety={TableVariety.Surface}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell label="Select" />
                  <Table.ColumnHeaderCell label="Rule" />
                  <Table.ColumnHeaderCell label="Issue" />
                  <Table.ColumnHeaderCell label="Severity" />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {issues.map((issue) => (
                  <Table.Row key={issue.key} selected={Boolean(selected[issue.key])}>
                    <Table.CellCheckbox
                      ariaLabel={`Select ${issue.key}`}
                      checked={Boolean(selected[issue.key])}
                      onCheck={(checked) =>
                        setSelected((current) => ({ ...current, [issue.key]: Boolean(checked) }))
                      }
                    />
                    <Table.CellLink to="#">{issue.key}</Table.CellLink>
                    <Table.CellText content={issue.message} />
                    <Table.CellBadge variety={issue.severity}>Open</Table.CellBadge>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            <TwoColumns>
              <Panel>
                <SectionTitle>Assignment</SectionTitle>
                <TextInput label="Assignee" placeholder="Search users" />
                <Checkbox checked label="Notify the assignee" onCheck={() => undefined} />
                <Checkbox
                  checked
                  isDisabled
                  label="Disabled selected state"
                  onCheck={() => undefined}
                />
              </Panel>

              <FeaturePanel>
                <SectionTitle>AI CodeFix</SectionTitle>
                <Description>
                  Generate a suggested fix for supported issues. This is an explicit feature-blue
                  treatment; its action remains governed by the selected action strategy.
                </Description>
                <Button variety={ButtonVariety.Primary}>Generate fix</Button>
              </FeaturePanel>
            </TwoColumns>

            <SectionTitle>Contextual Gray Alpha</SectionTitle>
            <AlphaGrid>
              <AlphaSurface data-surface="white">White</AlphaSurface>
              <AlphaSurface data-surface="neutral">Neutral</AlphaSurface>
              <AlphaSurface data-surface="tinted">Tinted</AlphaSurface>
              <AlphaSurface data-surface="brand">Feature</AlphaSurface>
            </AlphaGrid>
          </Layout.PageContent>
        </Layout.PageGrid>
      </Layout.ContentGrid>
    </Layout>
  );
}

const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-300')};
  align-items: start;
`;

const Eyebrow = styled.div`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-code-default')};
`;

const Title = styled.h1`
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-large')};
  margin: ${cssVar('dimension-space-50')} 0;
`;

const SectionTitle = styled.h2`
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-medium')};
  margin: 0;
`;

const Description = styled.p`
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};
`;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(14rem, 1fr) minmax(12rem, 16rem) max-content max-content;
  gap: ${cssVar('dimension-space-100')};
  align-items: end;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${cssVar('dimension-space-200')};
`;

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  padding: ${cssVar('dimension-space-200')};
  color: ${cssVar('color-text-default')};
  background: ${cssVar('color-surface-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-subtle')};
  border-radius: ${cssVar('border-radius-200')};
`;

const FeaturePanel = styled(Panel)`
  background: ${cssVar('promoted-feature-colors-background')};
  border-color: ${cssVar('promoted-feature-colors-border')};
`;

const AlphaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(8rem, 1fr));
  gap: ${cssVar('dimension-space-100')};
`;

const AlphaSurface = styled.div`
  position: relative;
  padding: ${cssVar('dimension-space-300')};
  color: ${cssVar('color-text-strong')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-subtle')};

  &[data-surface='white'] {
    background: ${cssVar('color-surface-default')};
  }

  &[data-surface='neutral'] {
    background: ${cssVar('color-surface-subtle')};
  }

  &[data-surface='tinted'] {
    background: ${cssVar('message-colors-warning-background')};
  }

  &[data-surface='brand'] {
    background: ${cssVar('promoted-feature-colors-background')};
  }

  &::after {
    content: '';
    position: absolute;
    inset: ${cssVar('dimension-space-100')};
    background: ${cssVar('color-interaction-background-hover')};
    border-radius: ${cssVar('border-radius-200')};
  }
`;
