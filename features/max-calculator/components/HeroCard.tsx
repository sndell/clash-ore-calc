import { HeroEquipment } from './HeroEquipment';

type Props = {
  equipment: Equipment[];
  title: string;
};

export const HeroCard = ({ equipment, title }: Props) => {
  return (
    <div className="relative w-full border divide-y backdrop-blur-xl h-fit bg-primary divide-primary rounded-2xl border-primary ">
      <div className="p-3 text-sm text-center text-primary-dark center-text">{title}</div>
      {equipment.map((item) => (
        <HeroEquipment key={item.name} {...item} />
      ))}
    </div>
  );
};
