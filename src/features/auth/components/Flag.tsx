interface FlagProps {
  code: string;
}

export default function Flag({ code }: FlagProps) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={24}
      height={16}
      alt=""
      className="h-4 w-6 shrink-0 rounded-[3px] border border-border-secondary object-cover"
    />
  );
}
