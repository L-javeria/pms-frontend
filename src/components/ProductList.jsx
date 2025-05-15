import React from 'react';
import { useGetProductsQuery } from '../features/productApi';
import { useNavigate } from 'react-router-dom';

function ProductList() {
    const { data: products, isLoading } = useGetProductsQuery();
    const navigate = useNavigate();

    if (isLoading) return <p>Loading...</p>;

    const getCurrencySymbol = (currency) => {
        switch (currency) {
          case "USD":
            return "$";
          case "EUR":
            return "€";
          case "PKR":
            return "PKR ";
          default:
            return "";
        }
      };
      

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...products.data]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((product) => (
                        <div
                            key={product._id}
                            className="bg-white cursor-pointer rounded-xl shadow-md p-4 hover:shadow-lg hover:shadow-[#8c20d473] transition-shadow duration-300"
                            onClick={() => navigate(`/product/${product._id}`)}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={`http://localhost:3000/${product.productImage}`}
                                    alt={product.productName}
                                    className="w-16 h-16 object-cover rounded border border-gray-200"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                </div>
                            </div>

                            <div className="space-y-1 text-sm text-gray-700 mb-4">
                                <p>
                                    <span className="font-medium">Price:</span> {getCurrencySymbol(product.currency)}{product.price}
                                </p>

                                <p><span className="font-medium">Availability:</span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${product.availabilityStatus === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.availabilityStatus}
                                    </span>
                                </p>
                            </div>

                        </div>
                    ))}
            </div>
        </div>

    );
}

export default ProductList;
