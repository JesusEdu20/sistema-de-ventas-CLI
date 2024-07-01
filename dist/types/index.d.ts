declare const readlineSync: any;
declare class displayPanel {
    static getPanel: (text: string) => string;
    static home: () => {
        panel: string;
        primaryMenuIndex: any;
    };
    static finish: () => {
        panel: string;
        index: number;
    };
    static box: () => {
        panel: string;
        index: any;
    };
    static state: (ventas: any) => {
        panel: string;
        index: any;
    };
    static sale: (store: any, ventas: any) => {
        panel: string;
        index: number;
    };
}
declare function openBusiness(): void;
