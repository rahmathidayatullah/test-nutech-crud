let products = [
  {
    id: "product-1",
    name: "Pulpen",
    purchasePrice: 8000,
    sellingPrice: 10000,
    stock: 10,
    imageProduct: "",
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "product-2",
    name: "Buku",
    purchasePrice: 9000,
    sellingPrice: 29000,
    stock: 12,
    imageProduct: "",
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "product-3",
    name: "Lemari",
    purchasePrice: 4000,
    sellingPrice: 26000,
    stock: 4,
    imageProduct: "",
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "product-4",
    name: "Meja",
    purchasePrice: 20000,
    sellingPrice: 90000,
    stock: 20,
    imageProduct: "",
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "product-5",
    name: "Kursi",
    purchasePrice: 13000,
    sellingPrice: 15000,
    stock: 32,
    imageProduct: "",
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "product-6",
    name: "Jas",
    purchasePrice: 30000,
    sellingPrice: 50000,
    stock: 100,
    imageProduct: "",
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "product-7",
    name: "Kipas",
    purchasePrice: 10000,
    sellingPrice: 40000,
    stock: 22,
    imageProduct: "",
    createdAt: "2022-04-14T04:27:34.572Z",
  },
];

function getAllProducts() {
  return products;
}

function getProduct(id) {
  const foundedProduct = products.find((product) => product.id === id);
  return foundedProduct;
}

function addProduct(name, purchasePrice, sellingPrice, stock, imageProduct) {
  products = [
    {
      id: `product-${+new Date()}`,
      name,
      purchasePrice,
      sellingPrice,
      stock,
      imageProduct,
      createdAt: new Date().toISOString(),
    },
    ...products,
  ];
}

function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
}

function editProduct(
  id,
  name,
  purchasePrice,
  sellingPrice,
  stock,
  imageProduct
) {
  const productToEdit = products.find((product) => product.id === id);
  productToEdit.name = name;
  productToEdit.purchasePrice = purchasePrice;
  productToEdit.sellingPrice = sellingPrice;
  productToEdit.stock = stock;
  productToEdit.imageProduct = imageProduct;

  products = products.map((product) => {
    if (product.id === id) {
      return product;
    }
    return product;
  });
}

const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const rupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

export {
  getAllProducts,
  deleteProduct,
  editProduct,
  getProduct,
  addProduct,
  showFormattedDate,
  rupiah,
};
