import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProductMutation, useGetProductByIdQuery } from '../features/productApi';
import EditBtn from '../components/Buttons/EditBtn';
import DelBtn from '../components/Buttons/DelBtn';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';
import BackBtn from '../components/Buttons/BackBtn';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteProduct] = useDeleteProductMutation();
    const { id } = useParams();
    const { data: product, isLoading, error } = useGetProductByIdQuery(id);

    if (isLoading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center py-10 text-red-500">Error fetching product.</p>;

    const handleDelete = async () => {
        try {
            await deleteProduct(product._id).unwrap();
            alert("Product deleted successfully");
            navigate('/');
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete product");
        }
    }

    return (
        <div className='px-[20%] py-[50px]'>
            <div className='bg-gray-50 flex flex-col shadow-xl shadow-gray-700 p-6 rounded-md'>
                <div onClick={() => navigate('/')}>
                    <BackBtn />
                </div>
                <div className='flex justify-evenly mt-4 '>
                <img
                    src={`http://localhost:3000/${product.productImage}`}
                    alt={product.productName}
                    className="w-64 h-64 object-cover rounded border"
                />
                <div className="ml-10 space-y-2 min-w-[400px]">
                    <h2 className="text-2xl font-bold">{product.productName}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Discount:</strong> {product.discount || 0}%</p>
                    <p><strong>Stock:</strong> {product.stockQuantity}</p>
                    <p><strong>Status:</strong> {product.availabilityStatus}</p>
                    <div className='flex gap-3 items-center mt-4 justify-end'>
                        <EditBtn onClick={() => dispatch(openModal(product))} />
                        <DelBtn onClick={handleDelete} />
                    </div>
                </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
