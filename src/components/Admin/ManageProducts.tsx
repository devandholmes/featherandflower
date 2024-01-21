import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart, fetchProductsSuccess } from "../../redux/productSlice";
import { Autocomplete, Button, Card, CardActions, CardContent, CardHeader, Dialog, IconButton, List, ListItem, ListItemIcon, Menu, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import { IProduct } from "../../types/IProduct";
import { mdiDelete, mdiPencil, mdiPlus, mdiClose, mdiDotsVertical, mdiStarCircleOutline  } from '@mdi/js';
import Icon from '@mdi/react';
import { fetchAllProducts, addProduct, deleteProduct, updateProduct, featureProduct } from "../../firebaseFunctions/productFunctions";
import { FileUploader } from "../../extensions/FileUploader";
import { fetchProductCategoryStart, fetchProductCategorySuccess } from "../../redux/productCategoriesSlice";
import { IProductCategory } from "../../types/IProductCategory";
import { fetchAllProductCategories } from "../../firebaseFunctions/productCategoryFunctions";

const ManageProducts = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const [newProduct, setNewProduct] = React.useState<IProduct>({
        id: '',
        name: '',
        costPrice: '0', // Changed from price to costPrice
        sellingPrice: '0', // Added sellingPrice
        description: '',
        category: '',
        quantity: 0,
    });
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.products.products);
    const productCategories: IProductCategory[] = useSelector((state: any) => state.productCategories.productCategories);
    const loading = useSelector((state: any) => state.products.loading);
    const error = useSelector((state: any) => state.products.error);
    const [openNewProductDialog, setOpenNewProductDialog] = React.useState(false);

    const handleAddProduct = (product: any) => {
        product.id ? updateProduct(product.id, product) : addProduct(product);
        fetchAllProducts().then((productList) => {
            dispatch(fetchProductsSuccess(productList));
        });
        setOpenNewProductDialog(false);
    };

    const handleDeleteProduct = (id: string) => {
        deleteProduct(id);
        fetchAllProducts().then((productList) => {
            dispatch(fetchProductsSuccess(productList));
        }
        );
    };

    useEffect(() => {
        dispatch(fetchProductsStart());
        fetchAllProducts().then((productList) => {
            dispatch(fetchProductsSuccess(productList));
        });
        dispatch(fetchProductCategoryStart());
        fetchAllProductCategories().then((productCats) => {
            dispatch(fetchProductCategorySuccess(productCats));
        });
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    function handleFeatureProduct(id: string) {
        featureProduct(id);
        fetchAllProducts().then((productList) => {
            dispatch(fetchProductsSuccess(productList));
        });
    }

    function EditProduct(product: IProduct) {
        console.log(product);
        setNewProduct(product);
        setOpenNewProductDialog(true);
    }

    function handleDialogClose(arg0: boolean): void {
        fetchAllProducts().then((productList) => {
            dispatch(fetchProductsSuccess(productList));
        });
        setNewProduct({
            id: '',
            name: '',
            description: '',
            category: '',
            sellingPrice: '0',
            costPrice: '0',
            quantity: 0,
        });

        setOpenNewProductDialog(arg0);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Card>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                }}>
                    <CardHeader title='Manage Products' />
                    <Button variant="contained" onClick={() => setOpenNewProductDialog(true)}>
                        <Icon path={mdiPlus} size={1} />
                        Add Product
                    </Button>
                </div>
                <CardContent>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product: IProduct) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <TextField value={product.name} label="Name" disabled />
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={product.description} label="Description" disabled />
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={product.category} label="Category" disabled />
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={product.sellingPrice} label="Selling Price" disabled />
                                    </TableCell>
                                    <TableCell>
                                        <TextField value={product.costPrice} label="Cost Price" disabled />
                                    </TableCell>
                                    <TableCell>
                                        <List
                                            component="nav"
                                            sx={{
                                                bgcolor: 'background.paper',
                                                width: 40,
                                                height: 40,
                                                position: 'relative',
                                                maxHeight: 300,

                                            }}
                                        >
                                            <ListItem
                                                button
                                                id="lock-button"
                                                aria-haspopup="listbox"
                                                aria-controls="lock-menu"
                                                aria-label="when device is locked"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClickListItem}
                                            >
                                                <ListItemIcon>
                                                    <Icon path={mdiDotsVertical} size={1} />
                                                </ListItemIcon>
                                            </ListItem>
                                        </List>
                                        <Menu
                                            id="lock-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'lock-button',
                                                role: 'listbox',
                                            }}
                                        >
                                            <MenuItem>
                                                <Tooltip title="Edit">
                                                    <IconButton onClick={() => EditProduct(product)}>
                                                        <Icon path={mdiPencil} size={1} />
                                                    </IconButton>
                                                </Tooltip>
                                            </MenuItem>
                                            <MenuItem>
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                                                        <Icon path={mdiDelete} size={1} />
                                                    </IconButton>
                                                </Tooltip>
                                            </MenuItem>
                                            <MenuItem>
                                                <Tooltip title="Feature">
                                                    <IconButton onClick={() => handleFeatureProduct(product.id)}>
                                                        <Icon path={mdiStarCircleOutline} size={1} />
                                                    </IconButton>
                                                </Tooltip>
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Dialog
                open={openNewProductDialog}
                onClose={() => setOpenNewProductDialog(false)}
                TransitionProps={{
                    onExited: () => handleDialogClose(false),
                }}
            >
                <Card>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                    }}>
                        <CardHeader title='Add New Product' />
                        <IconButton onClick={() => handleDialogClose(false)}>
                            <Icon path={mdiClose} size={1} />
                        </IconButton>
                    </div>
                    <CardContent>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '10px',
                        }}>
                            <div style={{ flex: 1 }}>
                                <TextField
                                    style={{
                                        marginBottom: '10px',
                                    }}
                                    fullWidth
                                    label="Name"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                                <TextField
                                    style={{
                                        marginBottom: '10px',
                                    }}
                                    fullWidth
                                    label="Description"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                                <Autocomplete
                                    fullWidth
                                    options={productCategories}
                                    getOptionLabel={(option) => option.name}
                                    value={productCategories.find((cat) => cat.id === newProduct.category) || null}
                                    onChange={(event, newValue) => {
                                        setNewProduct({ ...newProduct, category: newValue ? newValue.id : '' });
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Category" />}
                                />
                                <TextField
                                    style={{
                                        marginTop: '10px',
                                    }}
                                    fullWidth
                                    label="Selling Price"
                                    value={newProduct.sellingPrice}
                                    onChange={(e) => setNewProduct({ ...newProduct, sellingPrice: e.target.value })}
                                />
                                <TextField
                                    style={{
                                        marginTop: '10px',
                                    }}
                                    fullWidth
                                    label="Cost Price"
                                    value={newProduct.costPrice}
                                    onChange={(e) => setNewProduct({ ...newProduct, costPrice: e.target.value })}
                                />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {newProduct.image && (
                                    <FileUploader onUploadSuccess={(url: string) => { newProduct.image = url }} hasImage={true} imageUrl={newProduct.image} />
                                )}
                                {!newProduct.image && (
                                    <FileUploader onUploadSuccess={(url: string) => { newProduct.image = url }} hasImage={false} />
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            onClick={() => handleAddProduct(newProduct)}
                            fullWidth
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddProduct(newProduct);
                                }
                                if (e.key === 'Escape') {
                                    handleDialogClose(false);
                                }
                            }}
                        >
                            <Icon path={mdiPlus} size={1} />
                            {newProduct.id ? 'Update' : 'Add'} Product
                        </Button>
                    </CardActions>
                </Card>
            </Dialog>

        </div>
    );
};

export default ManageProducts;
