import BathIcon from 'img/choreCategories/bath.svg?react';
import BroomIcon from 'img/choreCategories/broom.svg?react';
import CartIcon from 'img/choreCategories/cart.svg?react';
import FlaskIcon from 'img/choreCategories/flask.svg?react';
import KitchenSetIcon from 'img/choreCategories/kitchen-set.svg?react';
import OnigiriIcon from 'img/choreCategories/onigiri.svg?react';
import OtherIcon from 'img/choreCategories/other.svg?react';
import OvenIcon from 'img/choreCategories/oven.svg?react';
import PawIcon from 'img/choreCategories/paw.svg?react';
import PlantIcon from 'img/choreCategories/plant.svg?react';
import PotIcon from 'img/choreCategories/pot.svg?react';
import SoapIcon from 'img/choreCategories/soap.svg?react';
import SprayBottleIcon from 'img/choreCategories/spray-bottle.svg?react';
import ToiletIcon from 'img/choreCategories/toilet.svg?react';
import TrashIcon from 'img/choreCategories/trash.svg?react';
import TshirtIcon from 'img/choreCategories/tshirt.svg?react';
import WashingMachineIcon from 'img/choreCategories/washing-machine.svg?react';

export type Chore = {
  id: number;
  name: string;
  points: number;
  isArchived: boolean;
  category: ChoreCategory;
  groupId: number;
};

export type ChoreCategory = {
  id: number;
  name: string;
  icon: ChoreCategoryIcon;
  isArchived: boolean;
};

export const choreCategoryIconsNames = [
  'other',
  'bath',
  'broom',
  'cart',
  'flask',
  'kitchenSet',
  'onigiri',
  'oven',
  'paw',
  'plant',
  'pot',
  'soap',
  'sprayBottle',
  'toilet',
  'trash',
  'tshirt',
  'washingMachine',
] as const;

export type ChoreCategoryIcon = (typeof choreCategoryIconsNames)[number];

export const choreCategoryIconsMap: Record<
  ChoreCategoryIcon,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  other: OtherIcon,
  bath: BathIcon,
  broom: BroomIcon,
  cart: CartIcon,
  flask: FlaskIcon,
  kitchenSet: KitchenSetIcon,
  onigiri: OnigiriIcon,
  oven: OvenIcon,
  paw: PawIcon,
  plant: PlantIcon,
  pot: PotIcon,
  soap: SoapIcon,
  sprayBottle: SprayBottleIcon,
  toilet: ToiletIcon,
  trash: TrashIcon,
  tshirt: TshirtIcon,
  washingMachine: WashingMachineIcon,
};
