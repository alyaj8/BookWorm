import type { PaymentMethod } from '../types';
/**
 * useConfirmPayment hook
 */
export declare function useConfirmPayment(): {
    confirmPayment: (paymentIntentClientSecret: string, data: PaymentMethod.ConfirmParams, options?: PaymentMethod.ConfirmOptions) => Promise<import("../types").ConfirmPaymentResult>;
    loading: boolean;
};
