import { BrandedContentInterface } from 'interfaces/branded-content';
import { EndCustomerPreferenceInterface } from 'interfaces/end-customer-preference';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PerfumeInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  designer_id: string;
  created_at?: any;
  updated_at?: any;
  branded_content?: BrandedContentInterface[];
  end_customer_preference?: EndCustomerPreferenceInterface[];
  user?: UserInterface;
  _count?: {
    branded_content?: number;
    end_customer_preference?: number;
  };
}

export interface PerfumeGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  designer_id?: string;
}
