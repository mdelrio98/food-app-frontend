import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

type EnqueueSnackbar = (
  message: SnackbarMessage,
  options?: OptionsObject
) => SnackbarKey;

// A simple object to hold the enqueueSnackbar function reference
export const notifier = {
  enqueueSnackbar: null as EnqueueSnackbar | null,

  /**
   * Displays a success notification.
   * @param message The message to display.
   */
  success(message: SnackbarMessage) {
    if (this.enqueueSnackbar) {
      this.enqueueSnackbar(message, { variant: 'success' });
    }
  },

  /**
   * Displays an error notification.
   * @param message The message to display.
   */
  error(message: SnackbarMessage) {
    if (this.enqueueSnackbar) {
      this.enqueueSnackbar(message, { variant: 'error' });
    }
  },

  /**
   * Displays an info notification.
   * @param message The message to display.
   */
  info(message: SnackbarMessage) {
    if (this.enqueueSnackbar) {
      this.enqueueSnackbar(message, { variant: 'info' });
    }
  },

  /**
   * Displays a warning notification.
   * @param message The message to display.
   */
  warning(message: SnackbarMessage) {
    if (this.enqueueSnackbar) {
      this.enqueueSnackbar(message, { variant: 'warning' });
    }
  },
};
