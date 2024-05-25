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

export type ExpenseCategory = {
  id: DefaultId;
  name: string;
  icon: ExpenseCategoryIcon | null;
  isArchived: boolean;
  groupId: Group['id'];
};

export const expenseCategoryIconsNames = [
  'other',
  'bath',
  'cart',
  'kitchenSet',
  'paw',
  'plant',
  'soap',
  'sprayBottle',
  'tshirt',
  'washingMachine',
] as const;

export type ExpenseCategoryIcon = (typeof expenseCategoryIconsNames)[number];

export const expenseCategoryIconsMap: Record<
  ExpenseCategoryIcon,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  other: OtherIcon,
  bath: BathIcon,
  cart: CartIcon,
  kitchenSet: KitchenSetIcon,
  paw: PawIcon,
  plant: TshirtIcon,
  soap: SoapIcon,
  sprayBottle: SprayBottleIcon,
  tshirt: TshirtIcon,
  washingMachine: WashingMachineIcon,
};
