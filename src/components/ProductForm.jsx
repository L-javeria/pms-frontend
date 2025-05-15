import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddProductMutation, useUpdateProductMutation } from '../features/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../features/modal/modalSlice';

const getSchema = (isEdit = false) =>
    yup.object().shape({
        productName: yup.string().required("Product name is required"),
        description: yup.string().required("Description is required"),
        category: yup.string().required("Category is required"),
        brand: yup.string().required("Brand is required"),
        price: yup.number().typeError("Price must be a number").required("Price is required"),
        discount: yup.number().typeError("Discount must be a number").optional(),
        currency: yup.string().required("Currency is required"),
        stockQuantity: yup.number().typeError("Stock must be a number").required("Stock quantity is required"),
        availabilityStatus: yup.string().oneOf(["In Stock", "Out of Stock"]).required(),
        productImage: yup
            .mixed()
            .test("fileType", "Unsupported File Format", (value) => {
                if (!value || value.length === 0) return isEdit ? true : false;
                return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
            })
            .test("required", "Image is required", (value) => {
                if (isEdit) return true;
                return value && value.length > 0;
            }),
    });


function ProductForm() {
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const dispatch = useDispatch()
    const productToEdit = useSelector(state => state.modal.productToEdit);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(getSchema(!!productToEdit)), // pass true if editing
    });

    // Prefill form when editing
    useEffect(() => {
        console.log('product to edit', productToEdit)
        if (productToEdit) {
            Object.entries(productToEdit).forEach(([key, value]) => {
                if (key !== '_id' && key !== '__v') {
                    setValue(key, value);
                }
            });
        }
    }, [productToEdit, setValue]);

    const onSubmit = async (data) => {

        try {
            const formData = new FormData();

            formData.append("productName", data.productName);
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("brand", data.brand);
            formData.append("price", data.price);
            formData.append("currency", data.currency);
            formData.append("stockQuantity", data.stockQuantity);
            formData.append("availabilityStatus", data.availabilityStatus);

            if (data.discount !== undefined && data.discount !== null) {
                formData.append("discount", String(data.discount));
            }

            if (data.productImage && data.productImage.length > 0) {
                formData.append("productImage", data.productImage[0]);
            }

            if (productToEdit) {
                console.log('form data in edit', formData)
                await updateProduct({ id: productToEdit._id, formData }).unwrap();
                alert("Product updated");
            } else {
                console.log('form data in add', formData)
                await addProduct(formData).unwrap();
                alert("Product added");
            }
            dispatch(closeModal())
            reset();
        } catch (err) {
            console.error("Failed to add product:", err);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto">

            {/* Product Name */}
            <label className="pr-3 mb-6 ">
                Product Name <span className="text-red-500">*</span>
            </label>
            <input
                {...register("productName")}
                placeholder=".i.e. Samsung Galaxy"
                autoComplete='off'
                className={`bg-[#f3f3f34a] placeholder-[#dad7d7] text-gray-500 pb-0 p-2 mb-1 w-full focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.productName ? 'border border-red-500' : ''}`}
            />
            <p className="text-red-500 text-sm">{errors.productName?.message}</p>

            {/* Description */}
            <label className="pr-3">
                Description <span className="text-red-500">*</span>
            </label>
            <textarea
                {...register("description")}
                placeholder=".i.e. A high-performance smartphone"
                className={`bg-[#f3f3f34a] placeholder-[#dad7d7] text-gray-500 pb-0 p-2 mb-1 w-full focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.description ? 'border border-red-500' : ''}`}
            />
            <p className="text-red-500 text-sm">{errors.description?.message}</p>

            {/* Category */}
            <label className="pr-3">
                Category <span className="text-red-500">*</span>
            </label>
            <input
                {...register("category")}
                placeholder=".i.e. Electronics"
                className={`bg-[#f3f3f34a] placeholder-[#dad7d7] text-gray-500 pb-0 p-2 mb-1 w-full focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.category ? 'border border-red-500' : ''}`}
            />
            <p className="text-red-500 text-sm">{errors.category?.message}</p>

            {/* Brand */}
            <label className="pr-3">
                Brand <span className="text-red-500">*</span>
            </label>
            <input
                {...register("brand")}
                placeholder=".i.e. Samsung"
                className={`bg-[#f3f3f34a] placeholder-[#dad7d7] text-gray-500 pb-0 p-2 mb-1 w-full focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.brand ? 'border border-red-500' : ''}`}
            />
            <p className="text-red-500 text-sm">{errors.brand?.message}</p>

            {/* Price */}
            <label className="pr-3">
                Price <span className="text-red-500">*</span>
            </label>
            <input
                {...register("price")}
                placeholder=".i.e. 100"
                className={`bg-[#f3f3f34a] placeholder-[#dad7d7] text-gray-500 pb-0 p-2 mb-1 w-full focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.price ? 'border border-red-500' : ''}`}
            />
            <p className="text-red-500 text-sm">{errors.price?.message}</p>

            {/* Discount (Optional) */}
            <label className="pr-3">
                Discount (%)
            </label>
            <input
                {...register("discount")}
                placeholder=".i.e. 10"
                className={`bg-[#f3f3f34a] placeholder-[#dad7d7] text-gray-500 pb-0 p-2 mb-1 w-full focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.discount ? 'border border-red-500' : ''}`}
            />
            <p className="text-red-500 text-sm">{errors.discount?.message}</p>

            {/* Currency */}
            <label className="pr-3">
                Currency <span className="text-red-500">*</span>
            </label>
            <input
                {...register("currency")}
                placeholder=".i.e. USD"
                className={`bg-[#f3f3f34a] placeholder-[#dad7d7] text-gray-500 pb-0 p-2 mb-1 w-full focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.currency ? 'border border-red-500' : ''}`}
            />
            <p className="text-red-500 text-sm">{errors.currency?.message}</p>

            {/* Stock Quantity */}
            <label className="pr-3">
                Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
                {...register("stockQuantity")}
                placeholder=".i.e. 50"
                className={`bg-[#f3f3f34a] placeholder-[#dad7d7] text-gray-500 pb-0 p-2 mb-1 w-full focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.stockQuantity ? 'border border-red-500' : ''}`}
            />
            <p className="text-red-500 text-sm">{errors.stockQuantity?.message}</p>

            {/* Availability */}
            <label className="pr-3">
                Availability <span className="text-red-500">*</span>
            </label>
            <select
                {...register("availabilityStatus")}
                className={`bg-[#f3f3f34a] pb-0 p-2 mb-1 w-full placeholder-[#dad7d7] text-gray-500 focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.availabilityStatus ? 'border border-red-500' : ''}`}
            >
                {/* <option value="">Select status</option> */}
                <option className='text-black' value="In Stock">In Stock</option>
                <option className='text-black' value="Out of Stock">Out of Stock</option>
            </select>
            <p className="text-red-500 text-sm">{errors.availabilityStatus?.message}</p>

            {productToEdit?.productImage && (
                <div className="mb-2">
                    <label className="text-sm text-gray-500">Current Image</label>
                    <img
                        src={`http://localhost:3000/${productToEdit.productImage}`}
                        alt="Current product"
                        className="w-32 h-32 object-cover border rounded mt-1"
                    />
                </div>
            )}
            <label className="pr-3">
                Product Image {!productToEdit && <span className="text-red-500">*</span>}
            </label>
            <input
                type="file"
                accept="image/*"
                {...register("productImage")}
                className={`bg-[#f3f3f34a] pb-0 p-2 mb-1 w-full placeholder-[#dad7d7] text-gray-500 focus:border-indigo-600 focus:border-b-2 focus:outline-none ${errors.productImage ? 'border border-red-500' : ''}`}
            />
            <p className="text-red-500 text-sm">{errors.productImage?.message}</p>


            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {productToEdit ? 'Update Product' : 'Add Product'}
            </button>
        </form>

    );
}

export default ProductForm;
