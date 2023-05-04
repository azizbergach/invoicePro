import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import AddPopup from 'src/layouts/dashboard/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Store } from 'src/utils/store';
import { useSnackbar } from 'notistack';
import { ProductsTable } from 'src/sections/products/products-table';
import FilterProducts from 'src/sections/products/product-filter';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';



const data = [
    {
        id: '1xx27ofrn8',
        name: 'Ms. Angel Dach',
        category: 'Home Appliances',
        sku: '116560',
        price: 31.24,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 39,
        options: [
            { name: 'color', variants: [{ name: 28, price: 52.51 }, { name: 'violet', price: 73.47 }] }, { name: 'size', variants: [{ name: 20, price: 33.86 }, { name: 70, price: 87.15 }] },

        ],
        productNumber: 1,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    }, {
        id: '9b4pylceyx',
        name: 'Victoria Gulgowski',
        category: 'Electronics',
        sku: '181946',
        price: 90.41,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 51,
        options: [
            { name: 'color', variants: [{ name: 18, price: 85.49 }, { name: 'violet', price: 96.86 }] }, { name: 'size', variants: [{ name: 74, price: 36.66 }, { name: 49, price: 94.27 }] },

        ],
        productNumber: 3,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'tbmh6flfhf',
        name: 'Terry Hamill',
        category: 'Furniture',
        sku: '123868',
        price: 72.65,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 37,
        options: [
            { name: 'color', variants: [{ name: 10, price: 27.56 }, { name: 'tan', price: 87.54 }] }, { name: 'size', variants: [{ name: 81, price: 80.56 }, { name: 88, price: 38.94 }] },

        ],
        productNumber: 5,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: '9hjp8whml1',
        name: 'Miss Sean DuBuque',
        category: 'Beauty Products',
        sku: '131061',
        price: 83.56,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 14,
        options: [
            { name: 'color', variants: [{ name: 29, price: 38.64 }, { name: 'pink', price: 96 }] }, { name: 'size', variants: [{ name: 74, price: 42.87 }, { name: 99, price: 87.08 }] },

        ],
        productNumber: 7,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: '00elw3bs2u',
        name: 'Dr. Diana Dickens',
        category: 'Books',
        sku: '102672',
        price: 95.62,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 78,
        options: [
            { name: 'color', variants: [{ name: 88, price: 75.99 }, { name: 'grey', price: 23.29 }] }, { name: 'size', variants: [{ name: 81, price: 77.87 }, { name: 68, price: 20.47 }] },

        ],
        productNumber: 9,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: '4pxy9ty6hp',
        name: 'Dawn Smitham',
        category: 'Toys and Games',
        sku: '112986',
        price: 13.32,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 96,
        options: [
            { name: 'color', variants: [{ name: 10, price: 26.56 }, { name: 'lime', price: 46.73 }] }, { name: 'size', variants: [{ name: 61, price: 15.21 }, { name: 46, price: 52.15 }] },

        ],
        productNumber: 11,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'gj36y10hsq',
        name: 'Juanita O\'Hara',
        category: 'Furniture',
        sku: '161620',
        price: 29.11,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 35,
        options: [
            { name: 'color', variants: [{ name: 86, price: 44.25 }, { name: 'orange', price: 67 }] }, { name: 'size', variants: [{ name: 42, price: 67.54 }, { name: 86, price: 50.23 }] },

        ],
        productNumber: 13,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: '2s64p9z60z',
        name: 'Katherine Koch',
        category: 'Clothing',
        sku: '139175',
        price: 84.4,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 38,
        options: [
            { name: 'color', variants: [{ name: 49, price: 65.64 }, { name: 'orchid', price: 14.97 }] }, { name: 'size', variants: [{ name: 57, price: 74.98 }, { name: 93, price: 54.48 }] },

        ],
        productNumber: 15,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'mf5nlkrxyp',
        name: 'Jamie Dibbert',
        category: 'Pet Supplies',
        sku: '160321',
        price: 60.01,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 98,
        options: [
            { name: 'color', variants: [{ name: 29, price: 53.11 }, { name: 'white', price: 68.76 }] }, { name: 'size', variants: [{ name: 60, price: 49.62 }, { name: 13, price: 77.79 }] },

        ],
        productNumber: 17,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'k4fozk9y4n',
        name: 'Terry Berge MD',
        category: 'Pet Supplies',
        sku: '109365',
        price: 40.35,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 89,
        options: [
            { name: 'color', variants: [{ name: 24, price: 83.62 }, { name: 'orange', price: 10.02 }] }, { name: 'size', variants: [{ name: 28, price: 82.77 }, { name: 31, price: 10.25 }] },

        ],
        productNumber: 19,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'uuqv516rv0',
        name: 'Mr. Anna Schuster',
        category: 'Books',
        sku: '140516',
        price: 89.56,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 79,
        options: [
            { name: 'color', variants: [{ name: 97, price: 15.12 }, { name: 'teal', price: 49.07 }] }, { name: 'size', variants: [{ name: 52, price: 14.54 }, { name: 72, price: 13.95 }] },

        ],
        productNumber: 21,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: '4ucpv14oud',
        name: 'Shari Lueilwitz',
        category: 'Clothing',
        sku: '181841',
        price: 84.36,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 85,
        options: [
            { name: 'color', variants: [{ name: 37, price: 20.61 }, { name: 'silver', price: 61.88 }] }, { name: 'size', variants: [{ name: 68, price: 77.29 }, { name: 25, price: 77.07 }] },

        ],
        productNumber: 23,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'kbtnk3jl3i',
        name: 'Sherri Satterfield',
        category: 'Electronics',
        sku: '109631',
        price: 88.08,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 14,
        options: [
            { name: 'color', variants: [{ name: 58, price: 13.82 }, { name: 'grey', price: 21.24 }] }, { name: 'size', variants: [{ name: 80, price: 40.36 }, { name: 40, price: 39.84 }] },

        ],
        productNumber: 25,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'gntyse1j6u',
        name: 'Ms. Edith Lesch',
        category: 'Pet Supplies',
        sku: '114542',
        price: 71.16,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 78,
        options: [
            { name: 'color', variants: [{ name: 69, price: 97.84 }, { name: 'azure', price: 17.18 }] }, { name: 'size', variants: [{ name: 36, price: 33.15 }, { name: 25, price: 28.52 }] },

        ],
        productNumber: 27,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'ml9ucxftki',
        name: 'Cary Connelly',
        category: 'Electronics',
        sku: '152190',
        price: 17.15,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 35,
        options: [
            { name: 'color', variants: [{ name: 80, price: 34.76 }, { name: 'blue', price: 63.6 }] }, { name: 'size', variants: [{ name: 95, price: 15.98 }, { name: 29, price: 81.72 }] },

        ],
        productNumber: 29,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: '3bqj1ztnej',
        name: 'Woodrow Considine',
        category: 'Toys and Games',
        sku: '167700',
        price: 63.84,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 45,
        options: [
            { name: 'color', variants: [{ name: 98, price: 33.15 }, { name: 'red', price: 52.16 }] }, { name: 'size', variants: [{ name: 57, price: 29.97 }, { name: 53, price: 39.53 }] },

        ],
        productNumber: 31,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'v09qqyluxo',
        name: 'Vera Thompson MD',
        category: 'Toys and Games',
        sku: '136174',
        price: 11.84,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 100,
        options: [
            { name: 'color', variants: [{ name: 35, price: 64.2 }, { name: 'mint green', price: 88.32 }] }, { name: 'size', variants: [{ name: 53, price: 65.51 }, { name: 14, price: 83.02 }] },

        ],
        productNumber: 33,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'aezvvj2w5t',
        name: 'Jacquelyn Swaniawski',
        category: 'Beauty Products',
        sku: '170115',
        price: 90.05,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 26,
        options: [
            { name: 'color', variants: [{ name: 74, price: 66.52 }, { name: 'azure', price: 95.18 }] }, { name: 'size', variants: [{ name: 75, price: 65.26 }, { name: 86, price: 75.76 }] },

        ],
        productNumber: 35,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: '4bw64mqqvz',
        name: 'Kristopher Gerlach',
        category: 'Furniture',
        sku: '178124',
        price: 78.94,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 11,
        options: [
            { name: 'color', variants: [{ name: 78, price: 82.05 }, { name: 'turquoise', price: 26.87 }] }, { name: 'size', variants: [{ name: 30, price: 73.41 }, { name: 95, price: 46.43 }] },

        ],
        productNumber: 37,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'uynrh0dhjc',
        name: 'Miss Kristi Gleason',
        category: 'Books',
        sku: '186159',
        price: 79.34,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 81,
        options: [
            { name: 'color', variants: [{ name: 10, price: 17.28 }, { name: 'orange', price: 85.51 }] }, { name: 'size', variants: [{ name: 84, price: 64.01 }, { name: 51, price: 32.88 }] },

        ],
        productNumber: 39,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'a2ogy0k5md',
        name: 'Kristopher Thompson',
        category: 'Toys and Games',
        sku: '177570',
        price: 11.33,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 86,
        options: [
            { name: 'color', variants: [{ name: 60, price: 11.99 }, { name: 'azure', price: 29.08 }] }, { name: 'size', variants: [{ name: 77, price: 11.73 }, { name: 44, price: 51.05 }] },

        ],
        productNumber: 41,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: '89cxeee0b3',
        name: 'Phyllis Macejkovic',
        category: 'Food and Beverage',
        sku: '100230',
        price: 84.89,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 37,
        options: [
            { name: 'color', variants: [{ name: 71, price: 90.49 }, { name: 'cyan', price: 26.52 }] }, { name: 'size', variants: [{ name: 99, price: 47.82 }, { name: 46, price: 58.4 }] },

        ],
        productNumber: 43,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'k1rlfkdumi',
        name: 'Dr. Benny Renner',
        category: 'Toys and Games',
        sku: '107284',
        price: 13.72,
        status: 'rupture de stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 43,
        options: [
            { name: 'color', variants: [{ name: 35, price: 10.85 }, { name: 'tan', price: 10.65 }] }, { name: 'size', variants: [{ name: 95, price: 84.89 }, { name: 69, price: 62.67 }] },

        ],
        productNumber: 45,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'aijtmo9j16',
        name: 'Nicolas Dare',
        category: 'Furniture',
        sku: '113179',
        price: 21.97,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 24,
        options: [
            { name: 'color', variants: [{ name: 17, price: 61.81 }, { name: 'salmon', price: 70.04 }] }, { name: 'size', variants: [{ name: 74, price: 30.37 }, { name: 91, price: 64.69 }] },

        ],
        productNumber: 47,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
    {
        id: 'efqiyickux',
        name: 'Dr. Edmond Pacocha',
        category: 'Toys and Games',
        sku: '137213',
        price: 24.9,
        status: 'en stock',
        image: 'https://loremflickr.com/640/480/fashion',
        quantity: 65,
        options: [
            { name: 'color', variants: [{ name: 23, price: 64.39 }, { name: 'ivory', price: 51.47 }] }, { name: 'size', variants: [{ name: 74, price: 26.68 }, { name: 71, price: 77.02 }] },

        ],
        productNumber: 49,
        createdAt: new Date('2023-05-02T22:05:14.000Z')
    },
];


const useProducts = (productData, page, rowsPerPage) => {
    return useMemo(
        () => {
            return applyPagination(productData, page, rowsPerPage);
        },
        [page, rowsPerPage, productData]
    );
};

const useProductIds = (products) => {
    return useMemo(
        () => {
            return products.map((product) => product.id);
        }, [products])
};



const Page = () => {

    const { state, dispatch } = useContext(Store);
    const [productData, setProductData] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const products = useProducts(productData, page, rowsPerPage);
    const productsIds = useProductIds(products);
    const productsSelection = useSelection(productsIds);
    const [showAdd, setShowAdd] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [buttons, setButtons] = useState(["Cancel", "Save"]);
    const [title, setTitle] = useState("Add New Product");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const initialValues = {
        name: '',
        category: '',
        sku: '',
        price: '',
        status: '',
        image: '',
        quantity: 0,
        options: [
            { name: '', variants: [{ name: '', price: null }, { name: '', price: null }] }
        ],
        submit: null
    }

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(event.target.value);
        },
        []
    );


    const add = async (values) => {
        try {
            const { data } = await axios.post('/api/create', {
                table: "product",
                ...values
            });
            setProductData(prev => [...prev, data]);
            dispatch({
                type: "CREATE_PRODUCT",
                data
            });
            enqueueSnackbar(`${data.name} was added successfuly`, { variant: "success" });

            setShowAdd(false);
        } catch (err) {
            enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
        }
    }


    const update = async (values) => {

        try {
            const { data } = await axios.post('/api/update', {
                table: "product",
                where: {
                    id: values.id
                },
                data: values
            });

            setProductData(prev => prev.map(product => { return (product.id === id) ? data : product }));

            dispatch({
                type: "UPDATE_PRODUCT",
                data
            })

            enqueueSnackbar(`${data.name} was updated successfuly`, { variant: "success" });

            setShowAdd(false);
        } catch (err) {
            enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
        }
    }

    const uploadImage = async (values) => {
        const formData = new FormData();
        console.log("run");
        formData.append("image", values.image);
        try {
            const { data } = await axios.post('/api/upload-image', formData);
            console.log(data);
            values.image = data.filePath;
            return values;
        } catch (err) {
            console.log(err.message);
            throw new Error('image upload failed')
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required(),
            category: Yup.string().required(),
            sku: Yup.string().required(),
            price: Yup.number().required(),
            image: Yup.mixed().required(),
            quantity: Yup.number().required(),
            options: Yup.array().of(
                Yup.object({
                    name: Yup.string().required(),
                    variants: Yup.array().of(
                        Yup.object({
                            name: Yup.string().required(),
                            price: Yup.number().required()
                        })
                    )
                })
            ),
        }),
        onSubmit: (values) => {

            uploadImage(values).then(async values => {
                try {
                    const apiFunction = selectedId ? update : add;
                    await apiFunction(values);
                } catch (err) {
                    enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
                }
            }).catch(err => {
                enqueueSnackbar(err.message, { variant: "error" });
            })

        }
    });


    const handleSubmit = (e) => {
        closeSnackbar();
        formik.handleSubmit();
        e.preventDefault();
    }


    const Fields = [
        {
            name: "stack",
            childs: [
                {
                    label: "image de Produit",
                    name: "image"
                },
                {
                    name: "stack",
                    childs: [
                        {
                            label: "Nom de Produit",
                            name: "name"
                        },
                        {
                            label: "Category",
                            name: "category",
                            options: ["Electronics", "Clothing", "Home Appliances", "Beauty Products", "Books", "Toys and Games", "Sporting Goods", "Pet Supplies", "Furniture", "Food and Beverage"],
                        }
                    ],
                    addedProps: {
                        direction: "column"
                    }
                }
            ]
        },
        {
            name: "stack",
            addedProps: { justifyContent: "space-around" },
            childs: [
                {
                    label: "Prix",
                    name: "price",
                    currency: "DH"
                },
                {
                    label: "Quantity",
                    name: "quantity"
                }
            ]
        },
        {
            name: "stack",
            addedProps: { direction: "column" },
            childs: [
                {
                    label: "Option Name",
                    name: "options",
                }
            ]
        }
    ]

    const ADDProps = {
        handleSubmit,
        buttons,
        open: showAdd,
        title,
        setOpen: setShowAdd,
        Fields,
        formik
    }

    const handleEdit = async (product) => {
        setShowAdd(true);
        setSelectedId(product.id);
        formik.setValues(product, false);
        setButtons(["Discard", "Update"]);
        setTitle("Update Product Info");
    }

    const handleDeleteMany = async (selected) => {
        try {
            const { data } = await axios.post('/api/deleteMany', {
                table: "product",
                idsToDelete: selected
            })
            dispatch({ action: 'PRODUCT_DELETE_MANY', data });

            setProductData(prev => prev.filter(c => !selected.includes(c.id)))

        } catch (error) {
            console.log(error);
        }
    }

    const filterProductsProps = {
        setProductData,
        data,
        selected: productsSelection.selected,
        handleDeleteMany: handleDeleteMany
    }

    const CapitalCalc = () => {
        const capital = data.reduce((a, b) => (b.status === "en stock") ? a + b.price : a, 0);
        return `${capital}DH`
    }

    return (
        <>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Products
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowUpOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Import
                                    </Button>
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowDownOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Export
                                    </Button>
                                </Stack>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={() => { setShowAdd(prev => !prev); setSelectedId(null); setButtons(["Cancel", "Save"]); setTitle("Add New Product") }}
                                >
                                    Add
                                </Button>
                            </div>
                            <AddPopup {...ADDProps} />
                        </Stack>
                        <Stack direction="row" >
                            <OverviewBudget {...{ difference: 5, positive: true, sx: {}, value: CapitalCalc(), title: "CAPITAL EN STOCK" }} />
                            <OverviewBudget {...{ difference: 10, positive: false, sx: {}, value: data.filter(p => p.status === "en stock").length, title: "PRODUITS EN STOCK", icon: <ShoppingBasketIcon />, backgroundColor: "success.main" }} />
                        </Stack>
                        <FilterProducts {...filterProductsProps} />
                        <ProductsTable
                            count={data.length}
                            items={products}
                            onDeselectAll={productsSelection.handleDeselectAll}
                            onDeselectOne={productsSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={productsSelection.handleSelectAll}
                            onSelectOne={productsSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={productsSelection.selected}
                            handleEdit={handleEdit}
                            setProductData={setProductData}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);


/* export async function getStaticProps() {
  const res = await prisma.product.findMany();
  const data = JSON.parse(JSON.stringify(res));
  return {
    props: { data }
  }
} */

export default Page;