import { ReactNode } from 'react';
interface Props {
    onChange?: (value: string) => void;
    options: RadioOption[];
    defaultValue?: string;
    disabled?: boolean;
    id: string;
    required?: boolean;
    value?: string;
}
export declare function RadioButtonGroup(props: Readonly<Props>): import("@emotion/react/jsx-runtime").JSX.Element;
type RadioOption = {
    disabled?: boolean;
    value: string;
} & ({
    ariaLabel: string;
    label: ReactNode;
} | {
    ariaLabel?: string;
    label: string;
});
export {};
//# sourceMappingURL=RadioButtonGroup.d.ts.map