import { Medicine } from "../models/medicine";
import { Order } from "../models/order";
import { OrderItem } from "../models/order-item";
import { User } from "../models/user";

export interface EditState {
    mode: string;
    order: Order;
    items: OrderItem[];
    user: User;
}

export function isEditState(state: any): state is EditState {
    return state && state.mode === 'edit' && state.order && state.items;
}

export interface AddState {
    mode: string;
    medicines: Medicine[];
    users: User[];
}

export function isAddState(state: any): state is AddState {
    return state && state.mode === 'add' && state.medicines && state.users;
}

export interface ViewState {
    mode: string;
    order: Order;
    items: OrderItem[];
    user: User;
}

export function isViewState(state: any): state is ViewState {
    return state && state.mode === 'view' && state.order && state.items;
}