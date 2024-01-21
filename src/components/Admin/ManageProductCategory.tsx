import { Button, Card, CardActions, CardContent, CardHeader, Dialog, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Icon from '@mdi/react';
import React, { useEffect } from "react";
import { mdiDelete, mdiPencil, mdiPlus, mdiClose } from '@mdi/js';
import { useDispatch, useSelector } from "react-redux";
import { FileUploader } from "../../extensions/FileUploader";
import { IProductCategory } from "../../types/IProductCategory";
import { fetchProductCategoryStart, fetchProductCategorySuccess } from "../../redux/productCategoriesSlice";
import { addProductCategory, deleteProductCategory, fetchAllProductCategories, updateProductCategory } from "../../firebaseFunctions/productCategoryFunctions";


const ManageProductCategory = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const productCategories = useSelector((state: any) => state.productCategories.productCategories);
    const [currentItem, setCurrentItem] = React.useState({} as IProductCategory);

    useEffect(() => {
        dispatch(fetchProductCategoryStart());
        fetchAllProductCategories().then((productList) => {
            dispatch(fetchProductCategorySuccess(productList));
        });
    }, [dispatch]);

    function handleProductCategoryAddOrUpdate(productCategory: IProductCategory): void {
        console.log(productCategory);
        if (productCategory.id) {
            updateProductCategory(productCategory.id, productCategory);
            handleDialogClose(false);
        } else {
            addProductCategory(productCategory);
            handleDialogClose(false);
        }
    }

    function handleEditItem(productCategory: any) {
        setCurrentItem(productCategory);
        setOpen(true)
    }

    function handleDeleteItem(id: string) {
        deleteProductCategory(id);
        fetchAllProductCategories().then((productList) => {
            dispatch(fetchProductCategorySuccess(productList));
        });
    }

    function handleDialogClose(arg0: boolean): void {
        fetchAllProductCategories().then((productCategories) => {
            dispatch(fetchProductCategorySuccess(productCategories));
        });
        setCurrentItem({
            id: '',
            name: '',
            image: '',
        });
        setOpen(arg0);
    }

    return (
        <div>
            <Card>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                }}>
                    <CardHeader title='Manage Product Categories' />
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        <Icon path={mdiPlus} size={1} />
                        Add Product Category
                    </Button>
                </div>
                <CardContent>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell sx={{
                                    display: 'flex',
                                    // flexend
                                    justifyContent: 'flex-end',
                                    gap: '10px',
                                }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productCategories.map((productCategory: any) => (
                                <TableRow key={productCategory.id}>
                                    <TableCell>{productCategory.name}</TableCell>
                                    <TableCell sx={{
                                        display: 'flex',
                                        // flexend
                                        justifyContent: 'flex-end',
                                        gap: '10px',
                                    }}>
                                        <Button variant="contained" onClick={() => { handleEditItem(productCategory) }}>
                                            <Icon path={mdiPencil} size={1} />
                                        </Button>
                                        <Button variant="contained" onClick={() => { handleDeleteItem(productCategory.id) }}>
                                            <Icon path={mdiDelete} size={1} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Dialog open={open} onClose={() => handleDialogClose(false)}>
                <Card>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                    }}>
                        <CardHeader title='Add New Product Category' />
                        <IconButton onClick={() => handleDialogClose(false)}>
                            <Icon path={mdiClose} size={1} />
                        </IconButton>
                    </div>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={currentItem.name}
                                    onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">Front Image</Typography>
                                <FileUploader label="Front Image" onUploadSuccess={(url) => setCurrentItem(prev => ({ ...prev, image: url }))}
                                 hasImage={!!currentItem.image} imageUrl={currentItem.image} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">Back Image</Typography>
                                <FileUploader label="Back Image" onUploadSuccess={(url) => setCurrentItem(prev => ({ ...prev, backImage: url }))}
                                 hasImage={!!currentItem.backImage} imageUrl={currentItem.backImage} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={() => handleProductCategoryAddOrUpdate(currentItem)} fullWidth>
                            {currentItem.id ? 'Update' : 'Add'} Product Category
                        </Button>
                    </CardActions>
                </Card>
            </Dialog>
        </div>
    );
};

export default ManageProductCategory;