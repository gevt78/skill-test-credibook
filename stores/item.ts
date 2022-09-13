import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';

export const initialItem = {
  itemList: [],
};

export const initialItemDetail = {
  itemDetail: {},
};

class ItemStore {
  itemList = [];
  itemDetail = {}

  constructor(initialData = initialItem) {
    this.itemList = initialData.itemList;
    makeObservable(this, {
      itemList: observable,
      itemDetail: observable,
      getItemList: action,
      getItemDetail: action,
    });
  }

  getItemList = async () => {
    await axios.get('https://bobsburgers-api.herokuapp.com/characters/?limit=100')
      .then((response) => {
        this.itemList = response.data;
      })
      .catch((response) => {
        console.error(response);
      });
  };

  getItemDetail = async (id: number) => {
    await axios.get(`https://bobsburgers-api.herokuapp.com/characters/${id}`)
      .then((response) => {
        this.itemDetail = response.data;
      })
      .catch((response) => {
        console.error(response);
      });
  };
}

export default ItemStore;
