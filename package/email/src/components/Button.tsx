import colors from '../styles/colors';
import { spacing } from '../styles/spacing';

export const Button = ({ children }: { children: React.ReactNode }) => (
  <button
    style={{
      backgroundColor: colors.primary,
      color: colors.white,
      padding: spacing.md,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
);
