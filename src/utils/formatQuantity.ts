// src/utils/formatQuantity.ts

export function formatQuantity(quantity: number): string {
    if (quantity >= 1000) {
        return (quantity / 1000).toFixed(quantity % 1000 === 0 ? 0 : 1) + "K";
    }
    return quantity.toString();
}
