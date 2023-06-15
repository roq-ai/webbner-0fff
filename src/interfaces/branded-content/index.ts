import { UserInterface } from 'interfaces/user';
import { PerfumeInterface } from 'interfaces/perfume';
import { GetQueryInterface } from 'interfaces';

export interface BrandedContentInterface {
  id?: string;
  title: string;
  content: string;
  image?: string;
  marketing_manager_id: string;
  perfume_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  perfume?: PerfumeInterface;
  _count?: {};
}

export interface BrandedContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  image?: string;
  marketing_manager_id?: string;
  perfume_id?: string;
}
