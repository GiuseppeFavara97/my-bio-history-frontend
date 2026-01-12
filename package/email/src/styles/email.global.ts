export const emailStyles = {
  colors: {
    primary: '#1D7CD3',
    background: '#244673',
    white: '#FFFFFF',
    textPrimary: '#333333',
    textSecondary: '#666666',
    divider: '#E6EBF1',
  },

  fonts: {
    base:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  },

  layout: {
    main: {
      backgroundColor: '#244673',
      padding: '40px 0',
      fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    },

    container: {
      backgroundColor: '#FFFFFF',
      margin: '0 auto',
      padding: '32px',
      width: '420px',
      borderRadius: '8px',
    },

    center: {
      textAlign: 'center' as const,
    },
  },

  typography: {
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#333333',
      textAlign: 'center' as const,
      marginBottom: '16px',
    },

    paragraph: {
      fontSize: '14px',
      lineHeight: '22px',
      color: '#333333',
      marginBottom: '18px',
    },

    footer: {
      fontSize: '12px',
      color: '#666666',
      textAlign: 'center' as const,
      marginTop: '24px',
    },
  },

  components: {
    link: {
      color: '#1D7CD3',
      fontWeight: 600,
    },

    divider: {
      margin: '24px 0',
      borderColor: '#E6EBF1',
    },

    logo: {
      marginBottom: '12px',
    },
  },
};
