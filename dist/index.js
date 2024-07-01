var _a;
const readlineSync = require('readline-sync');
class displayPanel {
}
_a = displayPanel;
displayPanel.getPanel = (text) => {
    const panels = {
        box: 'Abrir Caja',
        home: 'volver al menu principal',
        sale: 'vender'
    };
    for (const panel in panels) {
        if (panels[panel] === text) {
            return panel;
        }
    }
};
displayPanel.home = () => {
    const menuPrincipal = ['Abrir Caja', 'Finalizar Operaciones', 'estado'];
    const primaryMenuIndex = readlineSync.keyInSelect(menuPrincipal);
    const panel = _a.getPanel(menuPrincipal[primaryMenuIndex]);
    return { panel, primaryMenuIndex };
};
displayPanel.box = () => {
    const boxMenu = ['vender', 'volver al menu principal'];
    const index = readlineSync.keyInSelect(boxMenu);
    const panel = _a.getPanel(boxMenu[index]);
    return { panel, index };
};
displayPanel.sale = (store, ventas) => {
    console.log('indicar datos');
    let value = 0;
    let key;
    const businessName = readlineSync.question('razon social: ');
    const rif = readlineSync.question('rif: J-');
    //select product
    const products = Object.keys(store);
    const indexProduct = readlineSync.keyInSelect(products);
    const product = products[indexProduct];
    //select amount
    value = readlineSync.question('Coloca la cantidad de unidades');
    const productsData = store[product];
    if (value > productsData.priceWholesale.min) {
        //enter sale
        const invoice = {
            razonSocial: businessName,
            rif: rif,
            producto: [products[indexProduct]],
            cantidad: value,
            precioUnidad: productsData.priceWholesale.price,
            total: productsData.priceWholesale.price * value
        };
        ventas.push(invoice);
        //create invoice
        console.log(`|${invoice.razonSocial}||\nJ-${invoice.rif}|\n${invoice.producto}\n${invoice.cantidad}\nC/U${invoice.precioUnidad}\nTOTAL : ${invoice.total}`);
        return { panel: 'home', index: 1 };
    }
    else if (value === 0) {
        console.log('La cantidad de unidades debe ser mayor que cero');
        return { panel: 'box', index: 1 };
    }
    const invoice = {
        razonSocial: businessName,
        rif: rif,
        producto: [products[indexProduct]],
        cantidad: value,
        precioUnidad: productsData.priceRetail,
        total: productsData.priceRetail * value
    };
    ventas.push(invoice);
    //create invoice
    console.log(`${invoice.razonSocial}\n ${invoice.rif} \n${invoice.producto}\n${invoice.cantidad}\n${invoice.precioUnidad}\n${invoice.total}`);
    return { panel: 'home', index: 1 };
};
function openBusiness() {
    const store = {
        refresco: { stock: 200, priceRetail: 12, priceWholesale: { price: 6, min: 6 } },
        malta: { stock: 100, priceRetail: 14, priceWholesale: { price: 8, min: 6 } }
    };
    const ventas = [];
    let panel = 'home';
    //box
    while (panel !== 'finalizar') {
        if (panel === 'sale') {
            panel = displayPanel[panel](store, ventas).panel;
        }
        else {
            panel = displayPanel[panel]().panel;
        }
    }
    return;
}
openBusiness();
