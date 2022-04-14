import {
  Box,
  createStyles,
  Group,
  MantineColor,
  Text,
  ThemeIcon,
  ThemeIconVariant,
  UnstyledButton,
} from '@mantine/core';
import { ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useStore from '@/state/store';

const useStyles = createStyles<
  'sectionStyle' | 'buttonStyle',
  { active: boolean | undefined }
>((theme, params) => ({
  sectionStyle: {
    marginBottom: '5px',
    ':last-child': { margin: 0 },
  },
  buttonStyle: {
    width: '100%',
    padding: '9px',
    borderRadius: '4px',
    background: params.active
      ? theme.colorScheme === 'light'
        ? 'rgb(239, 239, 239, 0.4)'
        : 'rgb(59,59,59, 0.4)'
      : undefined,
    ':hover': {
      background:
        theme.colorScheme === 'light' ? 'rgb(239, 239, 239)' : 'rgb(59,59,59)',
    },
    '&:not(:disabled):active': {
      transform: 'translateY(1px)',
    },
  },
}));

interface Props {
  onClick?: () => void;
  icon: ReactNode;
  match?: string;
  iconColor?: MantineColor;
  iconVariant?: ThemeIconVariant;
  title: string;
}

const Section = ({
  onClick,
  match,
  iconColor,
  iconVariant = 'light',
  icon,
  title,
}: Props) => {
  const { pathname } = useLocation();
  const close = useStore((s) => s.layout.close);
  const active = useMemo(
    () => (match ? pathname.startsWith(match) : false),
    [match, pathname],
  );
  const styles = useStyles({ active: active });

  return match ? (
    <Box to={match} className={styles.classes.sectionStyle} component={Link}>
      <UnstyledButton
        className={styles.classes.buttonStyle}
        onClick={() => {
          onClick && onClick();
          close();
        }}
      >
        <Group>
          <ThemeIcon color={iconColor} variant={iconVariant}>
            {icon}
          </ThemeIcon>
          <Text size={'sm'} weight={active ? 'bold' : 'normal'}>
            {title}
          </Text>
        </Group>
      </UnstyledButton>
    </Box>
  ) : (
    <UnstyledButton
      className={styles.classes.buttonStyle}
      onClick={() => {
        onClick && onClick();
        close();
      }}
    >
      <Group>
        <ThemeIcon color={iconColor} variant={iconVariant}>
          {icon}
        </ThemeIcon>
        <Text size={'sm'} weight={active ? 'bold' : 'normal'}>
          {title}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

export default Section;
