const mapping: Record<string, string> = {
  'branded-contents': 'branded_content',
  'end-customer-preferences': 'end_customer_preference',
  organizations: 'organization',
  perfumes: 'perfume',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
