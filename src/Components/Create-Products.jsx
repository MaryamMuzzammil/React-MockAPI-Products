import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
const CreateProduct = () => {
    const [formData, setFormData] = useState({
        Name: "",
        Description: "",
        Price: "",
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    const ApiUrl = `https://67792fcc482f42b62e90a1ab.mockapi.io/products/${params.id}`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const getProductByID = async () => {
        try {
            const res = await axios.get(ApiUrl);
            const { Name, Description, Price } = res.data; // Extract data
            setFormData({
                Name: Name ?? "",
                Description: Description ?? "",
                Price: Price ?? "",
            });
        } catch (error) {
            console.error("Error fetching products data:", error);
            toast.error("Failed to fetch products data. Please try again.");
        }
    };

    useEffect(() => {
        if (params.id) {
            getProductByID();
        }
    }, [params?.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");
    
        if (!formData.Name || !formData.Description || !formData.Price) {
            toast.error("All fields are required.");
            return;
        }
    
        setLoading(true);
        try {
            let res;
            if (params.id) {
                // Update an existing products
                res = await axios.put(ApiUrl, formData);
            } else {
                // Create a new products
                res = await axios.post(ApiUrl.replace(`/${params.id}`, ""), formData);
            }
            if (res.status === 201 || res.status === 200) {
                toast.success(params.id ? "products updated successfully!" : "products added successfully!");
                setTimeout(() => {
                    navigate("/products");
                }, 1000);
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <h2>{params.id ? "Edit productss" : "Create products"}</h2>
            <form onSubmit={handleSubmit}>
                {msg && <h3 style={{ textAlign: "center", color: "green" }}>{msg}</h3>}
                {error && <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>}
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        name="Name"
                        value={formData.Name}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        name="Description"
                        value={formData.Description}
                    />
                    <label>Price</label>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        name="Price"
                        value={formData.Price}
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value={loading ? "Submitting..." : "Submit"}
                        disabled={loading}
                    />
                </div>
            </form>
        </>
    );
};

export default CreateProduct;
