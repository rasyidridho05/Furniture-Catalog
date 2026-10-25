import React from 'react'
import { rupiahFormat } from '../utils/rupiah.format'

interface CatalogSummaryProps {
    totalItem: number;
    totalCategory: number;
    cheapest: number | null;
}


const CatalogSummary = ({ totalItem, totalCategory, cheapest }: CatalogSummaryProps) => {
    const items = [
        { number: String(totalItem), label: 'Total Furniture' },
        { number: String(totalCategory), label: 'Category' },
        { number: cheapest !== null ? rupiahFormat(cheapest) : '-', label: 'Start from' },
    ]

    return (
        <>
            <section className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {items.map((item) => (
                    <div key={item.label} className="rounded-3xl bg-white px-6 py-8 text-center">
                        <h4 className="text-4xl font-semibold tracking-tight">{item.number}</h4>
                        <h4 className="mt-2 text-sm text-brand-gray">{item.label}</h4>
                    </div>
                ))}

            </section>
        </>
    )
}

export default CatalogSummary