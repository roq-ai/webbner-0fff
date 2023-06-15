import { UserInterface } from 'interfaces/user';
import { PerfumeInterface } from 'interfaces/perfume';
import { GetQueryInterface } from 'interfaces';

export interface EndCustomerPreferenceInterface {
  id?: string;
  preference_data: string;
  end_customer_id: string;
  perfume_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  perfume?: PerfumeInterface;
  _count?: {};
}

export interface EndCustomerPreferenceGetQueryInterface extends GetQueryInterface {
  id?: string;
  preference_data?: string;
  end_customer_id?: string;
  perfume_id?: string;
}
