import { Group } from 'entities/group';
import { DefaultId } from 'typings/api';

import BathIcon from 'img/categories/bath.svg?react';
import CartIcon from 'img/categories/cart.svg?react';
import KitchenSetIcon from 'img/categories/kitchen-set.svg?react';
import OtherIcon from 'img/categories/other.svg?react';
import PawIcon from 'img/categories/paw.svg?react';
import SoapIcon from 'img/categories/soap.svg?react';
import SprayBottleIcon from 'img/categories/spray-bottle.svg?react';
import TshirtIcon from 'img/categories/tshirt.svg?react';
import WashingMachineIcon from 'img/categories/washing-machine.svg?react';
import BroomIcon from 'img/choreCategories/broom.svg?react';
import FlaskIcon from 'img/choreCategories/flask.svg?react';
import OnigiriIcon from 'img/choreCategories/onigiri.svg?react';
import OvenIcon from 'img/choreCategories/oven.svg?react';
import PlantIcon from 'img/choreCategories/plant.svg?react';
import PotIcon from 'img/choreCategories/pot.svg?react';
import ToiletIcon from 'img/choreCategories/toilet.svg?react';
import TrashIcon from 'img/choreCategories/trash.svg?react';

export type Chore = {
  id: DefaultId;
  name: string;
  points: number;
  isArchived: boolean;
  categoryId: ChoreCategory['id'];
  groupId: Group['id'];
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
