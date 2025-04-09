import crypto from "crypto-js";
import Cookies from "js-cookie";

const STORAGE_KEY = import.meta.env.VITE_APP_STORAGE_KEY;

if (!STORAGE_KEY) {
  console.error("VITE_APP_STORAGE_KEY is missing! Encryption may not work properly.");
}

export const storage = {
  encrypt<T>(data: T): string {
    try {
      if (!STORAGE_KEY) throw new Error("Missing encryption key");
      return crypto.AES.encrypt(JSON.stringify(data), STORAGE_KEY).toString();
    } catch (error) {
      console.error("Encryption failed:", error);
      return "";
    }
  },

  decrypt<T>(encryptedData: string): T | null {
    try {
      if (!STORAGE_KEY) throw new Error("Missing encryption key");
      const bytes = crypto.AES.decrypt(encryptedData, STORAGE_KEY);
      const decryptedText = bytes.toString(crypto.enc.Utf8);
      return decryptedText ? JSON.parse(decryptedText) : null;
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  },

  save<T>(key: string, value: T): void {
    try {
      const encryptedValue = this.encrypt(value);
      if (encryptedValue) localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error(`Failed to save key: ${key}`, error);
    }
  },

  get<T>(key: string): T | null {
    try {
      const encryptedValue = localStorage.getItem(key);
      return encryptedValue ? this.decrypt<T>(encryptedValue) : null;
    } catch (error) {
      console.error(`Failed to retrieve key: ${key}`, error);
      return null;
    }
  },

  update<T>(key: string, newValue: T): void {
    try {
      const existingValue = this.get<T>(key);
      const finalValue = newValue || existingValue;
      this.save(key, finalValue);
    } catch (error) {
      console.error(`Failed to update key: ${key}`, error);
    }
  },

  delete(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to delete key: ${key}`, error);
    }
  },

  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  },

  //=============================(Cookies)=============================//
  cookies_save<T>(key: string, value: T, options?: Cookies.CookieAttributes): void {
    try {
      const encryptedValue = this.encrypt(value);
      if (encryptedValue) Cookies.set(key, encryptedValue, options);
    } catch (error) {
      console.error(`Failed to save key: ${key}`, error);
    }
  },

  cookies_get<T>(key: string): T | null {
    try {
      const encryptedValue = Cookies.get(key);
      return encryptedValue ? this.decrypt<T>(encryptedValue) : null;
    } catch (error) {
      console.error(`Failed to retrieve key: ${key}`, error);
      return null;
    }
  },

  cookies_delete(key: string): void {
    try {
      Cookies.remove(key);
    } catch (error) {
      console.error(`Failed to delete key: ${key}`, error);
    }
  },

};