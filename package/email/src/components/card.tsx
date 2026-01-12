import colors from '../styles/colors';
import { spacing } from '../styles/spacing';

export const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor: colors.white,
      padding: spacing.lg,
      borderRadius: '8px',
    }}
  >
    {children}
  </div>
);
