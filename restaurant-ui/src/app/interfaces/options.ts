export interface Option<V, D> {
    value: V;
    displayValue: D;
}

export interface MenuOption {
    itemName: string;
    onClickAction: (param: any) => void;
    isDefault?: boolean;
}