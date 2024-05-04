import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { Portal } from '@radix-ui/react-portal';
import { motion, AnimatePresence } from 'framer-motion';

import { SnackbarTheme } from 'config/snackbar';

import CloseIcon from 'img/icons/close.svg?react';
import ErrorIcon from 'img/icons/error.svg?react';
import InfoIcon from 'img/icons/info.svg?react';
import SmileIcon from 'img/icons/smile.svg?react';

import s from './Snackbar.module.scss';

type Props = PropsWithChildren & {
  isVisible: boolean;
  theme?: SnackbarTheme;
  onDismiss: VoidFunction;
};

const Snackbar: FC<Props> = ({ children, isVisible, theme = SnackbarTheme.info, onDismiss }) => {
  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    hidden: { opacity: 0, y: 20, transition: { duration: 0.1 } },
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      onDismiss();
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  return (
    <Portal id="snackbar-portal">
      <AnimatePresence>
        {isVisible && (
          <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants}>
            <div className={`${s.snackbar} ${s[theme]}`}>
              <div className={s.snackbar__content}>
                {theme === 'success' && <SmileIcon className={s.snackbar__icon} />}
                {theme === 'info' && <InfoIcon className={s.snackbar__icon} />}
                {theme === 'error' && <ErrorIcon className={s.snackbar__icon} />}
                <p className={s.snackbar__text}>{children}</p>
                <button className={s.snackbar__button} onClick={onDismiss}>
                  <CloseIcon />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Snackbar;
