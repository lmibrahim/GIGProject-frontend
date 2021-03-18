import { logging } from 'selenium-webdriver';

export interface Show {
  id: number;
  title: string;
  start: number;
  description: string;
  address: string;
  lat?: number;
  lng?: number;
  location?: [lat: number, lng: number];
  display?: boolean
  brand_safe?:boolean
}
