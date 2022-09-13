import { enableStaticRendering } from 'mobx-react-lite';
import ItemStore, { initialItem, initialItemDetail } from './item';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let store: RootStore | null = null;

const initialRoot = {
  ItemStore: initialItem || initialItemDetail,
};

export class RootStore {
  ItemStore: ItemStore;

  constructor(initialData = initialRoot) {
    this.ItemStore = new ItemStore(initialData.ItemStore);
  }
}

const initializeStore = (initialData = initialRoot) => {
  if (isServer) {
    return new RootStore(initialData);
  }
  if (store === null) {
    store = new RootStore(initialData);
  }
  return store;
};

export default initializeStore;
