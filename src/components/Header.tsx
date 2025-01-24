import React, { JSX } from 'react';
import styles from './Header.module.css';

export default function Header(): JSX.Element {

  return <>
    <header className={styles.header}>
      <h1 className={styles.firstWord}>
        Seminar <span className={styles.secondWord}>Registration</span>
      </h1>
    </header>
  </>;
}