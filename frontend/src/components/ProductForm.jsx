import { useState, useEffect } from "react";
import { Upload, Package, Image as ImageIcon } from "lucide-react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

const ProductForm = ({ onSubmit, onClose, initialData = null, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description,
      });
      if (initialData.image?.url) {
        setImagePreview(initialData.image.url);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (imageFile) data.append("image", imageFile);
    onSubmit(data);
  };

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
            <Package size={16} className="text-white" />
          </div>
          <span className="text-slate-800">{initialData ? "Edit Product" : "Add Product"}</span>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g. Wireless Headphones"
        />

        <Input
          label="Price ($)"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          placeholder="e.g. 29.99"
        />

        <div className="w-full">
          <label className="block text-slate-500 text-[10px] font-black tracking-[0.15em] uppercase mb-2 ml-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Describe your product catalog entry..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all duration-200 resize-none outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-500 text-[10px] font-black tracking-[0.15em] uppercase mb-2 ml-1">
            Product Image
          </label>
          <label className="cursor-pointer block group">
            <div className={`border-2 border-dashed rounded-[2rem] p-8 transition-all duration-300 flex flex-col items-center justify-center gap-3 ${imagePreview ? 'border-indigo-500/30 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-white'}`}>
              {imagePreview ? (
                <div className="relative w-full rounded-2xl overflow-hidden group-hover:opacity-90 transition-opacity shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold text-sm flex items-center gap-2">
                      <Upload size={18} /> Change Image
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm border border-indigo-100">
                    <ImageIcon size={32} />
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-indigo-600 font-bold text-sm">Click to upload</span>
                    <span className="text-slate-500 text-sm font-medium"> or drag and drop</span>
                  </div>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">JPG, PNG, WEBP — max 5MB</span>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-100/50">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="flex-1"
          >
            {initialData ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;
