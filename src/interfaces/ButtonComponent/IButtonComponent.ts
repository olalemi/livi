export type Props = {
    buttonText: string;
    buttonBackgroundColor: string;
    buttonColor: string;
    showRightIcon?: boolean;
    showLeftIcon?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onRightIconClick?: () => void;
  };