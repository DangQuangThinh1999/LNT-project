interface IconCopyProps {
  handleCopy: (textToCopy: string) => void;
  textToCopy: string;
}

export const IconCopy: React.FC<IconCopyProps> = ({
  handleCopy,
  textToCopy,
}) => (
  <img
    onClick={() => handleCopy(textToCopy)}
    height={24}
    className="image"
    width={24}
    src="/svg/copyCircle.svg"
    alt="copy"
  />
);
