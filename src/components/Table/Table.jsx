import React, { Component } from 'react';
// import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../ProductService/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './DataTableDemo.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { addToCart } from '../../redux/cart/CartActions';
import { connect } from 'react-redux';

class DataTableCrudDemo extends Component {
    emptyProduct = {
        id: null,
        name: this.props.name,
        image: this.props.image,
        length: null,
        width: null,
        quantity: null,
        price: this.props.price,
        mp: 0,
        cost: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: this.emptyProduct,
            selectedProducts: null,
            submitted: false,
            globalFilter: null
        };

        this.productService = new ProductService();
        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
        this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
        this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedProducts = this.deleteSelectedProducts.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.hideDeleteProductsDialog = this.hideDeleteProductsDialog.bind(this);
    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'RON' });
    }

    openNew() {
        this.setState({
            product: this.emptyProduct,
            submitted: false,
            productDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
        });
    }

    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }

    hideDeleteProductsDialog() {
        this.setState({ deleteProductsDialog: false });
    }

    saveProduct() {
        let state = { submitted: true };
        const idNew = this.getVal('#id');
        const nameNew = this.getVal('#name');
        if (nameNew.trim()) {
            let products = [...this.state.products];
            let product = { ...this.state.product };
            if (idNew) {
                const index = this.findIndexById(product.name, product.length, product.width);
                if (index !== -1) {
                    products[index] = {
                        ...product,
                        quantity: product.quantity + products[index].quantity,
                        mp: products[index].length * products[index].width * (product.quantity + products[index].quantity) / 1000000,
                        cost: products[index].price * (products[index].length * products[index].width * (product.quantity + products[index].quantity) / 1000000)
                    };
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                } else {
                    product.id = this.createId();
                    product.image = 'product-placeholder.svg';
                    product.mp = product.length * product.width * product.quantity / 1000000;
                    product.cost = product.price * product.length * product.width * product.quantity / 1000000
                    const newProd = { ...product, }
                    products.push(newProd);
                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }
            }
            state = {
                ...state,
                products,
                productDialog: false,
                product: this.emptyProduct
            };
            this.props.addToCart({
                product
            })
        }

        this.setState(state);
    }

    editProduct(product) {
        this.setState({
            product: { ...product },
            productDialog: true
        });
    }

    confirmDeleteProduct(product) {
        this.setState({
            product,
            deleteProductDialog: true
        });
    }

    deleteProduct() {
        let products = this.state.products.filter(val => val.id !== this.state.product.id);
        this.setState({
            products,
            deleteProductDialog: false,
            product: this.emptyProduct
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    findIndexById(name, length, width) {
        let index = -1;
        for (let i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].name === name && this.state.products[i].length === length && this.state.products[i].width === width) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    confirmDeleteSelected() {
        this.setState({ deleteProductsDialog: true });
    }

    deleteSelectedProducts() {
        let products = this.state.products.filter(val => !this.state.selectedProducts.includes(val));
        this.setState({
            products,
            deleteProductsDialog: false,
            selectedProducts: null
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    onCategoryChange(e) {
        let product = { ...this.state.product };
        product['category'] = e.value;
        this.setState({ product });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let product = { ...this.state.product };
        product[`${name}`] = val;

        this.setState({ product });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let product = { ...this.state.product };
        product[`${name}`] = val;

        this.setState({ product });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="NOU" icon="pi pi-plus" className="p-button-success fav-col mr-2" onClick={this.openNew} />
            </React.Fragment>
        )
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={this.importCSV} />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} /> */}
            </React.Fragment>
        )
    }

    imageBodyTemplate(rowData) {
        return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }

    priceBodyTemplate(rowData) {
        return this.formatCurrency(rowData.price);
    }

    ratingBodyTemplate(rowData) {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    statusBodyTemplate(rowData) {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 fav-col" onClick={() => this.editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning fav-col" onClick={() => this.confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    getVal(name) {
        const val = document.querySelector(name).value;
        if (val) {
            return val;
        } else {
            return 0;
        }
    };

    render() {
        this.emptyProduct.id = this.props.id
        this.emptyProduct.price = this.props.price
        this.emptyProduct.name = this.props.name
        this.emptyProduct.image = this.props.image
        const header = (
            <div className="table-header">
                <h5 className="mx-0 my-1">Gestionare Produse</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Anuleaza" icon="pi pi-times" className="fav-col" onClick={this.hideDialog} />
                <Button label="Adauga in cos" icon="pi pi-check" className="fav-col" onClick={this.saveProduct} />
            </React.Fragment>
        );
        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="Nu" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Da" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />
            </React.Fragment>
        );
        const deleteProductsDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedProducts} />
            </React.Fragment>
        );


        return (

            <div className="datatable-crud-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card container">
                    <Toolbar className="mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable className='row' ref={(el) => this.dt = el} value={this.props.products.filter((obj) => obj.name === this.props.name)} selection={this.state.selectedProducts} onSelectionChange={(e) => this.setState({ selectedProducts: e.value })}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Arata de la {first} la {last} din {totalRecords} pozitii"
                        globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '1rem' }} exportable={false}></Column>
                        <Column field="name" header="Denumire" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="length" header="Inaltime(mm)" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="width" header="Latime(mm)" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="quantity" header="Cantitate" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="price" header="Pret/mp" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="mp" header="MP" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="cost" header="Valoare" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.productDialog} style={{ width: '470px' }} header="Adauga dimensiuni produs" modal className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                    <div hidden={true} className="field">
                        <label htmlFor="id">Id</label>
                        <InputText id="id" readOnly={true} value={this.state.product.id} onChange={(e) => this.onInputChange(e, 'id')} />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Cod frezare</label>
                        <InputText id="name" readOnly={true} value={this.state.product.name} onChange={(e) => this.onInputChange(e, 'name')} />
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="length">Inaltime(mm)</label>
                            <InputNumber id="length" value={this.state.product.length} onValueChange={(e) => this.onInputNumberChange(e, 'length')} />
                        </div>
                        <div className="field col">
                            <label htmlFor="width">Latime(mm)</label>
                            <InputNumber id="width" value={this.state.product.width} onValueChange={(e) => this.onInputNumberChange(e, 'width')} />
                        </div>
                        <div className="field col">
                            <label htmlFor="quantity">Cantitate</label>
                            <InputNumber id="quantity" value={this.state.product.quantity} onValueChange={(e) => this.onInputNumberChange(e, 'quantity')} />
                        </div>
                        <div className="field col">
                            <label htmlFor="price">Pret</label>
                            <InputNumber id="price" readOnly={true} value={this.state.product.price} onValueChange={(e) => this.onInputNumberChange(e, 'price')} mode="currency" currency="RON" locale="en-US" />
                        </div>
                        <div className='d-flex flex-row'>
                            <div className="">
                                <label htmlFor="mp">MP</label>
                                <InputNumber id="mp" readOnly={true} value={this.state.product.length * this.state.product.width * this.state.product.quantity / 1000000} onValueChange={(e) => this.onInputNumberChange(e, 'mp')} />
                            </div>
                            <div className="">
                                <label htmlFor="cost">Valoare</label>
                                <InputNumber id="cost" readOnly={true} value={this.state.product.length * this.state.product.width * this.state.product.quantity * this.state.product.price / 1000000} onValueChange={(e) => this.onInputNumberChange(e, 'cost')} />
                            </div>
                        </div>

                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.product && <span>Esti sigur ca vrei sa stergi <b>{this.state.product.name}: {this.state.product.length} x {this.state.product.width}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={this.hideDeleteProductsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.product && <span>Are you sure you want to delete the selected products?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }


}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (product) => dispatch(addToCart(product))
    };
}

function mapStateToProps(state) {
    return {
        products: state.cart.products
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTableCrudDemo);
