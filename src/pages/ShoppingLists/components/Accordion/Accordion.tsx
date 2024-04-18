import * as React from 'react';

import cn from 'classnames';

import { Button, ButtonTheme, Input, Spacing } from 'components';
import { Title } from 'components/Title';
import { ProductType } from 'entities/product';
import { useScreenType } from 'store';
import { SizeEnum } from 'typings/ui';
import { formatLocaleToLongDate } from 'utils/formatDate';
import { noop } from 'utils/noop';

import ChevronIcon from 'img/icons/chevron-icon.svg?react';
import PlusIcon from 'img/icons/plus.svg?react';

import { ListItem } from '../ListItem';

import s from './Accordion.module.scss';

type Props = {
  isOpenDefault?: boolean;
  name: string;
  products: ProductType[];
  purchaseDate: string;
};

const Accordion: React.FC<Props> = ({ isOpenDefault = false, name, products, purchaseDate }) => {
  const [isOpen, setIsOpen] = React.useState(isOpenDefault);
  const [newProduct, setNewProduct] = React.useState('');
  const [price, setPrice] = React.useState<number | ''>('');
  // const [products, setProducts] = React.useState<ProductType[]>(MOCK_PRODUCTS);

  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const handleHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  // const handleAddProduct = () => {
  //   if (newProduct.trim() !== '') {
  //     setProducts([...products, newProduct]);
  //     setNewProduct('');
  //   }
  // };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }

    // todo: correct
    setPrice(Number(e.target.value));
  };

  const editList = () => {
    console.log('editList');
  };

  const deleteList = () => {
    console.log('deleteList');
  };

  return (
    <div className={s.accordion}>
      <div className={s.header} onClick={handleHeaderClick}>
        <div className={s.listInfo}>
          <Title size="h2" className={s.title__text}>
            {name}
          </Title>
          <Spacing size={1.2} horizontal />
          <div className={s.date}>
            <span className={s.middot}>{<>&middot;</>}</span>
            <Spacing size={1.2} horizontal />
            {formatLocaleToLongDate(purchaseDate)}
          </div>
        </div>
        <ChevronIcon className={cn(s.icon, isOpen && s.icon_open)} />
      </div>

      {isOpen && (
        <div>
          <Spacing size={2} />
          <div className={s.inputs}>
            <Button
              icon={<PlusIcon />}
              onClick={noop}
              theme={ButtonTheme.text}
              aria-label="Добавить продукт"
              disabled={!newProduct || !price}
            />
            <Spacing size={isDesktop ? 1.6 : 0.6} horizontal />
            <div className={s.wrapper}>
              <Input
                className={s.nameInput}
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Название продукта"
                min={0}
              />
              <Input
                className={s.priceInput}
                value={price ?? ''}
                onChange={onChangePrice}
                placeholder="Цена"
                type="number"
              />
            </div>
          </div>
          <Spacing size={2} />
          <ul>
            {products.map((product, i) => (
              <React.Fragment key={product.id}>
                <ListItem name={product.name} completed={product.bought} price={product.price} />
                {i !== products.length - 1 && <Spacing size={1} />}
              </React.Fragment>
            ))}
          </ul>
          <Spacing size={isDesktop ? 2 : 1.4} />
          <div className={s.buttons}>
            <Button size={SizeEnum.s} onClick={editList}>
              Редактировать
            </Button>
            <Spacing size={1.4} horizontal />
            <Button size={SizeEnum.s} onClick={deleteList}>
              Удалить
            </Button>
          </div>
          <Spacing size={3} />
        </div>
      )}
    </div>
  );
};

export default React.memo(Accordion);
