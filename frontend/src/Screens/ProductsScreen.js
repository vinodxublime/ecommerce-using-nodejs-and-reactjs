import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    saveProduct,
    listProducts,
    deleteProduct
} from "../actions/productActions";

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");
    const productList = useSelector(state => state.productList);
    const {products } = productList;

    const productSave = useSelector(state => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave
    } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        };
    }, [dispatch,successSave, successDelete]);

    const openModal = product => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
    };

    const submitHandler = e => {
        e.preventDefault();
        dispatch(
            saveProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description
            })
        );
    };

    const deleteHandler = product => {
        dispatch(deleteProduct(product._id));
    };

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button
                    className="button primary"
                    onClick={() => openModal({})}
                >
                    Create Product
                </button>
            </div>
            {modalVisible && (
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Create Product</h2>
                            </li>
                            <li>
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div>{errorSave}</div>}
                            </li>
                            <li>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    name="name"
                                    id="name"
                                    onChange={e => setName(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    value={price}
                                    name="price"
                                    id="price"
                                    onChange={e => setPrice(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="image">Image</label>
                                <input
                                    type="text"
                                    value={image}
                                    name="image"
                                    id="image"
                                    onChange={e => setImage(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="brand">Brand</label>
                                <input
                                    type="text"
                                    value={brand}
                                    name="brand"
                                    id="brand"
                                    onChange={e => setBrand(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    name="category"
                                    id="category"
                                    onChange={e => setCategory(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="countInStock">
                                    Count In Stock
                                </label>
                                <input
                                    type="text"
                                    value={countInStock}
                                    name="countInStock"
                                    id="countInStock"
                                    onChange={e =>
                                        setCountInStock(e.target.value)
                                    }
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    type="text"
                                    value={description}
                                    id="description"
                                    name="description"
                                    onChange={e =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                            </li>
                            <li>
                                <button
                                    type="submit"
                                    className="button primary"
                                >
                                    {id ? "Update" : "Create"}
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(false)}
                                    className="button secondary"
                                >
                                    Back
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            )}
            {loadingDelete && <div>Deleting...</div>}

{errorDelete && <div style={{ color: "red" }}>{errorDelete}</div>} 
 
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Count In Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id} </td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.countInStock}</td>
                                <td>
                                    <button
                                        className="product-button"
                                        onClick={() => openModal(product)}
                                    >
                                        Edit
                                    </button>
                                    {"  "}
                                    <button
                                        className="product-button secondary"
                                        onClick={() => deleteHandler(product)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ProductsScreen;
