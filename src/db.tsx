import Dexie, { Table } from "dexie";

export interface ShoppingItem {
  id?: number;
  name: string;
  quantity: number | "";
  numberPrice: number;
}

export class MySubClassedDexie extends Dexie {
  shoppingList!: Table<ShoppingItem>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      shoppingList: "++id, name, quantity, price",
    });
  }
}

const db = new MySubClassedDexie();
export default db;
