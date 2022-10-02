import Dexie, { Table } from "dexie";

export interface ShoppingList {
  id?: number;
  name: string;
  quantity: string;
  price: string;
}

export class MySubClassedDexie extends Dexie {
  shoppingList!: Table<ShoppingList>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      shoppingList: "++id, name, quantity, price",
    });
  }
}

const db = new MySubClassedDexie();
export default db;
