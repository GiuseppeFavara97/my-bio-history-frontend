import colors from '../styles/colors';
import { spacing } from '../styles/spacing';

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    style={{
      padding: spacing.sm,
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
    }}
  />
);
