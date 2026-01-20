interface Props {
  className?: string;
}

const Skeleton = ({ className }: Props) => (
  <div
    className={`
      animate-pulse
      bg-white/10
      rounded-lg
      ${className}
    `}
  />
);

export default Skeleton;
