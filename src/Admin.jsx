import { useEffect, useState } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [display, setDisplay] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Load products error:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Product Name required");
      return;
    }

    if (!model.trim()) {
      alert("Model required");
      return;
    }

    if (!price.trim()) {
      alert("Price required");
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("model", model.trim());
    formData.append("price", price.trim());
    formData.append("display", display.trim());

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Product add failed");
        return;
      }

      alert("Product added successfully ✅");

      setName("");
      setModel("");
      setPrice("");
      setDisplay("");
      setImage(null);

      const fileInput =
        document.getElementById("product-image");

      if (fileInput) {
        fileInput.value = "";
      }

      loadProducts();
    } catch (error) {
      console.error("Add product error:", error);

      alert(
        "Backend connection failed. Server चालू आहे का check करा."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    if (!product._id) {
      alert("This product cannot be deleted.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${product._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (item) => item._id !== product._id
        )
      );

      alert("Product deleted successfully ✅");
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        "Backend connection failed. Server चालू आहे का check करा."
      );
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">

        <div className="admin-header">
          <div>
            <h1>Maveriqa Admin</h1>
            <p>Manage your products</p>
          </div>

          <a href="/">
            ← Back to Website
          </a>
        </div>

        <div className="admin-card">
          <h2>Add Product</h2>

          <form onSubmit={handleSubmit}>

            <label>Product Name</label>

            <input
              type="text"
              placeholder="Example: Maveriqa Pure"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <label>Model</label>

            <input
              type="text"
              placeholder="Example: Maveriqa 1"
              value={model}
              onChange={(e) =>
                setModel(e.target.value)
              }
            />

            <label>Price</label>

            <input
              type="text"
              placeholder="Example: ₹85,000"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            <label>Display</label>

            <input
              type="text"
              placeholder='Example: 5" Touch Screen Display'
              value={display}
              onChange={(e) =>
                setDisplay(e.target.value)
              }
            />

            <label>Product Image</label>

            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Adding Product..."
                : "Add Product"}
            </button>

          </form>
        </div>

        <div className="admin-card">

          <div className="products-header">
            <h2>Added Products</h2>

            <button
              type="button"
              onClick={loadProducts}
            >
              Refresh
            </button>
          </div>

          {products.length === 0 ? (
            <div className="no-products">
              <h3>No Products Found</h3>
              <p>
                Add a product using the form above.
              </p>
            </div>
          ) : (
            <div className="admin-products">

              {products.map((product) => {

                const imageUrl =
                  product.image?.startsWith("http")
                    ? product.image
                    : product.image?.startsWith("/uploads")
                    ? `http://localhost:5000${product.image}`
                    : product.image;

                return (
                  <div
                    className="admin-product"
                    key={product._id}
                  >

                    <div className="admin-product-image">

                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                        />
                      ) : (
                        <span>
                          No Image
                        </span>
                      )}

                    </div>

                    <div className="admin-product-info">

                      <small>
                        {product.model}
                      </small>

                      <h3>
                        {product.name}
                      </h3>

                      <p>
                        {product.display}
                      </p>

                      <strong>
                        {product.price}
                      </strong>

                    </div>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() =>
                        handleDelete(product)
                      }
                    >
                      Delete
                    </button>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .admin-page {
          min-height: 100vh;
          background: #f4f7f9;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
        }

        .admin-container {
          max-width: 1000px;
          margin: auto;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .admin-header h1 {
          margin: 0;
          font-size: 32px;
        }

        .admin-header p {
          margin-top: 8px;
          color: #666;
        }

        .admin-header a {
          text-decoration: none;
          background: #111;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
        }

        .admin-card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          margin-bottom: 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .admin-card h2 {
          margin-top: 0;
          margin-bottom: 25px;
        }

        .admin-card form {
          display: flex;
          flex-direction: column;
        }

        .admin-card label {
          margin-bottom: 7px;
          font-weight: 600;
        }

        .admin-card input {
          width: 100%;
          padding: 13px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 15px;
        }

        .admin-card form button {
          padding: 14px;
          background: #111;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        }

        .admin-card form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .products-header button {
          padding: 10px 18px;
          border: none;
          border-radius: 7px;
          cursor: pointer;
        }

        .admin-products {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .admin-product {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 18px;
          border: 1px solid #eee;
          border-radius: 12px;
        }

        .admin-product-image {
          width: 100px;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
          background: #f2f2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .admin-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .admin-product-info {
          flex: 1;
        }

        .admin-product-info small {
          color: #777;
        }

        .admin-product-info h3 {
          margin: 5px 0;
        }

        .admin-product-info p {
          margin: 5px 0;
          color: #666;
        }

        .delete-button {
          background: #d62828 !important;
          color: white !important;
          border: none !important;
          padding: 12px 20px !important;
          border-radius: 8px !important;
          cursor: pointer !important;
        }

        .no-products {
          text-align: center;
          padding: 40px;
          background: #fafafa;
          border-radius: 10px;
        }

        @media (max-width: 700px) {
          .admin-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .admin-product {
            flex-direction: column;
            align-items: flex-start;
          }

          .delete-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default Admin;