import Dexie, { Table } from "dexie";

export interface ShoppingItem {
  id?: number;
  name: string;
  category: string;
  numQuantity: number;
  numPrice: number;
}

export class MySubClassedDexie extends Dexie {
  shoppingList!: Table<ShoppingItem>;

  constructor() {
    super("myDatabase");
    this.version(2).stores({
      shoppingList: "++id, name, category, quantity, price",
    });
  }
}

const db = new MySubClassedDexie();
export default db;
