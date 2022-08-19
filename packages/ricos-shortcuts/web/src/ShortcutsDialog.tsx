import type { FC, ReactElement } from 'react';
import React from 'react';
import { getApplicationKeyMap } from 'react-hotkeys';
import styles from './ShortcutsDialog.scss';

export const ShortcutsDialog: FC = () => {
  const keyMap = getApplicationKeyMap();
  return (
    <>
      <h2 className={styles.title}>Keyboard Shortcuts</h2>

      <table className={styles.keymapTable}>
        <tbody>
          {Object.keys(keyMap).reduce((memo, actionName) => {
            const { description, sequences, name } = keyMap[actionName];

            memo.push(
              <tr key={name || actionName}>
                <td className={styles.keymapTableCell}>
                  {sequences.map(({ sequence }) => (
                    <span key={sequence as string}>{sequence}</span>
                  ))}
                </td>
                <td className={styles.keymapTableCell}>{description}</td>
              </tr>
            );

            return memo;
          }, [] as ReactElement[])}
        </tbody>
      </table>
    </>
  );
};
