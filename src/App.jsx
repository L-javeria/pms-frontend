import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Navbar from "./components/Navbar"
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./features/modal/modalSlice";
import ProductForm from "./components/ProductForm";

function App() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const productToEdit = useSelector(state => state.modal.productToEdit);
  const dispatch = useDispatch();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>

      <div>
        {isOpen &&
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
            onClick={() => dispatch(closeModal())}
          >
            <div
              className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto max-h-[600px] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="text-center pb-3 text-xl text-indigo-600 uppercase">{productToEdit ? 'Update the product' : 'Add a new product'}</h1>
              <button
                onClick={() => dispatch(closeModal())}
                className="absolute top-8 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
              <hr className="text-gray-200 pb-4"></hr>
              <ProductForm />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default App
