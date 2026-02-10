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

import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ModalPortalContextValue {
  portalRef: HTMLDivElement | null;
}

const ModalPortalRefContext = createContext<ModalPortalContextValue | null>(null);

/**
 * This component:
 *  - creates a node that modals can attach their portal to
 *  - provides the context containing the node's ref
 *
 * Modals can use the custom hook `useModalPortalRef` to consume it
 */
export function ModalPortal({ children }: Readonly<PropsWithChildren>) {
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  const value = useMemo(() => ({ portalRef: portalNode }), [portalNode]);

  return (
    <>
      <ModalPortalRefContext.Provider value={value}>{children}</ModalPortalRefContext.Provider>
      <div className="echoes-modal-portal" ref={setPortalNode} />
    </>
  );
}

/**
 * Returns the node ref created and provided by `ModalPortal`
 */
export function useModalPortalRef() {
  const context = useContext(ModalPortalRefContext);
  return context?.portalRef;
}
