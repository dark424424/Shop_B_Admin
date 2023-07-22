export interface User {
  _id: string;
  location: {
    city: string;
    address: string;
  };
  username: string;
  email: string;
  isShipper: boolean;
  isAdmin: boolean;
  name: string;
}
