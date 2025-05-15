import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Navbar from "./components/Navbar"
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./features/modal/modalSlice";
import ProductForm from "./components/ProductForm";

function App() {
  const isOpen = useSelector((state) => state.modal.isOpen);
    const dispatch = useDispatch();
  return (
    <>
      <BrowserRouter>
      <Navbar/>
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
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto max-h-[600px] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="text-center pb-3 text-xl text-indigo-600 uppercase">Add a new product</h1>
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
