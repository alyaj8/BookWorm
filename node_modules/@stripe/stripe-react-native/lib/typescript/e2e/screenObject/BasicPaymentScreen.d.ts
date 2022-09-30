declare class BasicPaymentScreen {
    pay({ email, bankName, iban, buttonText, }: {
        email: string;
        bankName?: string;
        iban?: string;
        buttonText?: string;
    }): void;
    authorize({ elementType, pause }?: {
        elementType?: string | undefined;
        pause?: number | undefined;
    }): void;
    checkStatus(status?: string): void;
    authorizeACH(): void;
}
export declare function getAllWebviewContexts(): string[];
declare const _default: BasicPaymentScreen;
export default _default;
