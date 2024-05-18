import * as React from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button, ButtonTheme, Input, Spacing, Spinner } from 'components';
import { ModalEnum } from 'components/modals';
import { Title } from 'components/Title';
import { Product } from 'entities/product';
import { ShoppingList } from 'entities/shoppingList';
import { useLocalStore } from 'hooks/useLocalStore';
import { useScreenType } from 'store';
import { ProductsStore } from 'store/locals';
import { useRootStore, useUIStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';
import { formatLocaleToLongDate } from 'utils/formatDate';

import ChevronIcon from 'img/icons/chevron-icon.svg?react';
import PlusIcon from 'img/icons/plus.svg?react';

import { ListItem } from '../ListItem';

import s from './Accordion.module.scss';

type Props = {
  id: ShoppingList['id'];
  isOpenDefault?: boolean;
  name: ShoppingList['name'];
  purchaseDate: ShoppingList['purchaseDate'];
};

const Accordion: React.FC<Props> = ({ id, isOpenDefault = false, name, purchaseDate }) => {
  const { openModal } = useUIStore();

  const rootStore = useRootStore();
  const productsStore = useLocalStore(() => new ProductsStore(rootStore, id));

  const [isOpen, setIsOpen] = React.useState(isOpenDefault);
  const [newProduct, setNewProduct] = React.useState('');
  const [price, setPrice] = React.useState<number | ''>('');

  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const handleHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    productsStore.getProducts();
  }, [productsStore]);

  const handleAddProduct = async () => {
    if (newProduct.trim() !== '') {
      await productsStore.createProduct({ name: newProduct, price: price ? price : null });
      setNewProduct('');
      setPrice('');
    }
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }

    // todo: correct
    setPrice(Number(e.target.value));
  };

  const onOpenModal = (modal: ModalEnum) => () => {
    openModal(modal, { listId: id });
  };

  const handleDeleteListItem =
    (id: Product['id']) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      await productsStore.deleteProduct(id);
    };

  const onCheckedChange = (id: Product['id'], bought: Product['bought']) => async () => {
    const product = productsStore.products.find((p) => p.id === id);

    if (!product) {
      return;
    }

    await productsStore.editProduct({ listItemId: id, bought: !bought });
  };

  return (
    <div className={s.accordion}>
      <div className={s.header} onClick={handleHeaderClick}>
        <div className={s.listInfo}>
          <Title size="h2" className={s.title__text}>
            {name}
          </Title>
          {purchaseDate && (
            <>
              <Spacing size={1.2} horizontal />
              <div className={s.date}>
                <span className={s.middot}>{<>&middot;</>}</span>
                <Spacing size={1.2} horizontal />
                {formatLocaleToLongDate(purchaseDate)}
              </div>
            </>
          )}
        </div>
        <ChevronIcon className={cn(s.icon, isOpen && s.icon_open)} />
      </div>

      {isOpen && (
        <div>
          <Spacing size={2} />
          <div className={s.inputs}>
            <Button
              icon={<PlusIcon />}
              onClick={handleAddProduct}
              theme={ButtonTheme.text}
              aria-label="Добавить продукт"
              disabled={!newProduct}
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
            {productsStore.meta.getProducts.loading && <Spinner />}
            {productsStore.products.map((product, i) => (
              <React.Fragment key={product.id}>
                <ListItem
                  name={product.name}
                  completed={product.bought}
                  price={product.price}
                  onDelete={handleDeleteListItem(product.id)}
                  onCheckedChange={onCheckedChange(product.id, product.bought)}
                />
                {i !== productsStore.products.length - 1 && <Spacing size={1} />}
              </React.Fragment>
            ))}
          </ul>
          <Spacing size={isDesktop ? 2 : 1.4} />
          <div className={s.buttons}>
            <Button size={SizeEnum.s} onClick={onOpenModal(ModalEnum.shoppingListEdit)}>
              Редактировать
            </Button>
            <Spacing size={1.4} horizontal />
            <Button size={SizeEnum.s} onClick={onOpenModal(ModalEnum.shoppingListDelete)}>
              Удалить
            </Button>
          </div>
          <Spacing size={3} />
        </div>
      )}
    </div>
  );
};

export default observer(Accordion);
