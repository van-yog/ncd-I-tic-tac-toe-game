import { PersistentVector } from "near-sdk-as";

/** 
 * Exporting a new class PlayerStep so it can be used outside of this file.
 */
@nearBindgen
export class PlayerStep {
  count: i32;
  constructor(count: i32) {
    this.count = count;
  }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const steps = new PersistentVector<PlayerStep>("m");
