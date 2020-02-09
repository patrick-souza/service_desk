export type IOrderState = {
  readonly order: IOrder;
  readonly openDialog: boolean;
  readonly isLoading: boolean;
};

export type IOrder = {
  verify_unlock_channel: string;
  formatted_address: string;
  formatted_unlocked_at: string;
  formatted_created_at: string;
  tracking_link: string;
  card_code: number;
  order_number: string;
  created_at: string;
  unlocked_at: string;
  unlock_channel: string;
  end_customer: {
    shipping_address: string;
    shipping_number: string;
    shipping_additional: string;
    shipping_quarter: string;
    shipping_city: string;
    shipping_zip_code: string;
    shipping_state: string;
    shipping_state_code: string;
    shipping_country: string;
  };
  shipment_order_volume: IShipmentOrderVolume[];
};

export type IShipmentOrderVolume = {
  shipment_order_id: number;
  shipment_order_volume_state: string;
  shipment_order_volume_state_history: string[];
};

export const OrderActionTypes = {
  FETCH: '@@order/FETCH_ORDER',
  FETCH_SUCCESS: '@@order/FETCH_ORDER_SUCCESS',
  FETCH_ERROR: '@@order/FETCH_ORDER_ERROR',
  SHOW_DIALOG: '@@order/SHOW_DIALOG',
  HIDE_DIALOG: '@@order/HIDE_DIALOG',
};
