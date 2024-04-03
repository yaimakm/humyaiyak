"use client";

import { useEffect, useState } from 'react';
import { Product } from '@/components/main/product/productPage';


type ProductType = "cpu" | "ram" | "gpu" | "mobo" | "hdd" | "ssd";

export default function ComparePage() {

    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Fetch selected products from local storage or props
        const savedProducts = localStorage.getItem('compareData');
        if (savedProducts) {
            const parsedProducts: Product[] = JSON.parse(savedProducts);
            setSelectedProducts(parsedProducts);
        }
    }, []);

    const filterProductsByType = (type: ProductType) => {
        return selectedProducts.filter(product => product.typeProduct === type);
    }

    const removeFromLocalStorage = (product: Product) => {
        const updatedProducts = selectedProducts.filter(p => p !== product);
        localStorage.setItem('compareData', JSON.stringify(updatedProducts));
        setSelectedProducts(updatedProducts);
    }

    const handleRemoveProduct = (product: Product) => {
        removeFromLocalStorage(product);
    }

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    }

    const renderProductSection = (type: ProductType) => {
        const products = filterProductsByType(type);

        return (
            <>
                <p style={{ fontSize: "24px", marginTop: "30px", marginBottom: "15px" }}>{type}</p>
                <div style={{ marginLeft: "45%" }}></div>
                {products.map((product, index) => (
                    <div key={index} style={{ display: "inline-block", textAlign: "center", }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: "80px",
                                height: "80px",
                                boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                                cursor: "pointer" // Add cursor pointer for indicating clickable
                            }}
                            onClick={() => handleProductClick(product)} // Call handleProductClick on image click
                        />
                        <p>{product.name}</p>
                        <button onClick={() => handleRemoveProduct(product)}>
                            <img src={"/images/del_fill.png"} alt="Remove" style={{ width: "20px", height: "20px" }} />
                        </button>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            <div style={{ borderTop: "5px solid #00A9FF", boxShadow: "5px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
                    <div style={{
                        width: "400px",
                        height: "1200px",
                        flex: "0 0 auto",
                        boxSizing: "border-box",
                        padding: "10px",
                        margin: "10px",
                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                        <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "24px" }}>Select</p>

                        {/* PC build section */}
                        <p style={{ fontSize: "24px", marginTop: "30px", marginBottom: "15px" }}>PC build</p>
                        <div style={{ marginLeft: "45%" }}></div>

                        {renderProductSection("cpu")}
                        {renderProductSection("gpu")}
                        {renderProductSection("ram")}
                        {renderProductSection("ssd")}
                    </div>

                    {/* Right side content */}
                    <div style={{
                        width: "400px",
                        height: "1200px",
                        flex: "0 0 auto",
                        boxSizing: "border-box",
                        padding: "10px",
                        margin: "10px",
                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                        {selectedProduct && (
                        <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "24px" }}>{selectedProduct.name}</p>
                        )}
                        {selectedProduct && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: "200px", height: "200px", boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)" }}/>
                            </div>
                        </div>
                        )}
                        {selectedProduct && (
                        <div style={{ textAlign: "left" }}>
                                <p>Name: {selectedProduct.name}</p>
                                <p>Type: {selectedProduct.typeProduct}</p>

                                <p>Price: {selectedProduct.price}</p>
                                <p>Description: {selectedProduct.description}</p>
                                {/* Add more details if needed */}
                            </div>
                        )}
                    </div>
                    {/*more right side content*/}
                    <div style={{
                        width: "400px",
                        height: "1200px",
                        flex: "0 0 auto",
                        boxSizing: "border-box",
                        padding: "10px",
                        margin: "10px",
                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

