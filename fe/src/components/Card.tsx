import React from 'react'
import type { Furniture } from '../types/furniture';
import { rupiahFormat } from '../utils/rupiah.format';

interface CardProps {
    furniture: Furniture;
    onDelete: (id: number) => void;
}

const IMAGE = 'data:image/svg+xml;utf8,' +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
       <rect width="100%" height="100%" fill="#f5f5f7"/>
       <text x="50%" y="50%" font-size="24" fill="#86868b" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif">Gambar tidak tersedia</text>
     </svg>`
    );

const Card = ({ furniture, onDelete }: CardProps) => {
    const { id, name, category, price, desc, image } = furniture;

    return (
        <article className="group flex flex-col overflow-hidden rounded-3xl bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
            <div className="overflow-hidden bg-brand-bg">
                <img
                    src={image || IMAGE}
                    alt={name}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = IMAGE;
                    }}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                    {category}
                </span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-gray">{desc}</p>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-lg font-semibold tracking-tight">{rupiahFormat(price)}</p>
                    <button
                        onClick={() => onDelete(id)}
                        className="text-sm text-brand-blue transition hover:underline"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </article>
    )
}

export default Card