import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { ListCategory } from '../types/furniture';
import type { CategoryFurniture } from '../types/furniture';

export interface DataForm {
    name: string;
    category: CategoryFurniture;
    price: number;
    desc: string;
    image: string;
}

interface FormAddProps {
    onAdd: (data: DataForm) => void;
    onClose: () => void;
}

const defaultForm = {
    name: '',
    category: 'Soda' as CategoryFurniture,
    price: '',
    desc: '',
    image: ''
}

const label = 'flex flex-col gap-2 text-sm font-medium';
const input = 'rounded-xl border border-black/10 bg-brand-bg px-2 py-3 text-base font-normal outline-none transition placeholder:text-black/30 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/15';

const FormAdd = ({ onAdd, onClose }: FormAddProps) => {
    const [form, setForm] = useState(defaultForm);
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        const overflowAwal = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = overflowAwal;
        };
    }, [onClose]);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const price = Number(form.price);
        if (!form.name.trim() || !price || price <= 0) {
            setError('Nama dan harga (lebih dari 0) wajib diisi.');
            return;
        }

        onAdd({
            name: form.name.trim(),
            category: form.category,
            price,
            desc: form.desc.trim() || 'Belum ada deskripsi.',
            image: form.image.trim(),
        });
        onClose();

        setForm(defaultForm);
        setError('');
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>

                <form
                    onSubmit={handleSubmit}
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="judul-modal"
                    className="relative flex max-h-[92vh] w-full max-w-2xl flex-col gap-5 overflow-y-auto rounded-t-3xl bg-white p-8 shadow-2xl sm:rounded-3xl sm:p-10"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-apple-bg text-apple-gray transition hover:bg-black/10"
                    >
                        ✕
                    </button>

                    <div className="mb-2 text-center">
                        <h2 className="text-3xl font-semibold tracking-tight">Add new Furniture</h2>
                        <p className="mt-1 text-brand-gray">Lengkapi detail untuk menambahkan ke katalog.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <label className={label}>
                            Furniture Name
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Meja Makan Jati 6 Kursi"
                                className={input}
                            />
                        </label>

                        <label className={label}>
                            Kategori
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className={input}
                            >
                                {ListCategory.map((k) => (
                                    <option key={k} value={k}>
                                        {k}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className={label}>
                            Price (Rp)
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="2500000"
                                min={0}
                                className={input}
                            />
                        </label>

                        <label className={label}>
                            URL Image (opsional)
                            <input
                                type="url"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className={input}
                            />
                        </label>
                    </div>

                    <label className={label}>
                        Description
                        <textarea
                            name="desc"
                            value={form.desc}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Product description"
                            className={`${input} resize-none`}
                        />
                    </label>

                    {error && <p className="text-center text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        className="mx-auto mt-2 rounded-full bg-brand-blue px-8 py-3 text-base font-medium text-white transition hover:bg-brand-blue-hover active:scale-[0.98]"
                    >
                        Add
                    </button>
                </form>

            </div>
        </>
    )
}

export default FormAdd