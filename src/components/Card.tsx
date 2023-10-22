type Props = {
  title: string;
  typeName: string;
  nationName: string;
  nationIcon: string;
  level: number;
  description: string;
  icon: string;
};

export const Card = ({
  title,
  typeName,
  nationName,
  nationIcon,
  level,
  description,
  icon,
}: Props) => {
  return (
    <div className="w-60 h-80 p-4 text-center bg-slate-500">
      <img className="h-20 m-auto" src={icon} alt={title} />
      <h3 className="text-sm">type: {typeName}</h3>
      <div className="flex gap-2 justify-center">
        <img className="h-6" src={nationIcon} alt={nationName} />
        <div className="">{nationName}</div>
      </div>
      <div className="text-sm">Level: {level}</div>
      <div className="text-xs line-clamp-4">{description}</div>
    </div>
  );
};
