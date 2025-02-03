import './Product.css'
import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "./loader";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const ProductList = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(setLoading, "loading");
    const [errorMsg, setErrorMsg] = useState("");
    const [count, setCount] = useState(null)
    const parms = useParams();
    console.log(parms);
    const ApiUrl = "https://67792fcc482f42b62e90a1ab.mockapi.io/products"

    //side effects manage krne ke liye 
    useEffect(() => {

        const getProductList = async () => {
            setLoading(true)
            try {
                const res = await axios.get(ApiUrl);
                console.log(res.data)
                if (res.status === 200) {
                    setProductData(res.data ?? [])
                    setLoading(false)
                    setErrorMsg("");
                }
            }
            catch (error) {
                console.log(error);
                setLoading(false);
                
                // Check if error.response exists before destructuring
                if (error.response) {
                    setErrorMsg(error.response.data || "An error occurred while fetching data.");
                } else {
                    setErrorMsg("Network error or server is down. Please try again later.");
                }
            }

        }
        getProductList();

    }, []) //array dependency : jab bhi woh pehli dafa me render hoga toh woh is function ko call krdega 

    if (loading) {
        return (
            <>
                <Loader />
            </>
        )
    }
    const handleClick = (id) => {
        console.log("Item ID clicked:", id);
    };

    const handleDelete = async (id) => {
        console.log(id, "handleDelete");
        try {
            const res = await axios.delete(`${ApiUrl}/${id}`);
            // console.log(res);


            setProductData(productData.filter((product) => product.id !== id));
            toast.success("Product Successfully Delete")

        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Something went wrong. Please try again.");

        }
    };



    return (
        <>
            <h1>Product List</h1>
            <Link className="addbtn" to="/createproducts">Add Products</Link>
            {errorMsg && <h3 style={{ textAlign: "center" }}>{errorMsg}</h3>}
            {productData && productData.length > 0 &&

                <table border={1}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productData && productData.map((item, index) => {
                                console.log(item, 'item');
                                return (
                                    <>
                                        <tr key={index}>

                                            <td>{item.id}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.Description}</td>
                                            <td>{item.Price}</td>
                                            <td>
                                                <Link
                                                    className="action_btn"
                                                    to={`/createproducts/${item.id}`}
                                                    onClick={() => handleClick(item.id)} // Pass item.id to the handler
                                                    style={{ background: "rgb(255, 255, 11)" }}
                                                >Edit
                                                </Link>

                                                <button className="action_btn" onClick={() => handleDelete(item.id)} style={{ background: "red" }}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }

                    </tbody>
                </table>}
        </>
    )
}
export default ProductList;